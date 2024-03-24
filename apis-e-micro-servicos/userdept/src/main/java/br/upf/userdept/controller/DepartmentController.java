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

import br.upf.userdept.dto.DepartmentDTO;
import br.upf.userdept.service.DepartmentService;
import br.upf.userdept.utils.TokenJWT;

@RestController
@RequestMapping("/userdept/deparment")
public class DepartmentController {
    @Autowired
    private DepartmentService departmentService;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping("/inserir")
    @ResponseStatus(HttpStatus.CREATED)
    public DepartmentDTO inserir (@RequestBody DepartmentDTO departmentDTO, @RequestHeader("token") String token){
        TokenJWT.validarToken(token);
        return departmentService.salvar(departmentDTO);
    }

    @GetMapping("/listarTodos")
    @ResponseStatus(HttpStatus.OK)
    public List<DepartmentDTO> listarTodos() {
        return departmentService.listarTodos();
    }

    @GetMapping("/buscarPorId")
    @ResponseStatus(HttpStatus.OK)
    public DepartmentDTO buscarPorId(@RequestHeader("id") Long id) {
        return departmentService.buscarPorId(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Department not found!"));
    }

    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removerUsuario(@RequestHeader("id") Long id) {
        departmentService.buscarPorId(id).map(department -> {
            departmentService.removerPorId(department.getId());
            return Void.TYPE;
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Department not found!"));
    }

    @PutMapping("/atualizar")
    @ResponseStatus(HttpStatus.OK)
    public void atualizar(@RequestBody DepartmentDTO departmentDTO) {
        departmentService.buscarPorId(departmentDTO.getId()).map(department -> {
            modelMapper.map(departmentDTO, department);
            departmentService.salvar(department);
            return Void.TYPE;
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Department not found!"));
    }
}
