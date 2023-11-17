# Blog Website 
On this website you can register and login. Create a Blogpost and update them. Other people can see the posts and sort them by category. 

## How to start the project 

If you want to run this blog locally, make sure to just switch the endpoints towards http://localhost:5000 and it should work.

First you need to creat a `.env` with the your credentials. A `example.env` file is provided in the backend folder.

## Start the backend

### `cd Backend;npm install`

Installs all the needed dependencies.

### `node server.js`

Runs the backend.

## Hosting

The website is build and hosted via Google Cloud Platform. It gets automaticly build inside of a docker container, if it gets pushed to the main branch on github.

## website url

To visit the hosted version of the website, go to: https://se01andse19-q5eo4wheta-ew.a.run.app/home.html