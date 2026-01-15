# Project Overview

This is a Next.js project that seems to be a web application for managing email campaigns. It includes features for user authentication, campaign management, template creation, and more.

**Key Technologies:**

*   **Frontend:** Next.js, React, NextUI, Tailwind CSS
*   **Authentication:** Custom authentication using JWT (stored in `localStorage`)
*   **Data Fetching:** Axios and SWR
*   **Rich Text Editing:** CKEditor 5
*   **Charting:** Chart.js

**Architecture:**

The project follows a standard Next.js `app` directory structure. 
- The `src/app` directory contains the application's pages and layouts. 
- The `src/components` directory contains reusable React components.
- The `src/context` directory contains React context providers for authentication and Axios.
- The `src/services` directory contains files for making API calls.

# Building and Running

To get the project up and running, follow these steps:

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Run the development server:**
    ```bash
    npm run dev
    ```
3.  Open [http://localhost:3000](http://localhost:3000) in your browser.

**Available Scripts:**

*   `npm run dev`: Starts the development server.
*   `npm run build`: Creates a production build.
*   `npm run start`: Starts the production server.
*   `npm run lint`: Lints the code using ESLint.

# Development Conventions

*   **Styling:** The project uses a combination of NextUI and Tailwind CSS for styling.
*   **Authentication:** Authentication is handled via a custom `AuthContext` provider that stores the user's access token in `localStorage`.
*   **API Requests:** API requests are made using Axios, with a custom `AxiosProvider` to configure the base URL and interceptors.
*   **Data Fetching:** The `swr` library is used for data fetching and caching.
*   **Linting:** The project uses ESLint to enforce code quality.
