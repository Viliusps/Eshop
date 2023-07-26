# PVP_K264

## Laikini prisijungimo duomenys:

### Administratorius:

username: testAdmin
password: testAdmin

### Vartotojas:

username: testUser
password: testUser

### Užblokuotas vartotojas:

username: testUser2
password: testUser2

# Database

This project uses the PostgreSQL database.
To run the database, you will need the ['Docker tool'](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartm_button).

## Startup

In the root folder, run the command:

```sh
docker-compose up
```

Restarting the docker can be done with the same command or by activating the container
in _Docker Desktop_.

A running container can be stopped through the _Docker Desktop_ application.

## Login

The database is started at the local address `localhost:5432`.

Username: `admin`, password: `pass`, database name: `postgres`.

The tool used to connect to the database is not important.
