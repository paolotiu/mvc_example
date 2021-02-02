# 4Impact MVC Submission

This a simple blog app made to showcase the mvc framework written in TypeScript.

#### MVC

Each compenent of the MVC framework can be found in the `src` folder.

#### OOP

Typescript and Javascript has classes, but most typescript/javascript apps take on a more functional approach. As for this app I leaned more on the OOP paradigm to fit the specifications.

#### Singleton

I exported a class instance in my model, routes, and controller files because this is the easiest and most straightforward way of implementing a singleton for typescript.

## Setup

To clone the repo
`$ git clone https://github.com/paolotiu17/mvc_example.git`

Then install the modules with the package manager of your choice
`$ yarn install` or `$ npm install`

### .env file

This app requires a `.env` file for the database to connect.

Create a `.env` file and inside copy the snippet below. Replace `<YOUR_MONGODB_URL>` with your MongoDB Atlas Url.

`DB_URL=<YOUR_MONGODB_URL>`

### Starting the app

You can start the app by running

`$ npm run dev `

or

`$ yarn run dev`
