# Blog Website 
On this website you can register and login. Create a Blogpost and update them. Other people can see the posts and sort them by category. 

## How to start the project 

By starting the backend, the frontend gets served by it under http://localhost:5000 or by the PORT defined in the .env file. 

First you need to creat a `.env` with the your credentials. A `example.env` file is provided in the backend folder.

## Start the backend

### `cd Backend;npm install`

Installs all the needed dependencies.

### `node server.js`

Runs the backend.

## Hosting

The website is build and hosted via Google Cloud Platform. It gets automaticly build inside of a docker container, if it gets pushed to the main branch on github.

## website architecture

![Alt text](Flow.jpg?raw=true "Flow")

## website url

To visit the hosted version of the website, go to: http://localhost:5000/