import {useRef, useState, useEffect, useContext} from 'react';
import { NavLink, Link, useNavigate, useLocation ,useParams, Outlet } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const BOOKING_URL = ''

const BookingPage = () => {
    const [success, setSuccess] = useState(false) 
    const {auth, setAuth} = useAuth();
    const [locationDetails, setLocationDetails] = useState(null)
    //bookingID 
    //startTime 
    //duration
    //numPeople 
    //userID 
    //postalCode 
    //address


    useEffect(() => {

    })

    const handleSubmit = (async (e) => {
        e.preventDefault();
        try { 
            const response = await axios.post(BOOKING_URL,
                JSON.stringify({
                    bookingID: '',
                    startTime: '',
                    duration: '',
                    numPeople: '',
                    userID: '',
                    postalCode: ' ',
                    address: ''
                })

            )

        } catch (err) {

        }
    })


    return (
        <>
        {success? 
        (
            <section className='w-[400px] md:w-[500px] lg:w-[600px] h-auto border border-gray-200 bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center'>
            <h1 className='py-4'> Booking Successful!</h1> 
            <br/>
            <NavLink className = 'bg-gray-200 px-4 py-2 border border-black-300 rounded hover:shadow-lg transition-shadow' to = {'/profile'}> Click here to View your Booking</NavLink>
        </section>
        ) 
        : 
        (
        <section className='w-[400px] md:w-[500px] lg:w-[600px] h-auto border border-gray-200 bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center'> 
            <h1 className='font-bold text-xl'>Create A Booking</h1>
            <form className='' onSubmit = {handleSubmit}>
            
            <label className=' block'>
                Start Time of Booking:
            </label>
            
            <label className=' block'>
                Duration of Booking:
            </label>

            <div className=' block'>
            <label htmlFor='numpeople'>
                Number of People: 
            </label>
            <input
            id = 'numpeople'
            placeholder='enter a number here'
            required
            />
            </div>
            



            <button className='px-4 py-2 text-sm rounded border border-gray-200 bg-blue-500 hover:shadow-lg hover:bg-blue-600 transition-shadow text-white'
            type='submit'
            >
                Book
            </button>
            </form>
            </section> 
        )}
        </>
        
    )
}

export default BookingPage;