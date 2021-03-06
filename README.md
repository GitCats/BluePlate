# BluePlate

Flash deals from restaurants to consumers:

* Allows users to find deals offered by participating restaurants.
* Allows restaurants to post limited-time deals after signing up directly with the app owners.
* Users can filter the deals by cuisine and by deals that expire tomorrow or within a week (default is the current day's deals).
* Users can click on deals to see a modal pop-up with further relevant information including a map of the restaurant's location, a countdown to deal expiration, and a link to Yelp reviews of the restaurant.
* Users can enter an address on the homepage to see the distance from that address to each restaurant, and their associated routes in the modal views, provided by Google Maps.
* Users can sign up/log in to set notification preferences when a deal is posted by any participating restaurant of their choice.
* Upon logging in, restaurant owners/managers may create and update their restaurant profile, create deals, view current and expired deals, and manually expire deals any day before the preset day of expiration.

## Versioning

This project may be deployed in different versions with changes in time-based filtering ability, styling, or other features.

## Documentation

The app is live on Heroku here: [https://blueplate-mks.herokuapp.com](https://blueplate-mks.herokuapp.com) (subject to daily limits of free usage of the Google Maps API key). You may sign up as a user on your own from the client (note, you must use a valid email address in order to test the email notifications feature).

See [API_spec.md](https://github.com/GitCats/BluePlate/blob/master/API_spec.md) for API POST and GET routes. See [this video demo](https://www.youtube.com/watch?v=EN23hRR2vFU) for an intro to the app's functionality.

BluePlate relies on the Google Maps, Yelp, Nodemailer, and Twilio APIs. Its stack is primarily ReactJS, PostGreSQL, Node, and Express.

## Installation

After cloning down the repo, run "npm install" from the parent directory to install project dependencies. Run "npm start" from the parent directory to start the server.

## Licensing

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a></br>Except where otherwise noted, content from this app is licensed under a Creative Commons Attribution 4.0 International license.

## Contacts

The authors may be contacted by email:</br>
Kayla Handy ([kayla.j.handy@gmail.com](mailto:kayla.j.handy@gmail.com)), Salman Oskooi ([soskooi@gmail.com](mailto:soskooi@gmail.com)), Garrett Brustkern ([gbrustkern@gmail.com](mailto:gbrustkern@gmail.com)), Kayla Matteo ([kaylamatteo@gmail.com](mailto:kaylamatteo@gmail.com))

