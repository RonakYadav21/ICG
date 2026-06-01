package com.Admin_Service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Admin_Service.Entity.Admin;


@Repository
public interface AdminRepository extends JpaRepository<Admin,Long> {

	Admin save(Admin admin);
	  List<Admin> findByStatus(String status);

	Long countByStatus(String string);

	
}
