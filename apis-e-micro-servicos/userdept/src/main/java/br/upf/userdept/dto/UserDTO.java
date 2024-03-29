package br.upf.userdept.dto;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Entity
@Table(name = "tb_user")

public class UserDTO {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "usr_nome", nullable = false)
	private String nome;
	
	@Column(name = "usr_email", nullable = false)
	private String email;	
	
	@Column(name = "usr_senha", nullable = false)
	private String senha;	
	
	@Column(name = "usr_nascimento")
	private Date dataNascimento;

	@Transient
	private String token;
	
	@ManyToOne
	@JoinColumn(name = "dpt_id")
	private DepartmentDTO department;
	
}
