## Synopsis

Sample app demonstrating people search from the shocase.com database.

## Installation

App can be run from a system with **node** installed or a standard HTTP server.

##### With Node:

- Clone repo or download and unpack zip file.
- Change directory to root directory.
- Run start command

```
node start.js
```

- You will then be able to access the app in your web browser at the url **http://localhost:8080**

##### With HTTP server

- Clone repo or download and unpack zip file.
- Upload folder to web server
- Use web browser to access root folder 

**http://domain.com/shocase**

##### Disabling CORS

If the app is not run on the shocase.com domain, CORS errors will occur and prevent the app from operating properly.  Recommend running app on a shocase.com domain or using a plugin on your web browser to disable CORS. For Google Chrome, I recommend the extension **Allow-Control-Allow-Origin**.
