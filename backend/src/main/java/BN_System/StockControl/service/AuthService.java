package BN_System.StockControl.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import BN_System.StockControl.entity.User;


import BN_System.StockControl.repository.UserRepository;

@Service
public class AuthService {

    private UserRepository userRepository;

    public  AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createLogin(User user) {
        return userRepository.save(user);

    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUser(Long id, User userDetails) {
        return userRepository.findById(id).map(user -> {
            user.setName(userDetails.getName());
            user.setPassword(userDetails.getPassword());
            return userRepository.save(user);
        })
        .orElseThrow(() -> new RuntimeException("User not found with id " + id));
    }

    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}
