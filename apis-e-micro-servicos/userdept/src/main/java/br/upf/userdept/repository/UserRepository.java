package br.upf.userdept.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.upf.userdept.dto.UserDTO;

public interface UserRepository extends JpaRepository<UserDTO, Long> {
    public UserDTO findByEmail(String email);

    public List<UserDTO> findByNome(String nome);
    
    @Query("SELECT u FROM UserDTO u WHERE u.senha =: senha ORDER BY u.id desc")
    public List<UserDTO> findBySenha(String senha);

    @Query(nativeQuery = true, value = "SELECT u.* FROM tb_user u INNER JOIN tb_department d ON d.id = u.dpt_id WHERE u.dpt_id =: dpt_id ORDER BY u.usr_nome ASC")
    public List<UserDTO> findByDepartmentId(@Param("dpt_id") Long dptId);
}
