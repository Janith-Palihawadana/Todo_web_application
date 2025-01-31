# Todo_web_application

## Overview

This project is a simple to-do web application that allows users to create tasks, view the most recent five tasks, and mark tasks as completed. The application consists of three main components:


Frontend : A Single Page Application built using Angular.
Backend  : A RESTful API built using Java and Spring Boot.
Database : A MySQL database to store tasks.

All components are containerized using Docker and orchestrated with `docker-compose`.


## Prerequisites

Ensure the following software is installed on your system:

Docker - https://www.docker.com/get-started
Docker Compose -  https://docs.docker.com/compose/install/


## Setup & Installation


### Clone the Repository

git clone - https://github.com/Janith-Palihawadana/Todo_web_application

cd - main


### Run the Application

To start the application, simply execute the following command in the project backend directory  --- > docker-compose up --build

To start the application, simply execute the following command in the project frontend directory  --- > docker-compose up --build

Data Base migration-> docker-compose exec web php artisan migrate


This will build and start the database, backend API, and frontend UI in separate containers.


### Stop the Application

To stop the application, 
run:  docker-compose down


## Project Structure

|---> backend
        |--->docker-compose.yml        
|---> frontend
	|--->docker-compose.yml	       
|---> database  
|---> README.md


## API Endpoints

| Method | Endpoint            | Description                    |
| ------ | --------------------| ------------------------------ |
| POST   | /create_todo        | Create a new task              |
| GET    | /get_todo_list      | Retrieve the latest five tasks |
| POST   | /complete_todo      | Mark a task as completed       |


## Testing


### Backend Tests


Node version - 16.20.2
Angular version - 16
Angular CLI -  16.2.16
PHP version - 8.1
Laravel version - 10

Run the following command inside the `backend` directory
Database Migration - php artisan migrate
Composer Install - composer install
Finally run -  php artisan test



### Frontend Tests

Run the following command inside the `backend` directory

Run npm install - npm install
Finally run - ng test


This project include a Backend & Frontend Testing folder, where unit tests and integration tests for the backend generate image-related outputs, and unit tests for frontend components handle image processing and display.


## Notes

- Backend service runs on `http://localhost:8080`
- Frontend UI is available at `http://localhost:4200`










       