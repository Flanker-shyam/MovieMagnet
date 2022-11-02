# Movies-API

This Project is an API that will handle the movies search request of the users.
The record of the movies is stored in a database and the API will fetch the data from the database and return the result to the user. The API will also handle the request of the user to add a new movie to the database.

## How to run this project using Docker

**Inorder to run this project using Docker, you need to have Docker installed in your system.**

- There are two ways to run this project using Docker.
- The first way is to run the project using the Dockerfile.
- The second way is to run the project using the docker-compose.yml file.

### Clone the project using the command

```bash
git clone https://github.com/Flanker-shyam/moviesAPI.git
```

### Running the project using docker-compose.yml file.(Prefered way)

- **Change the directory to the project directory**

```bash
cd moviesAPI
```

- **Run the project using the command**
  - As a Development environment
  ```bash
  docker-compose -f .\docker-compose.yml -f .\docker-compose.dev.yml up --build
  ```
  - As a Production environment
  ```bash
    docker-compose up --build
  ```
  Voila! The project is running on your system.

Visit the API at http://localhost:3000/

### Running the project using Dockerfile

- **Clone the project using the command**

```bash
git clone
```

- **Change the directory to the project directory**

```bash
cd moviesAPI
```

- **Build the project image using the command**

```bash
docker build -t moviesapi .
```

- **Run the project using the command**

```bash
docker run -p 3000:3000 moviesapi
```

- **Voila! The project is running on your system.** ( You need to separetlly run the database container into the same network as the API container. ) ( use the docker-compose.yml file to run the project. )

## How to run this project without Container

### Clone the project

```bash
git clone https://github.com/Flanker-shyam/moviesAPI.git
```

### Install the dependencies

```bash
npm install
```

### environment variables

- Create a `.env` file in the root directory of the project
- Add the following to that `.env` file

```
PORT=3000
DB_URL=mongodb://localhost:27017/moviesData
DB_NAME=moviesData
DB_COLLECTION=moviesData
```

### set jwtPrivateKey value to the environment

- Here in the closed ("")closed quotations you can provide any string, minimum length 32 characters
- This command will work in linux and macOS

```bash
export moviesApi_jwtPrivateKey= ""
```

### Start the mongoDB server on port `27017`

- Need to have installed mongoDB in your system

```bash
sudo service mongod start
```

### Run the project

```bash
npm start
```

### Run in Development mode

```bash
npm run dev
```

## Contribute

If you want to contribute to this project, follow these steps:

1. Fork this repository.
2. Clone your forked repository to your local system.
3. Create a new branch with some meaningful name.(Important to make PR)
4. Make necessary changes and commit those changes.
5. Push changes to GitHub.
6. Submit your changes by creating a pull request.
