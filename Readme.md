# DAIRY WEBSITE

This is a website made for online dairy writing.
This website is built by using with HTML, CSS, JS, NODEJS, EXPRESS, MYSQL.

## UI

UI is implemented using basic HTML, CSS, BOOTSTRAP and JAVASCRIPT.

## API

APIs are implemented by using NODEJS and EXPRESS framework.

```
/api/v1/users (POST) => This API is used for Validating user credentials.
/api/v1/signup (POST) => This API is used for creating a new user.

/api/v1/dairy (POST) => This API is used for creating a new Entry.

/api/v1/dairy/:id (GET) => This API is used for getting all diaries for an user.
/api/v1/dairy/:id/:dairyID (GET) => This API is used to Edit entry specific to an user based on user ID.
/api/v1/dairy/:id (PUT) => This API is used for updating the changes made by an user.
/api/v1/dairy/:id(DELETE) => This API is used for deleting an entry by the user.
```

## DATABASE

MYSQL databse is used to store the data.

[Script](/db-scripts/DB-QUERIES.sql)
