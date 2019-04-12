#Chatty App

ChattyApp is a single page application built with React and WebSockets that allows multiple users to chat in real time.

##Final Product
###This is what you'll see when you first open the app

!['Screenshot of homepage](https://github.com/ronan-f/chattyApp/blob/master/docs/homescreen.png?raw=true)

###Once a new user joins you'll receive a text notification and the nav bar will update to display how many people are currently connected

!['Multiple users screenshot'](https://github.com/ronan-f/chattyApp/blob/master/docs/multipleUsers.png?raw=true)

###Users can edit their username and will be automatically assigned a random color upon connection

!['Change colors and usernames screenshot'](https://github.com/ronan-f/chattyApp/blob/master/docs/changeNamesColors.png)


###Images can be sent along with text
!['Images can be sent along with text'](https://github.com/ronan-f/chattyApp/blob/master/docs/sendImages.png)

###In theory, unlimited users could connect to the app
!['Unlimited users'](https://github.com/ronan-f/chattyApp/blob/master/docs/unlimitedUsers.png?raw=true)

###Finally, upon disconnection there is a text notification and once again the navbar will update in real time

!['User disconnected](https://github.com/ronan-f/chattyApp/blob/master/docs/disconnected.png?raw=true)


##Getting started

To start, clone or download this repo. Run npm install from terminal to install all dependencies. From the chattyApp directory use command npm start to launch the client side server. With this server still running cd into chatty_server and again run npm start to launch the WebSockets server. Finally, from your browser go to localhost:3000 and enjoy chatting!


##Dependencies

* React
* React-dom
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* Babel-core
* Babel-preset
* CSS-loader
* Node-sass
* SASS-loader
* Sockjs-client
* Style-loader

