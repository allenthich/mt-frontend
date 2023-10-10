# mt-frontend

A TypeScript React task management application built using Next.js.

## Table of contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Routes](#routes)
- [Project Structure](#project-structure)
- [Development Scripts](#development-scripts)
- [To do](#to-do)
- [References](#references)

## Overview
This project utilizes the following stack:

- Framework - [Next.js](https://nextjs.org/)
- Language - [TypeScript](https://www.typescriptlang.org)
- Styling - [Tailwind CSS](https://tailwindcss.com/)
- Auth - [JSON Web Tokens](https://jwt.io/)
- Formatting - [Prettier](https://prettier.io/)

## Getting Started

Install npm dependencies:

```
cd mt-frontend
npm install
```

<!-- Populate `.env` values:

```
API_URL="..."
``` -->

Start the server:

```
npm run dev
```

The server is now running on `http://localhost:3000`.

## Routes
List of accessible pages and routes:

- `/` : Renders home page
- `/tasks` : Renders tasks dashboard page
- `/auth/login` : Renders login page
- `/registration` : Renders sign up page
- `/logout` : Renders log out page

## Project Structure
The project follows a page/component-based colocation structure. Note not all files and folders are listed for simplicity.
```
├── src
│   ├── app
│   │   ├── auth/login
│   │   ├── context         // Context state providers folder
│   │   ├── logout
│   │   ├── registration
│   │   ├── tasks           // Tasks dashboard 
│   │   ├── _app.tsx        // Main component wrapper
│   │   ├── layout.tsx      // Main layout
│   │   └── page.tsx        // Home page of app
│   └── components          // Modular, shared components
│       ├── TaskItem.tsx
│       └── TaskList.tsx
├── types
├── utils
└── tsconfig.json

```
## Development Scripts
### Next.js
#### Build project for production
```
npm run build
```

## To do
- [ ] Port localhost and API endpoints to env variables
- [ ] Add feedback for task actions: create, delete
- [ ] Refactor state management and redirect logic
- [ ] Filter feature
- [ ] Use `Bearer` standard for HTTP request header authorization
- [ ] Normalize API return responses
- [ ] Create/abstract API service to perform communicates
- [ ] Standardize Error responses across all potential Error types
- [ ] Write tests for user flows
- [ ] http-status-codes ReasonPhrases usage?

## References
<details><summary><strong>Notes</strong></summary>
</details>
<details><summary><strong>Other sources</strong></summary>
</details>