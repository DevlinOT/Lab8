// Import Axios for making HTTP requests to the server
import axios from "axios";

// Import React hooks for managing state and side effects
import { useState, useEffect } from "react";

// Import the Movies component
import Movies from "./movies";

// Component responsible for retrieving and displaying movies
function Read() {

    // Initialise an empty array to store the movie data
    const [data, setData] = useState([]);

    // Function used to retrieve and reload movie data
    const Reload = () => {
        console.log("Reloading movie data...");

        // Send a GET request to retrieve all movies from the server
        axios.get('http://localhost:4000/api/movies')
            .then((response) => {

                // Update the state with the movie data returned by the server
                setData(response.data);
            })
            .catch((error) => {

                // Display an error in the console if the request fails
                console.error("Error reloading data:", error);
            });
    };

    // Run the Reload function when the component first mounts
    // The empty dependency array prevents it from running on every render
    useEffect(() => {
        Reload();
    }, []);

    return (
        <div>
            {/* Display the page heading */}
            <h2>Movie List</h2>

            {/* Pass the movie data and reload function to the Movies component */}
            <Movies myMovies={data} ReloadData={Reload} />
        </div>
    );
}

// Export the component so it can be used in other files
export default Read;
