#Express starter API
This is a simple structured express application to get you started in build your next API. API is a production ready with mongodb and redis database. Full auth routes using access and refresh tokens. Feel free to send a pull request 😁

## Installation & Setup ##

If you dont't have an existing server; You could get $100 in credit over 60 days from Digitalocean to deploy this. Signup [here](https://m.do.co/c/5caff7bbbeaa).

`git clone https://github.com/samuelogu/express-api-starter.git`

`cd express-api-starter`

`npm i`

`touch .env`

You will need to have [Mongodb](https://docs.mongodb.com/manual/installation/) and [Redis](https://redis.io/download) database installed on your system to use both connectors. Update the `.env` file.

```javascript
DATABASE_URL=mongodb://localhost:27017/my_database
PORT=3000

ACCESS_TOKEN_SECRET=24869ff533c03cf43e3827f80e8763164460ds45w41a3d71f4eb887b91bf7613
ACCESS_TOKEN_LIFE=20m
REFRESH_TOKEN_SECRET=5de9bfa90f9c227783b2f7a3793932ew341192f2512bd020c808438df9b90c4a
REFRESH_TOKEN_LIFE=1y
TOKEN_ISSUER=yourwebsite.com
```

Start your server with `npm start` and you are ready to start building