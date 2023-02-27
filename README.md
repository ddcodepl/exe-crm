# proexe Recruitment Task 🚀

The challenge was to build a simple user managing app with three routes: "/home", "/add", and "/edit/:id". The "/home" route allows users to view a list of existing users and their details. The "/add" route enables users to add a new user by filling out a form with the user's details. Finally, the "/edit/:id" route lets users edit an existing user's details by specifying the user's ID.

This user management app provides a straightforward way to manage user information, allowing users to easily add, view, and edit user details as needed. With these three routes, the app enables users to quickly and easily manage user information from a central location.

## Technologies

### Frontend
* [Next.js](https://nextjs.org/)
* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)

### Backend
* [NestJS](https://nestjs.com/)
* [TypeScript](https://www.typescriptlang.org/)

### Database
* [MongoDB](https://www.mongodb.com/)

### Deployment
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)

## Getting Started

To start application only one thing you need to do is run `docker-compose up -d` in the root directory of the project. This will start the application and all the required services.

**Important**: Use `/users/seed` backend endpoint to seed the database with initial users. This is only possible when the database is empty.

* Frontend is available at http://localhost:27015
* Backend is available at http://localhost:27016

### Frontend

The frontend is a Next.js application. It provides the following pages:

* `/` - redirects to `/home`
* `/home` - displays a list of all users
* `/add` - displays a form for adding a new user
* `/edit/:id` - displays a form for editing an existing user by ID

### Backend

The backend is a REST API built with NestJS. It provides the following endpoints:

* `GET /users` - returns a list of all users
* `GET /users/seed` - seeds the database with initial users
* `GET /users/:id` - returns a single user by ID
* `POST /users` - creates a new user
* `PUT /users/:id` - updates an existing user by ID
* `DELETE /users/:id` - deletes an existing user by ID

Full API documentation is available at http://localhost:27016/docs

Backend is using soft delete approach. When user is deleted, it's not removed from the database, but it's marked as deleted. This approach allows us to keep the history of deleted users.