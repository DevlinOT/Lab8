// Import Express and initialise the server
const express = require('express');
const app = express();

// Set the port number for the server
const port = 4000;

// Import and enable Cross-Origin Resource Sharing (CORS)
const cors = require('cors');
app.use(cors());

// Configure HTTP headers to allow requests from different origins
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  // Specify the HTTP request methods that are allowed
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  // Specify the request headers that are allowed
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass control to the next middleware function
  next();
});

// Import body-parser to process incoming request data
const bodyParser = require('body-parser');

// Allow the server to process URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// Allow the server to process JSON data
app.use(bodyParser.json());

// Import Mongoose to communicate with the MongoDB database
const mongoose = require('mongoose');

// Connect to the MongoDB database
mongoose.connect('YOUR_MONGODB_CONNECTION_STRING');

// Define the structure of a movie document in the database
const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  poster: String
});

// Create a Movie model using the movie schema
const Movie = mongoose.model('Movie', movieSchema);

// DELETE request used to remove a movie from the database
app.delete('/api/movie/:id', async (req, res) => {

  // Display the ID of the movie being deleted
  console.log('Deleting movie with ID:', req.params.id);

  // Find and delete the movie using its unique database ID
  const movie = await Movie.findByIdAndDelete(req.params.id);

  // Return a success message and the deleted movie
  res.status(200).send({ message: "Movie deleted successfully", movie });

  // Confirm the deletion in the server console
  console.log("Deleted Movie with id " + req.params.id);

});

// GET request for the root URL of the server
app.get('/', (req, res) => {

  // Return a simple message to confirm the server is running
  res.send('Hello World');
});

// GET request used to retrieve all movies from the database
app.get('/api/movies', async (req, res) => {

  // Retrieve all movie documents from MongoDB
  const movies = await Movie.find({});

  // Return the movies to the client in JSON format
  res.json(movies);
});

// Original GET request used to return hardcoded movie data
// This is no longer required as movies are now stored in MongoDB

// app.get('/api/movies', (req, res) => {
//   const myMovies = [
//     {
//       "Title": "Avengers: Infinity War (server)",
//       "Year": "2018",
//       "imdbID": "tt4154756",
//       "Type": "movie",
//       "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
//     },
//     {
//       "Title": "Captain America: Civil War (server)",
//       "Year": "2016",
//       "imdbID": "tt3498820",
//       "Type": "movie",
//       "Poster": "https://m.media-amazon.com/images/M/MV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
//     },
//     {
//       "Title": "World War Z (server)",
//       "Year": "2013",
//       "imdbID": "tt0816711",
//       "Type": "movie",
//       "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
//     }
//   ]
//   res.json({ myArray: myMovies });
// })

// POST request used to add a new movie to the database
app.post('/api/movies', async (req, res) => {

  // Extract the movie details from the request body
  const { title, year, poster } = req.body;

  // Create a new movie document using the Movie model
  const newMovie = new Movie({ title, year, poster });

  // Save the new movie to the MongoDB database
  await newMovie.save();

  // Return a 201 status code to confirm the movie was created
  res.status(201).json({
    message: 'Movie created successfully',
    movie: newMovie
  });
});

// GET request used to retrieve a specific movie by its ID
app.get('/api/movie/:id', async (req, res) => {

  // Find the movie in the database using its unique ID
  const movie = await Movie.findById(req.params.id);

  // Return the requested movie to the client
  res.send(movie);
});

// Start the Express server on the specified port
app.listen(port, () => {

  // Display a message confirming the server is running
  console.log(`Server is running on http://localhost:${port}`);
});
