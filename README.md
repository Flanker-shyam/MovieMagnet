# MovieMagnet
Welcome to the Movies Rental Website API project! This API serves as the backbone for a user-friendly movies rental website, providing seamless access to movie information and allowing users to search for movies as well as add new ones to the database. This README will guide you through the key aspects of the project, its purpose, and how to get started.

## Project Overview
The Movies Rental Website API is designed to handle user requests for movie information. It interacts with a database that stores the records of various movies, allowing users to search for movies and obtain detailed information. Additionally, the API enables users to contribute to the database by adding new movie entries.

## How to run this project

### Clone the project

```bash
git clone https://github.com/Flanker-shyam/moviesAPI.git
```

### Install the dependencies

```bash
npm install
```

### Environment variables

- Create a `.env` file in the root directory of the project
- Add the following to that `.env` file

```
PORT=3000
DB_URL=mongodb://localhost:27017/moviesData
DB_NAME=moviesData
DB_COLLECTION=moviesData
```

### Set jwtPrivateKey value to the environment

- Here in the closed quotations (""), you can provide any string of minimum length 32 characters
- For linux or macOS

```bash
export moviesApi_jwtPrivateKey="" 
```
- Open command prompt and use the following command For Windows
```bash
set moviesApi_jwtPrivateKey=""
```
<em>Note:(Keep in mind that the above command will set the environment variables for the current window of the command prompt)</em>

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

## Contribution
If you're eager to contribute to the MovieMagnet project, please follow these structured steps:

1. Fork the Repository: Fork this repository to your GitHub account.
2. Clone and Create Branch: Clone your forked repository to your local system and create a new branch with a meaningful name (critical for PR creation):
```bash
git clone https://github.com/YourUsername/moviesAPI.git
cd moviesAPI
git checkout -b feature/your-meaningful-feature-name
```
3. Implement Changes: Make your intended changes, commit them, and push to GitHub:
```bash
git add .
git commit -m "Your detailed commit message here"
git push origin feature/your-meaningful-feature-name
```
4. Create a Pull Request: Head to GitHub and create a pull request from your branch to the main repository. Provide clear context about your changes and their significance.

## License
This project operates under the MIT License, granting you the freedom to explore, experiment, and contribute.

Thank you for joining the MovieMagnet endeavor! Our API is poised to transform your movie rental experience. Should you require assistance or wish to engage, feel free to reach out.

Cinematic regards,

Project Developer: Flanker<br>
Contact: <a href=mailto:shyamp665@gmail.com>Shyam Sunder</a>
