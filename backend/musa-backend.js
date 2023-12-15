// MUSA Backend, 2023
// Group Nine, written entirely without any generative models.

console.log("---===[ Starting MUSA Backend ]===---");

// Load the modules we need:
const fs = require('fs');
const cors = require ('cors');
const express = require('express');
const https = require('node:https');
const schedule = require('node-schedule');

// A class to store the data from a single near-miss:
class NearMiss
{
	constructor(name, id, size, distance, date)
	{
		this.name = name;
		this.id = id;
		this.size = size;
		this.distance = distance;
		this.date = date;
	}
}

// A class to store the data for a single APOD:
class Image
{
	constructor(title, explanation, date, url)
	{
		this.title = title;
		this.explanation = explanation;
		this.date = date;
		this.url = url;
	}
}

// Check if the API key exists:
if (!fs.existsSync("./api.secret"))
{
	console.log("There is no api.secret file in this directory. Exiting.");
	process.exit();
}

// Load the API key for use later on:
const API_KEY = fs.readFileSync("./api.secret", "utf8");
console.log("Loaded API Key.");

// Check if the TLS certificates exist:
if (!fs.existsSync('selfsigned.key'))
{
	console.log("There is no TLS key in this directory. Exiting.");
	process.exit();
}

if (!fs.existsSync('selfsigned.crt'))
{
	console.log("There is no TLS key in this directory. Exiting.");
	process.exit();
}

// Load the TLS certs for use later:
const options =
	  {
		  key:  fs.readFileSync('selfsigned.key'),
		  cert: fs.readFileSync('selfsigned.crt')
	  };

// Functions to build various types of requests:
function requestURLForDate (dateToRequest)
{
	return "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + dateToRequest +
		"&end_date=" + dateToRequest + "&api_key=" + API_KEY;
}

function requestURLForDateRange (startDate, endDate)
{
	return "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + startDate +
		"&end_date=" + endDate + "&api_key=" + API_KEY;
}

function requestURLForSmallBody (smallBodyID)
{
	return "https://api.nasa.gov/neo/rest/v1/neo/" + smallBodyID +
		"?api_key=" + API_KEY;
}

function requestURLForPictures (date_object)
{
	// Convert date object into a YYYY-MM-DD string for use in the request:
	let end_date = date_object.getFullYear() +
		"-" + ("0" + (date_object.getMonth() + 1)).slice(-2) +
		"-" + ("0" + date_object.getDate()).slice(-2);

	// Move back a week:
	date_object.setDate(date_object.getDate() - 7);

	// Convert date object into a YYYY-MM-DD string for use in the request:
	let start_date = date_object.getFullYear() +
		"-" + ("0" + (date_object.getMonth() + 1)).slice(-2) +
		"-" + ("0" + date_object.getDate()).slice(-2);

	// Return the appropriate request string:
	return "https://api.nasa.gov/planetary/apod?start_date=" + start_date + "&end_date="+ end_date + "&api_key=" +
		API_KEY + "&thumbs=true";
}

// Create the server:
const server = express();
const port = 4000;
server.use(cors());

// These store global data from the NASA API:
const currentNearMisses = [];
const currentImages = [];

function populateData()
{
	// Format the current date as YYYY-MM-DD:
	let date_object = new Date();
	let date = date_object.getFullYear() +
		"-" + ("0" + (date_object.getMonth() + 1)).slice(-2) +
		"-" + ("0" + date_object.getDate()).slice(-2);

	console.log("Pulling data from NASA.");
	
	// Request the current day's data from the NASA API:
	https.get(requestURLForDate(date), response =>
		{
			let data = "";

			// A chunk of data has been recieved, add it to the received data:
			response.on("data", chunk => {
				data += chunk;
			});

			// The whole response has been received:			
			response.on("end", () => {
				// Parse the collected data into an object:
				let smallBodyData = JSON.parse(data);

				currentNearMisses.length = 0;
				
				// Create an array of objects in the format we need:
				for (let index = 0; index < smallBodyData.element_count; index++)
				{
					currentNearMisses[index] = new NearMiss(
						smallBodyData.near_earth_objects[date][index].name,
						smallBodyData.near_earth_objects[date][index].id,
						smallBodyData.near_earth_objects[date][index].
							estimated_diameter.kilometers.estimated_diameter_max,
						smallBodyData.near_earth_objects[date][index]
							.close_approach_data[0].miss_distance.kilometers,
						smallBodyData.near_earth_objects[date][index].
							close_approach_data[0].close_approach_date
					);
				}
				// Sort near misses by closest to furthest:
				currentNearMisses.sort(function (a, b) {return (a.distance - b.distance);});

				console.log("Near Miss data populated.");
			});
		});

	https.get(requestURLForPictures(new Date()), response =>
		{
			let data = "";
			// A chunk of data has been recieved, add it to the received data:
			response.on("data", chunk => {
				data += chunk;
			});

			// The whole response has been received:
			response.on("end", () => {
				let apodData = JSON.parse(data);

				// Create an array of objects in the format we need:
				currentImages.length = 0;
				for (let index = 0; index < apodData.length; index++)
				{
					if (apodData[index].media_type == "image")
					{
						currentImages[index] = new Image(apodData[index].title, apodData[index].explanation,
														   apodData[index].date, apodData[index].hdurl);					
					}
					else if (apodData[index].media_type == "video")
					{
						currentImages[index] = new Image(apodData[index].title, apodData[index].explanation,
														   apodData[index].date, apodData[index].thumbnail_url);					
					}
				}

				console.log("APOD data populated.");
			})});
}

// Call the populate data function on start-up to get today's data:
populateData();

// Repeatedly request new data every day.
const job = schedule.scheduleJob('5 0 * * *', populateData);

// Respond with the current dataset on every request:
server.get('/nearmiss', (req, res) =>
	{
		res.json((currentNearMisses));
	});

server.get('/images', (req, res) =>
	{
		res.json((currentImages));
	});


// Begin listening:
https.createServer(options, server).listen(port);
console.log('Starting on port ' + port + '.');
