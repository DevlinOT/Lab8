import Card from 'react-bootstrap/Card';
import axios from "axios";
import Button from 'react-bootstrap/Button';

function MovieItem(props) {
    const handleDelete = (e) => {
        e.preventDefault();
        axios.delete('http://localhost:4000/api/movie/' + props.myMovie._id)
            .then(() => {
                props.Reload(); // Refresh the movie list after deletion
            })
            .catch((error) => {
                console.error("Error deleting movie:", error);
            });
    };

    return (
        <div>
            <Card className="text-center">

            
            
                <Card.Body>
                    <Card.Title>{props.myMovie.title}</Card.Title>
                    <img src={props.myMovie.poster} />
                </Card.Body>
                <Card.Footer className="text-muted">{props.myMovie.year}</Card.Footer>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Card>
        </div>
    );
}

export default MovieItem;