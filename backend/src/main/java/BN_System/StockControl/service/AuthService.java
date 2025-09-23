package BN_System.StockControl.service;

import org.springframework.stereotype.Service;
import BN_System.StockControl.entity.User;

import BN_System.StockControl.entity.User;
import BN_System.StockControl.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createLogin(email, password, role) {
        return userRepository.save(user);

    }

    public User 

}
