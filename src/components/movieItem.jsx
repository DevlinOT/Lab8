// import the rquired react bootstrap components and axios
import Card from 'react-bootstrap/Card';
import axios from "axios";
import Button from 'react-bootstrap/Button';

//componenet used to display an individual movie
function MovieItem(props) {

    //function called when the delete button is clicked
    const handleDelete = (e) => {

        //prevent the default behaviour
        e.preventDefault();

        //send a delete request to the server usingthe movies unique ID
        axios.delete('http://localhost:4000/api/movie/' + props.myMovie._id)
            .then(() => {

                //refresh the movie list after successful deletion
                props.Reload(); // Refresh the movie list after deletion
            })
            .catch((error) => {

                //display error inn the console if deletion fails
                console.error("Error deleting movie:", error);
            });
    };

    return (
        <div>
            {/* create a bootstrap card with centered text */}
            <Card className="text-center">

            
            
                <Card.Body>

                    {/* Display the movie title */}
                    <Card.Title>{props.myMovie.title}</Card.Title>

                    {/* Display the movie poster */}
                    <img src={props.myMovie.poster} />
                </Card.Body>

                {/* Display the movie's release year */}
                <Card.Footer className="text-muted">{props.myMovie.year}</Card.Footer>

                {/* Delete button that calls the handleDelete function */}
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Card>
        </div>
    );
}
// Export the component so it can be used in other files
export default MovieItem;
