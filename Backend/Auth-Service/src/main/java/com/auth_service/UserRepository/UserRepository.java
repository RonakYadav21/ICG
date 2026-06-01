package com.auth_service.UserRepository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.auth_service.Model.Users;

import java.util.List;


@Repository
public interface  UserRepository extends JpaRepository<Users, Long>{

	 Optional<Users> findByUsername(String username);
	  boolean  existsByUsername(String username);

}
