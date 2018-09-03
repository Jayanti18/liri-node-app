// js
require("dotenv").config();
// refer keys.js file here
var keys = require("./keys.js");
var fs = require("fs");
var spotify = require('node-spotify-api');


var spotify = new spotify(keys.spotify);
var inputString = process.argv;
var movieName = inputString[3];
var liriReturn = inputString[2];


// ***************

var Spotify = require('node-spotify-api');

// switch statement for multiple commands
switch (liriReturn) {
  case "spotify-this-song":
    spotifyThisSong();
    break;

  case "movie-this":
    movieThis();
    break;

  case "concert-this":
    bandInTown();
    break;
  case "do-what-it-says":
    whatever();
    break;
  // display the instructions below first time
  default: console.log("\n" + "type any command from below after 'node liri.js':" + "\n" +
    "spotify-this-song 'any song title' " + "\n" +
    "movie-this 'any movie title'" + "\n" +
    "concert-this 'any artist/band name'" + "\n" +
    "do-what-it-says " + "\n" +
    "use quotes for multi words");
};
// excute the function for Artist, song's name, album name and preview link from spotify.
function spotifyThisSong(trackName) {
  var trackName = process.argv[3];
  console.log(trackName);
  if (!trackName) {
    trackName = "The Sign";
  };
  songRequest = trackName;
  spotify.search({
    type: "track",
    query: songRequest
  },
    function (err, data) {
      if (!err) {
        var trackInfo = data.tracks.items;
        for (var i = 0; i < 4; i++) {
          if (trackInfo[i] != undefined) {
            // get the artist name, song, link and album for the song  
            var spotifyResults =
              "Artist: " + trackInfo[i].artists[0].name + "\n" +
              "Song: " + trackInfo[i].name + "\n" +
              "Preview Link: " + trackInfo[i].preview_url + "\n" +
              "Album: " + trackInfo[i].album.name + "\n"

            console.log(spotifyResults);
          };
        };

      } else {
        console.log('Error has occurred : ' + err);
        return;
      };
    });

};

// *********************
// excute the function for Bands in town - Name of the venue, venue location, date of event (MM/DD/YYYY).
function bandInTown(bandOrArtistName) {
  var bandOrArtistName = process.argv[3];

  
 var APP_ID="codingbotcamp"
  var bandsintown = require('bandsintown')(APP_ID);
  var dates;
 
  // Run a request to the Band in Town Artist events API.
  var queryURL = "https://rest.bandsintown.com/artists/" + bandOrArtistName + "/event?app_id=codingbootcamp";
  
    bandsintown
    .getArtistEventList(bandOrArtistName, dates)
      .then(function(response) {
    // If the request is successful
    // if (!error && response.statusCode === 200) {

console.log(response);

var bandResults =
// "Artist Name: " + venue.name + "\n" +
// "Name of the Venue:" + response.venue.place + "\n" +
// "Venue location:" + response.venue.city + "\n" +
"Date of the Event: " + response.formatted_datetime + "\n"  

console.log(bandResults);
  });
};


//OMDB function ****************

function movieThis(movieName) {
  var movieName = process.argv[3];

 var request = require("request");

  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  
  // This line is just to help us debug against the actual URL.
  

  request(queryUrl, function (error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
console.log(body);

var movieResults =
"Title of the movie: " + JSON.parse(body).Title + "\n" +
"Year the movie came out: " + JSON.parse(body).Year + "\n" +
"IMDB Rating of the movie: " + JSON.parse(body).imdbRating + "\n" +
"Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value + "\n" +
"Contry where the movie was produced: " + JSON.parse(body).Country + "\n" +
"Language: " + JSON.parse(body).Language + "\n" +
"Plot of the movie: " + JSON.parse(body).Plot + "\n" +
"Actors in the movie: " + JSON.parse(body).Actors + "\n"

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log(movieResults);
    }
  });
}

// **********************

function whatever(){
    fs.readFile("random.txt", "utf8", function(err, data) {
      if (err) {
        logOutput.error(err);
      } else {
  
        // Creates array with data.
        var randomArray = data.split(",");
        // Sets action to first item in array.
			action = randomArray[0];

			// Sets optional third argument to second item in array.
			argument = randomArray[1] 
        console.log(argument);
      
        process.argv[3] = argument;
        spotifyThisSong(argument);
        console.log(argument);
        
      }
    });
  }
  
