
import { useState, useEffect} from 'react'
import { Link, Outlet, NavLink} from "react-router-dom";
import useUpdate from '../hooks/useUpdate';
import axios from '../api/axios';
import { v4 as uuidv4 } from 'uuid';


const ReviewComponent = (props) => {
    const {ID, score, comment, address, postalCode} = props;
    const {update, setUpdate} = useUpdate();
    const [location, setLocation] = useState('')

    const handleClick = async (e) => {
        e.preventDefault();
    
        try {
            console.log({ID})

            // await axios.delete(`http://localhost:50004/userComments/${ID}`);
            // console.log("Comment deleted successfully");


            await axios.delete(`http://localhost:50004/ratings/${ID}`);
            console.log("Rating deleted successfully");
    
            
    
            
            setUpdate(uuidv4().replace(/-/g, '').slice(0, 10)); 
        } catch (error) {
            console.error("Error deleting review or comment:", error);
        }
    };
    useEffect(() => {
        axios.get(`http://localhost:50004/locations/${postalCode}/${address}`)
        .then((response) => {
            
            setLocation(response.data.data)
        })
    }, [])

    return (
        <>
        {location ? (
        <div className="bg-gray-100 py-4 p-4 rounded-lg border border-black-200 shadow-md">
            <p>
                <span className="font-bold">{location.locationName} </span> 
            </p>
            <p>
                <span className="font-bold">Score:</span>{" "}
                {Math.round((score + Number.EPSILON) * 100) / 100}/5
            </p>
            <p>
                <span className="font-bold">Comment:</span> {comment}
            </p>
            <button
            className='bg-red-500 text-white px-2 py-2 border rounded-lg hover:bg-red-600 transition-shadow'
            onClick = {handleClick}>
                Delete Review
            </button>
        </div>
        ):
        (<div>loading </div>)
        }
        </>
    );
};


export default ReviewComponent;