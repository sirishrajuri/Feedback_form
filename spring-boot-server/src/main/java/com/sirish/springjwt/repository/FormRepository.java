package com.sirish.springjwt.repository;

import com.sirish.springjwt.models.ERole;
import com.sirish.springjwt.models.FormDocument;
import com.sirish.springjwt.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FormRepository extends JpaRepository<FormDocument,Integer> {

    List<FormDocument> findByUserId(Integer userId);
}
