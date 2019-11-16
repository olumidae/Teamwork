[![Maintainability](https://api.codeclimate.com/v1/badges/01afcb208a326abddb6c/maintainability)](https://codeclimate.com/github/olumidae/Teamwork/maintainability)
[![Build Status](https://travis-ci.org/olumidae/Teamwork.svg?branch=develop)](https://travis-ci.org/olumidae/Teamwork)
[![Coverage Status](https://coveralls.io/repos/github/olumidae/Teamwork/badge.svg?branch=ch-fix-codebase)](https://coveralls.io/github/olumidae/Teamwork?branch=ch-fix-codebase)



## Project Title
Teamwork is an ​internal social network for employees of an organization. The aim of this application is to facilitate more interaction between colleagues and promote team bonding. 

# Installation
To install and run the project you need to do the following:

Create the folder you wish to run the project in

Clone the repository: git clone https://github.com/olumidae/Teamwork.git in the folder you created

Install all dependencies by running the command: **npm** install

Start the server by running thhe command: **npm** start

Navigate to localhost: 3000/api/v1 in your browser to view the running application

# Testing
To run unit tests run the command : **npm** test in the command line terminal

#API Endpoints
<table>
<tr><th>HTTP VERB</th><th>ENDPOINT</th><th>FUNCTIONALITY</th></tr>

<tr><td>POST</td><td>/api/v1/auth/create-user</td><td>User signup</td></tr>

<tr><td>POST</td><td>/api/v1/auth/signin</td><td>User signin</td></tr>

<tr><td>POST</td><td>/api/v1/articles</td><td>User post article</td></tr>

<tr><td>PATCH</td><td>/api/v1/articles/<:articleId></td><td>User edit article</td></tr>

<tr><td>DELETE</td><td>/api/v1/articles/<:articleId></td><td>User delete article</td></tr>

<tr><td>POST</td><td>/api/v1/articles/<:articles>/comment</td><td>User comment on article</td></tr>

<tr><td>POST</td><td>/api/v1/gifs</td><td>User post gifs</td></tr>

<tr><td>DELETE</td><td>/api/v1/gifs/<:gifId></td><td>User delete gifs</td></tr>

<tr><td>POST</td><td>/api/v1/gifs/<:gifsId>/comment</td><td>User comment on gifs</td></tr>

<tr><td>GET</td><td>/api/v1/feed</td><td>User view articles or gifs by most recent</td></tr>

<tr><td>GET</td><td>/api/v1/gifs/<:gifId></td><td>User view specific gif</td></tr>

<tr><td>GET</td><td>/api/v1/articles/<:articleId></td><td>User view specific article</td></tr>

</table>

## Features

## Admin
* Admin can create users/employees

## User
* User can sign in
* User can create and share gifs with other colleagues.
* User can write and/or share articles with colleagues on topics of interest to  them.
* Employees can edit their articles.
* Employees can delete their articles.
* Employees can delete their gifs post.
* Employees can comment on other colleagues' article post
* Employees can comment on other colleagues' gif post
* Employees can view all articles, showing the most recently posted articles first.
* Employees can view a specific article. 


## Built With
* *Node JS*
* *Express JS*


# Author
## Omitiran Olumide
