package com.sirish.springjwt.controllers;

import com.sirish.springjwt.models.FormDocument;
import com.sirish.springjwt.models.User;
import com.sirish.springjwt.security.services.UserDetailsImpl;
import com.sirish.springjwt.service.FormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;

import java.util.List;
import java.util.Optional;

import static com.sirish.springjwt.models.ERole.ROLE_ADMIN;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/submitForm")
public class FormController {

    @Autowired
    private FormService formService;

    @PostMapping("/submit")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<FormDocument> submitFeedback(@RequestBody FormDocument form) {
        try {
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
            LocalDateTime now = LocalDateTime.now();
            form.setCommentDate(now);
            FormDocument userForm = formService.save(form);
            return new ResponseEntity<>(form, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/showFeedback")
    @PreAuthorize("hasAnyRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?> showFeedback(@RequestParam Integer id) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();
            if(currentUser.getId()!=(long)id){
                return new ResponseEntity<>("You do not have permission to view this feedback", HttpStatus.FORBIDDEN);
            }
            List<FormDocument> feedbackForm;
            if(currentUser.getAuthorities().contains(new SimpleGrantedAuthority(ROLE_ADMIN.name()))){
                feedbackForm = formService.findAll();
            }
            else{
                feedbackForm = formService.findAllById(id);
            }


            return new ResponseEntity<>(feedbackForm, HttpStatus.OK);


        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/showAll")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> showAll() {
        try {
            List<FormDocument> feedbacks = formService.findAll();
            return new ResponseEntity<>(feedbacks, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


}
