# Movies-API

This Project is an API that will handle the movies search request of the users.
The record of the movies is stored in a database and the API will fetch the data from the database and return the result to the user. The API will also handle the request of the user to add a new movie to the database.

## How to run this project

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
