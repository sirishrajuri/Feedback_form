package com.sirish.springjwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.sirish.springjwt.models.ERole;
import com.sirish.springjwt.models.Role;
import com.sirish.springjwt.repository.RoleRepository;

import javax.annotation.PostConstruct;
import java.util.*;

@SpringBootApplication
public class SpringBootSecurityJwtApplication {

	@Autowired
	private RoleRepository roleRepository;

	@PostConstruct
	public void insertIntoRoles(){
		List<Role> roles= new ArrayList<>();
		roles.add(new Role(ERole.ROLE_USER));
		roles.add(new Role(ERole.ROLE_ADMIN));
		roles.add(new Role(ERole.ROLE_MODERATOR));
		List<Role> existing=roleRepository.findAll();
		if(existing.isEmpty()){
			roleRepository.saveAll(roles);
		}

	}

	public static void main(String[] args) {
		SpringApplication.run(SpringBootSecurityJwtApplication.class, args);
	}

}
