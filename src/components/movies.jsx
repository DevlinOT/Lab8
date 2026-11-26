// Import the MovieItem component
import MovieItem from "./movieItem";

// Component used to display the list of movies
function Movies(props) {
    return (
        <>
            {/* Loop through the array of movies using the map function */}
            {props.myMovies.map((movie) => (

                // Create a MovieItem component for each movie
                <MovieItem
                    // Pass the individual movie data to MovieItem
                    myMovie={movie}

                    // Provide a unique key using the movie's database ID
                    key={movie._id}

                    // Pass the reload function to refresh the movie list
                    // after a movie has been deleted
                    Reload={props.ReloadData}
                />
            ))}
        </>
    );
}

// Export the component so it can be used in other files
export default Movies;
