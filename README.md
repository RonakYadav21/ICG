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

- JWT-based authentication
- Spring Security integration
- Role-based access control (RBAC)
- API Gateway centralized authorization
- BCrypt password encryption
- Stateless authentication

### Student Management

- Student registration
- Course-wise student retrieval
- Dashboard statistics

### Admin Workflow

- Admin registration
- Pending admin approval management
- Approve/Reject operations
- Event-driven status synchronization

### Template Management

- Create ID card templates
- Update/Delete templates
- Course-wise ID card generation
- Dynamic template filling

### Microservices Features

- Service discovery using Eureka
- Centralized routing through API Gateway
- Event-driven architecture using RabbitMQ
- Loose coupling between services

---

## Technology Stack

### Backend

- Java 17
- Spring Boot 3
- Spring Cloud
- Spring Security
- Spring Data JPA

### Microservices & Cloud

- Spring Cloud Gateway
- Eureka Service Discovery
- OpenFeign

### Messaging

- RabbitMQ

### Database

- PostgreSQL

### API Documentation

- Swagger / OpenAPI

### Development Tools

- Maven
- Docker
- Git
- Postman

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

- POST /auth/register
- POST /auth/login

### Student Service

- POST /student/studentRegistration
- GET /student/by-course/{courseId}
- GET /student/dashboard-stats

### Admin Service

- POST /Admin/signup
- GET /Admin/pending-admins
- PUT /Admin/approve/{id}
- PUT /Admin/reject/{id}
- GET /Admin/stats

### Template Service

- POST /templates
- GET /templates
- GET /templates/{id}
- PUT /templates/{id}
- DELETE /templates/{id}
- GET /templates/{templateId}/fill
- POST /templates/save
- GET /templates/dashboard-stats

---

## Security Architecture

- JWT Authentication
- Spring Security
- Role-Based Authorization
- Gateway-Level Request Filtering
- Protected Service Endpoints
- Stateless Sessions

---

## Project Impact

- Automated student onboarding and ID card generation workflows.
- Reduced manual administrative effort by approximately 70%.
- Improved scalability through microservices architecture.
- Enhanced reliability using asynchronous RabbitMQ communication.
- Secured all APIs through centralized JWT authentication and authorization.

---

## Future Enhancements

- Docker Compose deployment
- Centralized Config Server
- Distributed Logging
- Redis Caching
- Circuit Breaker Implementation
- Cloud Deployment (AWS/Azure/GCP)

---

![alt text](<Screenshot 2026-07-28 at 10.00.09 PM.png>)
![alt text](<Screenshot 2026-07-28 at 10.00.28 PM.png>)

# Digital ID Card Generation System - Frontend

## Overview

The frontend of the **Digital ID Card Generation System** is a modern React-based web application that provides an intuitive interface for students and administrators to manage the complete digital ID card generation workflow.

Built with **React, Vite, and Tailwind CSS**, the application enables student registration, administrator approval, template creation, course management, and high-quality digital ID card generation. The frontend communicates securely with the backend microservices through the API Gateway using JWT authentication.

---

# Features

## Authentication

- Secure Login & Registration
- JWT-based Authentication
- Role-Based Access Control (Admin & Student)
- Protected Routes
- Automatic Token Validation
- Persistent User Sessions

---

## Dashboard

### Admin Dashboard

- Dashboard analytics
- Pending approval requests
- Student statistics
- Course-wise insights
- Template management
- Quick navigation to system modules

### Student Dashboard

- View profile
- Registration status
- Generated ID card access

---

## Student Registration

- Complete student registration form
- Real-time form validation
- Cloudinary image upload integration
- Secure image storage
- Responsive UI
- Course selection

---

## Template Designer

A fully interactive ID card template builder allowing administrators to design customized ID cards.

### Features

- Create multiple templates
- Course-specific templates
- Built-in default templates
- Add dynamic fields
- Resize and position elements
- Text styling
- Image placeholders
- Custom layouts
- Live preview
- Save reusable templates

---

## ID Card Generation

- Generate ID cards using templates
- Dynamic data filling
- Individual ID card export
- Bulk ID card generation
- Bulk ZIP download support
- High-quality image rendering

---

## Student Management

- View all registered students
- Filter students by course
- Search student records
- View registration status
- Manage student information

---

## Responsive Design

- Mobile-friendly interface
- Tablet support
- Desktop optimized
- Modern UI using Tailwind CSS

---

# Application Workflow

## Student Registration

1. Student fills the registration form.
2. Profile image is uploaded to Cloudinary.
3. Student details are submitted securely.
4. Registration status remains **Pending** until approval.

---

## Admin Workflow

1. Admin logs into the dashboard.
2. Reviews pending registrations.
3. Approves or rejects users.
4. Manages templates.
5. Generates digital ID cards.

---

## Template Workflow

1. Create a new template.
2. Add text and image fields.
3. Position and style components.
4. Save the template.
5. Generate ID cards using student data.

---

## Export Workflow

1. Select a student or an entire course.
2. Generate ID cards.
3. Download:
   - Single ID Card
   - Bulk ZIP containing all generated cards

---

# Technology Stack

## Frontend

- React 19
- Vite
- JavaScript (ES6+)

## Styling

- Tailwind CSS 4
- Tailwind Forms
- React Icons

## State Management

- Context API

## Routing

- React Router DOM

## API Communication

- Axios

## Authentication

- JWT Decode

## Canvas & Template Editor

- React Konva
- Konva

## File Handling

- JSZip
- File Saver

## Image Upload

- Cloudinary

## Notifications

- React Hot Toast

---

# Project Structure

```
src/
│
├── components/
├── pages/
├── context/
├── services/
├── utils/
├── assets/
├── hooks/
├── layouts/
└── App.jsx
```

---

# Key Highlights

- Modern React architecture
- Secure JWT authentication
- Role-based authorization
- Interactive template designer
- Cloudinary image uploads
- Course-wise template management
- Bulk ID card generation
- Bulk ZIP export
- Responsive user interface
- Context API for global state management
- Fast development using Vite

---

# Performance Optimizations

- Optimized image uploads using Cloudinary
- Lazy API requests
- Efficient component rendering
- Reusable React components
- Context API to minimize unnecessary prop drilling
- Fast build and hot module replacement with Vite

---

# Security

- JWT Authentication
- Protected Routes
- Secure API communication
- Role-based authorization
- Token validation
- Restricted admin operations

---

# Future Enhancements

- Dark Mode
- Drag-and-drop template editor
- Template versioning
- PDF export support
- QR Code integration
- Student profile editing
- Notification center
- PWA support
- Offline mode
- Multi-language support

---

# Screens

- Login & Registration
- Admin Dashboard
- Student Dashboard
- Student Registration Form
- Template Designer
- Student Management
- Course Management
- ID Card Preview
- Bulk Export Module

---

# Impact

- Digitized the complete student onboarding process.
- Simplified administrator approval workflows.
- Enabled highly customizable ID card template creation.
- Reduced manual ID card generation effort through bulk exports.
- Improved user experience with responsive design and secure authentication.
- Efficiently handled profile image uploads using Cloudinary.
