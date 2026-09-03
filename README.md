# Recipe Sharing Web

A recipe-sharing application with an Angular frontend and an Express/MongoDB backend.

## Project Structure

- `Front-end/recipe-web`: Angular application
- `back-end`: Express API and MongoDB integration

## Requirements

- Node.js 24.15.0 or newer
- MongoDB

## Setup

1. Install frontend dependencies:

```bash
cd Front-end/recipe-web
npm install
```

2. Install backend dependencies:

```bash
cd back-end
npm install
```

3. Create `back-end/config.env` locally with the required MongoDB connection, port, and JWT secret settings. This file is intentionally ignored by Git.

## Run the Application

Start the backend in one terminal:

```bash
cd back-end
node server.js
```

The API runs on `http://localhost:3000`.

Start the frontend in another terminal:

```bash
cd Front-end/recipe-web
npm start
```

Open `http://localhost:4200` in your browser.

## Main Pages

- Login: `http://localhost:4200/login`
- Registration: `http://localhost:4200/registration`
- Recipes: `http://localhost:4200/recipes`
- My recipes: `http://localhost:4200/my-recipes`
- Add recipe: `http://localhost:4200/recipe-form`
- Profile: `http://localhost:4200/profile`

## Build

```bash
cd Front-end/recipe-web
npm run build
```

Generated folders, dependencies, and local environment files are excluded from the repository.
