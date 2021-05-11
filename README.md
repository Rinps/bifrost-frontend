# Bifrost Frontend

---

A simple web application that allows interaction with a database.

## General information

---

This application was developped as a technical test. It's purpose is to display basic use of React, HTML and CSS to interact with a backend in order to manage a supply of products.
The application display the current supply on the home page, allow the user to modify or delete a product. Another page can be accessed to create a new product and insert it into the database.

![Site homepage][/documentation_assets/site-screenshot.png]

## Technologies

---

- React
- HTML / CSS
- Redux

## Installation

---

Start by downloading the repository on your computer. This project uses yarn to manage packages. If you don't have it, enter the following:
$ sudo npm install -g yarn

Now, you can start installing the required packages. Go into the the application main repertory and enter the following commands:
$ yarn add react-router-dom axios redux react-redux @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome

For the application to work correctly, you need to specify the backend URL in an environment variable named REACT_APP_BACKEND_URL.
The backend made for this project can be found on [this link][https://github.com/rinps/bifrost-backend].

You can test the application locally by going to the application main repertory and using the following command:
$ yarn start
