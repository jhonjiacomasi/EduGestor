package com.edu.gestor.service;

import com.edu.gestor.model.User;
import com.edu.gestor.model.Role; 
import com.edu.gestor.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User registerNewUser(User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        if (user.getRole() == null) {
            user.setRole(Role.ALUNO); 
        }

        return userRepository.save(user);
    }
}