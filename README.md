# Language Learning App

Welcome to the **Language Learning App**! This application provides an engaging and interactive platform to help users learn new languages through a variety of games and challenges. With a modern front-end built using React Native and a robust back-end developed with Spring Boot, this app combines performance, scalability, and an intuitive user experience.

## Features

- **User Authentication**: A secure and seamless onboarding experience with sign-up and login functionality.
- **Language Learning Games**: Multiple games implemented to make language learning fun and interactive. Each game is designed to reinforce vocabulary, grammar, and pronunciation in a dynamic way.
- **Gemini API Integration**: The app incorporates **Gemini API calls** to enhance language-learning capabilities, enabling seamless data retrieval and interactions with external language resources.
- **Frontend and Backend Architecture**:
  - **Frontend**: Developed using **React Native**, providing a smooth and responsive interface that works across multiple devices.
  - **Backend**: Powered by **Spring Boot** with a **MySQL** database, ensuring data integrity and efficient handling of user information.
  - **Proxy Server**: A proxy server setup is implemented to streamline communication between the client and server, enhancing performance and security.

## Technology Stack

- **Frontend**: React Native
- **Backend**: Spring Boot
- **Database**: MySQL
- **API**: Gemini API
- **Proxy Server**: Implemented to manage client-server communication efficiently

## Getting Started

### Prerequisites

- **Node.js** and **npm** for React Native setup
- **Java** for Spring Boot backend
- **MySQL** for database

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/pratham-chawdhry/Language_Learning_App.git
   cd Language_Learning_App
   
2. **Frontend Setup**
   Navigate to the frontend directory and install dependencies:
   ```bash
   cd lang-model
   npm i
   npx expo start -c
   
3. **Backend Setup**
   Navigate to the backend directory and set up the Spring Boot project:
   Now just click on the run button on the top right.
   Configure your MySQL database credentials in the application.properties file.
   ```bash
   cd Language_Learning_Backend
   
4. **Proxy-Server**
   To set up the proxy-Server
   ```bash
   cd proxy-server
   node server.mjs
   
5. **Gemini API**
   To set up the Gemini API, Just navigate to the corresponding directory and click on the run button.
   
6. **Database Setup**
   -Ensure MySQL is running, and create the required database and tables.
   -Migrate initial schema if available or start with the Spring Boot project which may auto-configure tables.
   
7. **Running The App**
   -**Start the backend server: Just click in the run button after navigating to the LanguageLearningAppApplicationTests.java**
   -**Start the frontend React Native app**:
   ```bash
    cd lang-model
    npx expo start -c

8. 
