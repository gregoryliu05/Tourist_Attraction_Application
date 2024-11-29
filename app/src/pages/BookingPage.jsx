import {useRef, useState, useEffect, useContext} from 'react';
import { NavLink, Link, useNavigate, useLocation ,useParams, Outlet } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const BOOKING_URL = 'http://localhost:50004/bookings/add-booking'
const STARTTIME_REGEX = /^(0?[1-9]|1[0-2])(:[0-5][0-9])?(AM|PM)$/;
const DURATION_REGEX = /^([1-9]|1[0-9]|2[0-4])(\.[0-9]{1,2})?$|^0\.[1-9]([0-9]?)?$/;
const NUMPEOPLE_REGEX = /^([1-9]|[1-9][0-9])$/;

const BookingPage = () => {
    const {auth, setAuth} = useAuth();
    const params = useParams();

    const ratingRef = useRef();
    const errRef = useRef();


    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false) 
    const [locationDetails, setLocationDetails] = useState(null)

    //startTime USE stat
    const [startTime, setStartTime] = useState('')
    const [validStartTime, setValidStartTime] = useState(false)
    const [timeFocus, setTimeFocus] = useState(false)
    //duration
    const [duration, setDuration] = useState('')
    const [validDuration, setValidDuration] = useState(false)
    const [durationFocus, setDurationFocus] = useState(false)

    //numPeople 
    const [numPeople, setNumPeople] = useState('')
    const [validNumPeople, setValidNumPeople] = useState(false)
    const [numPeopleFocus, setNumPeopleFocus] = useState(false)
    
    useEffect(() => {
        ratingRef.current.focus()
    }, [])

    useEffect(() => {
        const result = STARTTIME_REGEX.test(startTime)
        console.log(result)
        setValidStartTime(result)
    }, [startTime])

    useEffect(() => {
        const result = DURATION_REGEX.test(duration)
        setValidDuration(result)
    }, [duration])

    useEffect(() => {
        const result = NUMPEOPLE_REGEX.test(numPeople)
        setValidNumPeople(result)
    }, [numPeople])

    useEffect(() => {
        setErrMsg('')
    }, [startTime, duration, numPeople])    

    useEffect(() => {
        console.log('auth', auth)
        axios.get(`http://localhost:50004/locations/${params.locationID}`

        ).then((response) => {
            console.log("location booking page", response.data.data)
            setLocationDetails(response.data.data)
        })
    }, [params])

    const handleSubmit = (async (e) => {
        e.preventDefault();
        try { 
            console.log('details of booking', startTime, duration, numPeople, auth.userID, locationDetails.postalCode, locationDetails.address)
            const response = await axios.post(BOOKING_URL,
                JSON.stringify({
                    bookingID: uuidv4().replace(/-/g, '').slice(0,10),
                    startTime,
                    duration,
                    numPeople,
                    userID: auth.userID,
                    postalCode: locationDetails.postalCode,
                    address: locationDetails.address
                }),
                {headers: {'Content-Type': 'application/json'},
                withCredentials: true,
            }
        
            );
            console.log("axios response:" , response)
            console.log("worked???")
            setStartTime('')
            setDuration('')
            setNumPeople('')
            setSuccess(true)
        } catch (err) {
            if (!err?.response) {
                setErrMsg('no server response');
            } else if (err.response?.status === 400) {
                setErrMsg('missing fields');
            } else if (err.response?.status == 500) {
                const serverMessage = err.response?.data?.message || 'Internal server error';
                setErrMsg(serverMessage);
            } else {
                setErrMsg('login failed')
            }
            errRef.current.focus();

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
        <p ref={errRef} className={errMsg ? "py-4 border  border-gray-200 rounded-lg p-4 flex text-red-500" : "hidden"} aria-live='assertive'
        >{errMsg}</p>
            <h1 className='font-bold text-xl'>Create A Booking</h1>
            <form className='' onSubmit = {handleSubmit}>
            
            <label className=' block' htmlFor='time'>
                Start Time of Booking:
                <span className={ !startTime ? "hidden": " "}>{validStartTime ? " ✅": " ❌"}</span>
            </label>
            <input
            className='py-2 border border-gray-200 rounded-lg p-4 flex'
            type = 'text'
            id = 'time'
            onChange={(e) => {setStartTime(e.target.value)}}
            value = {startTime}
            required
            aria-invalid = {validStartTime ? 'false' : 'true'}
            aria-describedby= 'timenote'
            onFocus={() => setTimeFocus(true)}
            onBlur={() => setTimeFocus(false)}
            placeholder='ex 5PM, 12:15AM'
            ref = {ratingRef}
            maxLength= '8'
            />
            <p id = "timenote" 
            className= {timeFocus && startTime && !validStartTime ? "py-4 border bg-gray-200 border-gray-200 rounded-lg p-4 flex text-black-500" : "hidden"}
            >
               ex: 12:30PM, 2AM, 11:59AM <br/>
               invalid: 12:30 PM, 2:AM, 23:59AM 
            </p>
            
            <label className=' block' htmlFor='duration'>
                Duration of Booking:
                <span className={ !duration ? "hidden": " "}>{validDuration ? " ✅": " ❌"}</span>
            </label>
            <input
           className='py-2 border border-gray-200 rounded-lg p-4 flex'
            type = 'text'
            id = "duration"
            onChange = {(e) => {setDuration(e.target.value)}}
            value = {duration}
            required
            aria-invalid = {validDuration ? 'false' : 'true'}
            aria-describedby= 'durationnote'
            onFocus={() => setDurationFocus(true)}
            onBlur={() => setDurationFocus(false)}
            placeholder='ex 2.5, 3, 1.25(in hours)'
            maxLength= '4'
            
            />

            <p id = "durationnote" 
            className= {durationFocus && duration && !validDuration ? "py-4 border bg-gray-200 border-gray-200 rounded-lg p-4 flex text-black-500" : "hidden"}
            >
               ex: 2.5, 3, 1.25(in hours) <br/>
               invalid: 0   &lt; val &le; 24
            </p>


            <div className=' block'>
            <label htmlFor='numpeople'>
                Number of People: 
                <span className={ !numPeople ? "hidden": " "}>{validNumPeople ? " ✅": " ❌"}</span>
            </label>
            <input
            className='py-2 border border-gray-200 rounded-lg p-4 flex'
            id = 'numpeople'
            placeholder='enter an integer between 0 and 100'
            onChange = {(e) => {
                setNumPeople(e.target.value)}}
            value ={numPeople}
            required 
            aria-invalid = {validNumPeople ? 'false' : 'true'}
            aria-describedby= 'durationnote'
            onFocus={() => setNumPeopleFocus(true)}
            onBlur={() => setNumPeopleFocus(false)}
            maxLength= '3'
            />
            </div>
        
            <button className='px-4 py-2 text-sm rounded border border-gray-200 bg-blue-500 hover:shadow-lg hover:bg-blue-600 transition-shadow text-white'
            type='submit'
            disabled = {!validDuration || !validNumPeople || !validStartTime? true: false}
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