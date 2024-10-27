# ELEC5620 Group19 Project - U-Well (University Wellness)

## Overview

### 1. Introduction

U-Well (University Wellness) is a health support web application designed to address the unique healthcare needs of university students. The app provides a range of services, from mental health support to symptom checking and disease information retrieval, powered by LLM-based agents such as GPT-3/4 or open-source alternatives. U-Well focuses on fostering a supportive and accessible healthcare environment for students, offering personalized health consultations, reminders for medical tasks, and relaxation guidance.

#### 1.1. Project’s Objectives

The primary objective of U-Well is to create a user-centric, AI-powered platform that assists students in managing their mental and physical health. The app aims to deliver personalized healthcare advice, provide mental health support through conversational interactions, and help users manage appointments and medical reminders. Additionally, U-Well will facilitate real-time health consultations with healthcare professionals, ensuring that students have access to reliable health resources when they need them.

#### 1.2. Scope

The scope of U-Well encompasses a wide array of healthcare services designed specifically for university students. The application aims to provide seamless support, ranging from mental health assistance to disease information retrieval. Additionally, the scope includes appointment scheduling, symptom assessment, and collaborative health discussions among peers and healthcare professionals. With a strong focus on personalization, U-Well is adaptable to each user’s health journey.

Core services include:
- Mental health support, symptom checking, and disease information retrieval.
- Personalized health data tracking for diet, sleep, and other habits.
- Appointment management services with reminders for medical tasks.
- Real-time chat options with healthcare professionals.
- Health forum discussions for peer-to-peer advice and shared experiences.
- Optional collaborative chat sessions with other users for real-time support.
- Designed for easy integration into daily student life, enhancing overall health management.

#### 1.3. Significance

U-Well’s significance lies in its ability to address the growing mental and physical health challenges faced by university students. The app provides timely, accessible, and personalized health support, helping students to stay informed, manage their well-being, and access professional healthcare resources as needed. With mental health becoming a critical issue among students, U-Well leverages AI to reduce the stigma around seeking help and makes healthcare more approachable.

The significance of our project can be documented as follows:
- Provides accessible and immediate healthcare support for university students.
- Enhances student well-being by reducing stress and anxiety associated with health management.
- Promotes mental health support through LLM-powered empathetic conversations.
- Facilitates personalized healthcare advice and symptom tracking to help students stay informed.
- Bridges the gap between students and healthcare professionals, encouraging proactive healthcare.
- Addresses the growing demand for mental health resources in academic environments.

#### 1.4. The Role of LLM-Based Agents

LLM-based agents are central to U-Well’s functionality, driving intelligent conversations and health advice. By leveraging powerful AI models like GPT-3/4 or open-source alternatives, the agents are capable of providing empathetic mental health support, stress-relief exercises, and healthcare information. These agents ensure that U-Well delivers high-quality, tailored responses based on user input, creating a personalized and supportive environment for each user.

The role of integrating LLM agents with our project can be described as follows:
- LLM agents process user queries to provide tailored healthcare advice and mental health support.
- They offer empathetic conversations, suggest relaxation techniques, and provide stress-relief guidance.
- Assist in symptom checking and disease information retrieval based on real-time inputs.
- Enable real-time chat with users, adjusting responses dynamically based on user needs and preferences.
- Use AI to personalize healthcare insights, creating a more engaging and supportive user experience.
- Ensure the application remains adaptive and responsive to evolving health trends and user data.
- Assist users with planning their schedules as an in-app task tracker, alleviating the need for separate tools.

## Prerequisites

Before you begin, ensure you have met the following requirements:

* [Node.js](https://nodejs.org/) v20.17.0 or later
* [Java JDK](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) version 17
* [PostgreSQL](https://www.postgresql.org/) (stable version must be installed and running in the background)
* [Gradle](https://gradle.org/) (v8.7)
* [Ollama](https://ollama.com) (v3.2)

## Installation

To install the project dependencies, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the frontend folder in your terminal.
3. Run the following command to install all necessary packages: `npm install`

## Configuration

To start the development server, navigate in the `elec5620-frontend` directory, use the following command: `npm run dev`. This will launch the frontend application on a local development server, typically accessible at `http://localhost:5173`.

## React + Vite

This template provides a minimal setup to get React working in Vite with Hot Module Replacement (HMR) and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh.

## Database Setup

Before starting the backend server, you need to set up the PostgreSQL database:

1. Create a database for the application.
2. Create a user with permissions to access the database.
3. Create the necessary tables according to the schema defined in the project.

To set up the PostgreSQL database and user, follow these steps:

1. **Open your terminal**.

2. **Connect to the PostgreSQL command line** as the default user (usually `postgres`) using:

    `psql -U postgres`

    You may need to enter your PostgreSQL password.

3. **Create the database:**

    `CREATE DATABASE elec5620db;`

4. **Create a new user with a password:**

    ```CREATE USER elecuser WITH PASSWORD 'yourpassword';```


4. **Grant privileges to the new user on the database:**

    ```GRANT ALL PRIVILEGES ON DATABASE elec5620db TO elecuser;```

5. **Connect to the newly created database:**

    ``` psql -U elecuser -d elec5620db```
    Enter password: 'yourpassword' to connect.

## Gradle + SprintBoot


To start the development server, navigate in the `elec5620-backend` directory, use the following command: `gradle bootRun`. This will launch the frontend application on a local development server, typically accessible at `http://localhost:8080`.

## LLM - Ollama

To start the LLM server, download the ollama version specified above and run following:
`ollama run llama3.2`

## Deployment

The project is set up to be deployed using Jenkins. To deploy the application, follow these steps:

1. Configure Jenkins to build and deploy the project.
2. Set up the deployment environment to match the project requirements.
3. Trigger the deployment process through Jenkins.

## Advanced Technologies Used

### Application Frameworks

* React+Vite: Frontend
* NPM: Package Manager
* Spring Boot: Backend  
* Gradle: Build Automation Tool
* Database: PostgresSQL
* Docker: Deployment

### Deployment Systems

* Docker

    Dockerfile for Backend

    ### Steps
1. In backend/Dockerfile:

   ``` 
    FROM openjdk:17-jdk-slim

    WORKDIR /app

    COPY target/app.jar app.jar

    EXPOSE 8080

    ENTRYPOINT ["java", "-jar", "app.jar"]```

    Dockerfile for Frontend
2. In frontend/Dockerfile:
    ```
    FROM node:18 AS build

    WORKDIR /app

    COPY package.json package-lock.json ./

    RUN npm install

    COPY . .

    RUN npm run build

    FROM nginx:alpine

    COPY --from=build /app/build /usr/share/nginx/html

    EXPOSE 80
    ```

3. Docker Compose, In the root docker-compose.yml:
    ```
    version: '3.8'
    services:
    backend:
        build: ./backend
        ports: ["8080:8080"]
    frontend:
        build: ./frontend
        ports: ["3000:80"]
    Build and Run
    ```
4. In the project root, run:

    ```
    docker-compose build && docker-compose up
    ```
5. Access the Application

    ```
    Frontend: http://localhost:3000

    Backend: http://localhost:8080
    ```


### New AI Tools or Techniques

* LLM Agent Ollama version 3.2

## Helpful Links

* [U-Well Documentation](https://example.com/uwell-docs)
* [LLM Agent Ollama Documentation](https://example.com/ollama-docs)
* [Jenkins Deployment Guide](https://example.com/jenkins-deployment-guide)
* [User Stories](https://drive.google.com/file/d/1o4tw13VcVI5tXJZZvgH5fYJmho8faIli/view?usp=sharing)
* [Contribution Table](https://docs.google.com/document/d/1pE-ZKiFhp2LR0S5xu0XFEXQGZV7gShYwgxbmsCg09UA/edit?usp=sharing)