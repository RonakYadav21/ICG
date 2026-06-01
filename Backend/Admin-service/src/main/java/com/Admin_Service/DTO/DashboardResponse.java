package com.Admin_Service.DTO;

public class DashboardResponse {

    private Long totalStudents;
    private Long totalTemplates;
    private Long pendingApprovals;
    private Long activeAdmins;

    public DashboardResponse() {
    }

    public DashboardResponse(
            Long totalStudents,
            Long totalTemplates,
            Long pendingApprovals,
            Long activeAdmins
    ) {
        this.totalStudents = totalStudents;
        this.totalTemplates = totalTemplates;
        this.pendingApprovals = pendingApprovals;
        this.activeAdmins = activeAdmins;
    }

    public Long getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(Long totalStudents) {
        this.totalStudents = totalStudents;
    }

    public Long getTotalTemplates() {
        return totalTemplates;
    }

    public void setTotalTemplates(Long totalTemplates) {
        this.totalTemplates = totalTemplates;
    }

    public Long getPendingApprovals() {
        return pendingApprovals;
    }

    public void setPendingApprovals(Long pendingApprovals) {
        this.pendingApprovals = pendingApprovals;
    }

    public Long getActiveAdmins() {
        return activeAdmins;
    }

    public void setActiveAdmins(Long activeAdmins) {
        this.activeAdmins = activeAdmins;
    }
}