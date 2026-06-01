package com.Admin_Service.service;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Admin_Service.DTO.DashboardResponse;
import com.Admin_Service.DTO.RegisterAuthUserRequest;
import com.Admin_Service.Entity.Admin;
import com.Admin_Service.client.AuthClient;
import com.Admin_Service.client.StudentFeignClient;
import com.Admin_Service.client.TemplateFeignClient;
import com.Admin_Service.repository.AdminRepository;
@Service
public class AdminService {
	@Autowired
	private AdminRepository adminrepo;

	@Autowired
	 private AuthClient authServiceClient;
	   @Autowired
	    private StudentFeignClient studentFeignClient;

	    @Autowired
	    private TemplateFeignClient templateFeignClient;
	    
	    @Autowired
	    private AdminRepository adminRepository;

	public Admin Register(Admin admin) {
//		System.out.println(admin);
		 Admin savedadmin=	adminrepo.save(admin);
		  RegisterAuthUserRequest authUser = new RegisterAuthUserRequest();
		    authUser.setUsername(admin.getEmail());
		    authUser.setPassword(admin.getPassword());
		    authUser.setRole("ROLE_ADMIN");
//		    authUser.setStatus("PENDING");
//		    authUser.setRole("ROLE_ADMIN");
		    authUser.setStatus(admin.getStatus());
		    authServiceClient.registerUser(authUser);
			return savedadmin;
		}
	  public DashboardResponse getDashboardStats() {

	        Map<String, Long> studentStats =
	                studentFeignClient.getStudentStats();

	        Map<String, Long> templateStats =
	                templateFeignClient.getTemplateStats();

	        Long totalStudents =
	                studentStats.get("totalStudents");

	        Long pendingApprovals =
	        		 adminRepository.countByStatus("PENDING");

	        Long totalTemplates =
	                templateStats.get("totalTemplates");

	        Long activeAdmins =
	                adminRepository.countByStatus("ACTIVE");

	        return new DashboardResponse(
	                totalStudents,
	                totalTemplates,
	                pendingApprovals,
	                activeAdmins
	        );
	    }
	  

	    public List<Admin> getPendingAdmins() {

	        return adminRepository.findByStatus("PENDING");
	    }

	    // =========================
	    // APPROVE ADMIN
	    // =========================
	
	    public Admin approveAdmin(Long id) {

	        Admin admin = adminRepository.findById(id)
	                .orElseThrow(() ->
	                        new RuntimeException("Admin not found"));

	        admin.setStatus("ACTIVE");

	        return adminRepository.save(admin);
	    }

	    // =========================
	    // REJECT ADMIN
	    // =========================
	 
	    public Admin rejectAdmin(Long id) {

	        Admin admin = adminRepository.findById(id)
	                .orElseThrow(() ->
	                        new RuntimeException("Admin not found"));

	        admin.setStatus("REJECTED");

	        return adminRepository.save(admin);
	    }
	
}
