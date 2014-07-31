[Striderfly.xxx](http://striderfly.xxx)
==========
![](http://assets7.thrillist.com/v1/image/1280637/size/tl-today_sq)

## Installation
```
npm install && npm start
```

## Stack
Node.js, Express, Hogan.js

## Pull requests
**Please fork, and then submit a pull request.**  All code must be encapsulated within your respective directories, unless necessary:

```
./routes/user-handle.js
./views/user-handle/*
./public/stylesheets/user-handle/*.css
./public/javascripts/user-handle/*.js
./public/images/user-handle/*.*
```

## Creating Your Page
Add a route file to the routes directory, with your handle.  Your pages will now be served from your handle.  ```e.g. http://striderfly.xxx/jhiggins```
```js
/**
 * Example User's route
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('user-handle/index');
});

module.exports = router;

```

## Contributor Information

All information is stored in ```config/users.js```.  To add a new user, add an object to the ```module.exports```.

```
// Example
module.exports = [
  {
    "handle": "jhiggins",
    "lastName": "Higgins",
    "firstName": "Joseph",
    "email": "joseph.james.higgins@gmail.com",
    "contribution": 10.00,
  }
];
```
