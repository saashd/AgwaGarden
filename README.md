# AgwaGarden

AgwaGarden is a mobile app that allows users to order their favorite plants every month. With AgwaGarden, users can easily browse, order, and manage their plant subscriptions.

## Directory Structure

├── client
│ ├── App
│ │ ├── components
│ │ ├── screens
│ │ ├── store
│ │ ├── index.tsx
│ ├── assets
│ ├── app.json
│ ├── package.json
├── server
│ ├── models
│ ├── routes
│ ├── index.js
│ ├── package.json
│ ├── .env

## Configuration

In order to run the application, you need to set the following environment variables:

`DATABASE_URL` - The URL of your MongoDB database. Example:
mongodb+srv://USERNAME:PASSWORD@sqlauthority.5s3yxjh.mongodb.net/AgwaFarm?retryWrites=true&w=majority
`PASS_SEC`= - A secret key used to encode authentication.  
`JWT_SEC`= - A secret key used to sign and verify JSON Web Tokens.

## Installation and Local Usage

##### Note: You must have Expo installed on your machine to run the app.

To run the app locally, follow the steps below:

- Clone the repository: `git clone https://github.com/{username}/AgwaGarden.git`.
- Navigate to the client directory, install the dependencies and run client-side:

```sh
cd client
yarn install
yarn start
```

- Navigate to the server directory, install the dependencies, build the server-side and start the app.

```sh
cd server
yarn install
yarn build
yarn start
```

# Badges

![React Native](https://img.shields.io/badge/React_Native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Expo](https://img.shields.io/badge/Expo-%23000020.svg?style=for-the-badge&logo=Expo&logoColor=%23FFFFFF)
![Axios](https://img.shields.io/badge/Axios-%23323330.svg?style=for-the-badge&logo=axios&logoColor=%23FFFFFF)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23323330.svg?style=for-the-badge&logo=typescript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/mongoose-red?style=for-the-badge&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
