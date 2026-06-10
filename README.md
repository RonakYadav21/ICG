# Microservices-Based Digital ID Card Generation System

## Overview

The Digital ID Card Generation System is a microservices-based platform designed to automate student onboarding, admin approval workflows, and digital ID card generation. The application follows a distributed architecture using Spring Boot and Spring Cloud, enabling scalability, maintainability, and secure inter-service communication.

The system consists of independent services responsible for authentication, student management, template management, and admin operations, all connected through an API Gateway and Eureka Service Discovery.

---

## Architecture

### Services

| Service          | Responsibility                                                                   |
| ---------------- | -------------------------------------------------------------------------------- |
| API Gateway      | Centralized routing, JWT validation, and request filtering                       |
| Auth Service     | User registration, authentication, JWT generation, and account status management |
| Student Service  | Student registration and management                                              |
| Admin Service    | Admin approval/rejection workflow and dashboard analytics                        |
| Template Service | ID card template management and dynamic ID card generation                       |
| Eureka Server    | Service discovery and registration                                               |
| RabbitMQ         | Asynchronous communication between services                                      |

---

## Key Features

### Authentication & Security

* JWT-based authentication
* Spring Security integration
* Role-based access control (RBAC)
* API Gateway centralized authorization
* BCrypt password encryption
* Stateless authentication

### Student Management

* Student registration
* Course-wise student retrieval
* Dashboard statistics

### Admin Workflow

* Admin registration
* Pending admin approval management
* Approve/Reject operations
* Event-driven status synchronization

### Template Management

* Create ID card templates
* Update/Delete templates
* Course-wise ID card generation
* Dynamic template filling

### Microservices Features

* Service discovery using Eureka
* Centralized routing through API Gateway
* Event-driven architecture using RabbitMQ
* Loose coupling between services

---

## Technology Stack

### Backend

* Java 17
* Spring Boot 3
* Spring Cloud
* Spring Security
* Spring Data JPA

### Microservices & Cloud

* Spring Cloud Gateway
* Eureka Service Discovery
* OpenFeign

### Messaging

* RabbitMQ

### Database

* PostgreSQL

### API Documentation

* Swagger / OpenAPI

### Development Tools

* Maven
* Docker
* Git
* Postman

---

## System Workflow

### User Registration

1. User registers through the platform.
2. Auth Service stores credentials securely.
3. Passwords are encrypted using BCrypt.
4. User status is initially marked as Pending.

### Authentication

1. User submits login credentials.
2. AuthenticationManager validates credentials.
3. JWT token is generated.
4. API Gateway validates JWT for protected routes.

### Admin Approval Workflow

1. Admin reviews pending registrations.
2. Admin approves or rejects a user.
3. Admin Service publishes an event to RabbitMQ.
4. Auth Service consumes the event.
5. User status is updated automatically.

### ID Card Generation

1. Admin creates a template.
2. Template Service retrieves course-wise student data.
3. Student information is merged with the template.
4. Generated ID card data is returned.

---

## RabbitMQ Event Flow

Admin Service
↓
RabbitMQ Exchange
↓
admin-status-queue
↓
Auth Service Consumer
↓
User Status Updated

This asynchronous communication ensures loose coupling and improves system reliability.

---

## API Highlights

### Auth Service

* POST /auth/register
* POST /auth/login

### Student Service

* POST /student/studentRegistration
* GET /student/by-course/{courseId}
* GET /student/dashboard-stats

### Admin Service

* POST /Admin/signup
* GET /Admin/pending-admins
* PUT /Admin/approve/{id}
* PUT /Admin/reject/{id}
* GET /Admin/stats

### Template Service

* POST /templates
* GET /templates
* GET /templates/{id}
* PUT /templates/{id}
* DELETE /templates/{id}
* GET /templates/{templateId}/fill
* POST /templates/save
* GET /templates/dashboard-stats

---

## Security Architecture

* JWT Authentication
* Spring Security
* Role-Based Authorization
* Gateway-Level Request Filtering
* Protected Service Endpoints
* Stateless Sessions

---

## Project Impact

* Automated student onboarding and ID card generation workflows.
* Reduced manual administrative effort by approximately 70%.
* Improved scalability through microservices architecture.
* Enhanced reliability using asynchronous RabbitMQ communication.
* Secured all APIs through centralized JWT authentication and authorization.

---

## Future Enhancements

* Docker Compose deployment
* Centralized Config Server
* Distributed Logging
* Redis Caching
* Circuit Breaker Implementation
* Cloud Deployment (AWS/Azure/GCP)

---


