# FRONTEND DOCUMENTATION

## Overview

This document provides an overview of the front-end stack and workflow for this chatbot project. The front end is built using modern JavaScript libraries and frameworks, providing a user interface that interacts with the backend.

## Stack

### 1. React

- **Library**: React is a JavaScript library for building user interfaces. It enables the creation of reusable UI components and efficiently manages the state and rendering of the application.

### 2. Vite

- **Build Tool**: Vite is a build tool that provides a fast development experience and optimized builds. It is used to bundle and serve the front-end code.

### 3. Axios (or Fetch)

- **HTTP Client**: Axios is used for making HTTP requests to the backend API. It simplifies sending and receiving data between the front end and the backend.

### 4. React Router

- **Routing**: React Router is used to manage routing and navigation within the React application. It enables dynamic rendering of components based on the URL.

### 5. Tailwind CSS (optional)

- **Styling Framework**: Tailwind CSS is a utility-first CSS framework that allows for rapid design and styling of components.

## Workflow

### Project Setup

1. **Initialize Project**:

   ```bash
   mkdir my-frontend
   cd my-frontend
   ```

2. **Create a Vite Project**:

   ```bash
   npm create vite@latest .
   ```

3. **Install Dependencies**:

   ```bash
   npm install react-router-dom axios
   ```

   If using Tailwind CSS:

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init
   ```

### Directory Structure

More information is coming later
