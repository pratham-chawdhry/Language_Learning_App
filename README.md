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
     - **Start the backend server**: Just click in the run button after navigating to the LanguageLearningAppApplicationTests.java
     - **Start the frontend React Native app**: Multiple games implemented to make language learning fun and interactive. Each game is designed to reinforce vocabulary, grammar, and pronunciation in a dynamic way.
      ```bash
      cd lang-model
      npx expo start -c
     - **Proxy Server:** To set up the proxy-Server
      ```bash
         cd proxy-server
         node server.mjs
## Architecture Overview

### Frontend (React Native)
   - The frontend of our Language Learning App is built using Expo and React Native, providing a modern, responsive, and interactive user interface. The app structure is organized into components, with each component serving a specific function to create a seamless user experience for language learners. The frontend leverages Expo to enable rapid development and easy deployment to both iOS and Android platforms.

   -Key features like Text-to-Speech (TTS) are integrated into the app’s frontend, allowing users to hear spoken language prompts, improving their pronunciation and listening skills. The TTS functionality is implemented within the components, where text is dynamically converted into speech based on user input or game activity. This feature is particularly helpful in games like character recognition and word arrangement, where users need to match sounds with words.

   -The app’s UI is designed to be intuitive, with easy navigation between the sign-up, login, and various game interfaces. The game components include interactive features such as fill-in-the-blanks and comprehension questions, which are enhanced by API calls to the Gemini API.

   -Additionally, React Navigation is used for smooth transitions between screens, while state management is handled efficiently to ensure real-time updates of user progress and game status. The frontend is designed to provide a fun, gamified experience that motivates users to engage in language learning while interacting with the backend via API calls for dynamic content.

### Backend (Spring Boot)
   - The backend of our Language Learning App is designed with Spring Boot, providing a secure, scalable, and efficient foundation for language-learning activities. Core components such as AppConfig.java, JwtConstant.java, JwtProvider.java, and JwtTokenValidator.java handle crucial functionalities.

   -The AppConfig.java file centralizes configuration settings, ensuring smooth integration across the backend. User authentication is managed using JWT (JSON Web Token) protocols, where JwtConstant.java defines essential constants, JwtProvider.java generates tokens and authenticates users, and JwtTokenValidator.java validates each request. This setup offers secure, role-based access control, maintaining data protection and session integrity.

   -Our app also integrates with the Gemini API to enhance the language-learning experience, enabling activities like fill-in-the-blanks, comprehension questions, character recognition, and word arrangement games based on translation and speech. The backend efficiently manages requests to Gemini API, handling data retrieval and caching, which optimizes response times and reduces server load.

   -Furthermore, the backend connects to a MySQL database that securely stores user profiles, learning progress, and game data. This architecture ensures high performance and reliability, supporting seamless interaction between the app’s front end and data management services. Overall, our backend is structured to provide a responsive and immersive experience for language learners.

### Database (MySQL)
   - The app uses a MySQL database to store and manage all user data, including profiles, progress, game data, and comprehensive language content. This structure ensures the data is organized, secure, and ready to scale as the user base grows. 

### Gemini API Calls in Python
   - The integration of Gemini API calls is done through Python, which handles complex language-learning functionalities at high speed and accuracy. Using Python for API calls allows us to leverage its rich set of libraries and clear syntax for seamless data parsing and manipulation, ensuring that the app delivers language content quickly and accurately. Each Gemini API call is fine-tuned to handle various user queries and returns precisely the data needed for personalized learning paths, whether users are working on vocabulary, grammar, or pronunciation.

   - The Python integration offers error handling and logging features that add to the robustness, ensuring a smooth learning journey for every user. This layer of precision enhances the app’s interactivity by returning data in near real-time, making it feel like users are conversing directly with the language engine.

### Proxy Server (Node.js)
   - A Node.js proxy server acts as the bridge between the frontend and backend, effectively managing and optimizing requests. By using Node.js, we ensure that data transfer is both quick and secure, with minimized latency even for more complex, data-intensive calls. This server handles load balancing, caching, and cross-origin requests seamlessly, enhancing the app’s responsiveness.

   - The proxy server’s efficiency shines in handling Gemini API calls as it routes requests and responses effortlessly, allowing the backend to focus on heavy processing tasks. By isolating the proxy in Node.js, we also maintain a clear separation of concerns, making the entire system more modular, secure, and easier to debug. With real-time data streaming capabilities, this proxy ensures that every interaction with the Gemini API is delivered as efficiently as possible, elevating the user’s learning experience.

Together, these components create a robust, high-performance architecture designed to support an interactive, data-rich language learning platform.
