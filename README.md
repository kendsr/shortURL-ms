
URL Shortener Microservice

Features

    Pass a URL as a parameter and receive a shortened URL in the JSON response
    Visit the shortened URL and be redirected to the original.
    Passing an invalid URL will return an error in the JSON response
Usage:

Creating New Shortened URL:

    shortURL-ms.heroku.com/http://www.weather.com
    
JSON Response:

    {"shortURL": "k1mc5FN", "longURL": "http://www.weather.com"}
    
Passing Shortened URL:

    shortURL-ms.heroku.com/k1mc5FN
    
Redirects to:
    http://www.weather.com

Install:

NodeJS required

Momgodb required

Clone or download repository to a directory then run "npm install"

        Installs express, ejs, mongoose, mongoose-shortid-nodeps and valid-url

If not running locally two environment variables are required:

        APPURL      = The Url for your application
        
        DATABASEURL = URL for mongodb installation


