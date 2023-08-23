# :notebook_with_decorative_cover: Renraku

##### Internship Final Assessment Project

## App Overview

A Contact Manager App built using:

- Backend
  - .Net 6 Web API
  - Entity Framework Core 6
- Database
  - MS SQLServer
- Frontend
  - [ReactJS](https://react.dev/)
  - [MUI](https://mui.com/)
  - [Dicebear](https://www.dicebear.com/)

---

## App Features

- Login and Register as a user :man:
- Create, Edit, and Delete Contacts :phone:
- View Recent Contacts :eyes:

---

## Pulling the application

`Clone` or `Fork` the project's repository or download the zip.

> Can also download the docker-compose.yml file for demo of the app.

### :whale: Using the docker-compose.yml

Start Docker Desktop.

Make sure to be in the directory of the `docker-compose.yml` when running the following commands in your terminal.

Pull the latest images:
`docker compose pull`

Run:
`docker compose up`

Head over to `http://localhost:5173/` to start using the application or in docker desktop: ![frontendstart](frontendstart.png)

**Known Issue** :warning: \
If api-1 container exits after docker compose, make sure there are no same instance of the SqlServer running. Stop and Restart the containers.

---

### Using the application

There is a  default user made with a username and password: `admin`, `admin` respectively.

---

### Prepared by:

**Ethan** - Raphael Pierre Antonni Laconsay \
[GitHub](https://github.com/rlaconsayfs)

<img src="phonebook.gif" alt="phonebook" width="250" height="250" />