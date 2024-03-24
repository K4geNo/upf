package br.upf.userdept.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import br.upf.userdept.dto.UserDTO;
import br.upf.userdept.service.UserService;
import br.upf.userdept.utils.TokenJWT;

@RestController
@RequestMapping("/userdept/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping("/inserir")
    @ResponseStatus(HttpStatus.CREATED)
    public UserDTO inserir (@RequestBody UserDTO userDTO, @RequestHeader("token") String token) {
        TokenJWT.validarToken(token);
        return userService.salvar(userDTO);
    }

    @GetMapping("/listarTodos")
    @ResponseStatus(HttpStatus.OK)
    public List<UserDTO> listarTodos() {
        return userService.listarTodos();
    }

    @GetMapping("/buscarPorId")
    @ResponseStatus(HttpStatus.OK)
    public UserDTO buscarPorId(Long id) {
        return userService.buscarPorId(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found!"));
    }

    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removerUsuario(@RequestHeader("id") Long id) {
        userService.buscarPorId(id).map(user -> {
            userService.removerPorId(user.getId());
            return Void.TYPE;
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found!"));
    }

    @PutMapping("/atualizar")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void atualizar(@RequestBody UserDTO userDTO) {
        userService.buscarPorId(userDTO.getId()).map(user -> {
            modelMapper.map(userDTO, user);
            userService.salvar(userDTO);
            return Void.TYPE;
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found!"));
    }

    @GetMapping("/buscarPorEmail")
    @ResponseStatus(HttpStatus.OK)
    public UserDTO findByEmail(@RequestHeader("email") String email) {
        return userService.buscarPorEmail(email);
    }

    @GetMapping("/buscarPorParteNome")
    @ResponseStatus(HttpStatus.OK)
    public List<UserDTO> buscarPorParteNome(@RequestHeader("nome") String nome) {
        return userService.buscarPorParteNome(nome);
    }

    @GetMapping("/buscarPorSenha")
    @ResponseStatus(HttpStatus.OK)
    public List<UserDTO> buscarPorSenha(@RequestHeader("senha") String senha) {
        return userService.buscarPorSenha(senha);
    }

    @GetMapping("/authorize")
    @ResponseStatus(HttpStatus.OK)
    public UserDTO authorize(@RequestHeader("email") String email, @RequestHeader("password") String password) {
        if (email != null && !email.isEmpty() && password != null && !password.isEmpty()) {
            UserDTO userDTO = userService.buscarPorEmail(email);

            if (userDTO.getId() != null && userDTO.getSenha().equals(password)) {
                userDTO.setToken(TokenJWT.processarTokenJWT(email));
                return userDTO;
            }
        }
        
        return null;
    }
}
