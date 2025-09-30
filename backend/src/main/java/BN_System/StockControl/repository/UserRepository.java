package BN_System.StockControl.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import BN_System.StockControl.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
