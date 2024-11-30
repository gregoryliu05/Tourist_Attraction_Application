import {useRef, useState, useEffect} from 'react';
import { NavLink, Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import axios from '../api/axios';
import TopNavBar from '../components/TopNavBar';
import useAuth from '../hooks/useAuth';
import useUpdate from '../hooks/useUpdate';
import { v4 as uuidv4 } from 'uuid';

const EventElement = (props) => {
    const { event } = props; 

   

    return (
       <div className="flex justify-center items-center bg-white-100 w-96 h-32 p-4">
      <div className="max-w-lg w-full border border-gray-300 rounded-lg shadow-sm p-6 bg-white">
        <h2 className="text-xl font-bold text-gray-800">{event.eventName}</h2>
        <p className="text-sm text-gray-500">
          Address: {event.address}, {event.postalCode}
        </p>
    
      </div>
    </div>
    )
}

const EventsPage = () => {
    const [events, setEvents] = useState(null)
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('')

    const [searchName, setSearchName] = useState('')

    const [searchHost, setSearchHost] = useState('')

    const [searchPostalCode, setSearchPostalCode] = useState('')

    useEffect(() => {
        setErrMsg('')
    }, [searchName])   

    useEffect(() => {
        axios.get('http://localhost:50004/eventDetails').then((response => {
            console.log('events data', response.data.data)
            setEvents(response.data.data)
        }))
    }, [])

    const handleSubmit = ((e) => {
        e.preventDefault();
        console.log(searchHost, searchPostalCode, searchName)
        if (!searchHost && ! searchPostalCode) {
            // get search by Name
            axios.get(`http://localhost:50004/eventDetails/${encodeURIComponent(searchName)}`)
            .then((response) => {
                console.log("events filtered", response.data.data)
                setEvents(response.data.data)
                setSearchName('')
            })
            .catch((error) => {
                console.error("error getting filter", error)
                setErrMsg("Name didn't match an Event Name");
            })
        }

        else if (!searchPostalCode) {
            // get search by name and host
            axios.get(`http://localhost:50004/eventDetails/${encodeURIComponent(searchName)}/${encodeURIComponent(searchHost)}`)
            .then((response) => {
                console.log("events filtered", response.data.data)
                setEvents(response.data.data)
                setSearchName('')
                setSearchHost('')
            })
            .catch((error) => {
                setErrMsg("Name/Host didn't match an Event Name/Host");
                console.error("", error)
            })
        }

        else if (!searchHost) {
            // get search by name and postalCode
            axios.get(`http://localhost:50004/eventDetails/${encodeURIComponent(searchName)}/${searchPostalCode}`)
            .then((response) => {
                console.log("events filtered", response.data.data)
                setEvents(response.data.data)
                setSearchName('')
                setSearchPostalCode('')
            })
            .catch((error) => {
                console.error("error getting filter", error)
                setErrMsg("Name/Postal Code didn't match an Event Name/Postal Code");
            })
        }

        else if (searchHost && searchPostalCode) {
            // get search by all 3
            axios.get(`http://localhost:50004/eventDetails/${encodeURIComponent(searchName)}/${encodeURIComponent(searchHost)}/${searchPostalCode}`)
            .then((response) => {
                console.log("events filtered", response.data.data)
                setEvents(response.data.data)
                setSearchName('')
                setSearchPostalCode('')
                setSearchHost('')
            })
            .catch((error) => {
                console.error("error getting filter", error)
                setErrMsg("Name/Postal Code/Host didn't match an Event Name/Postal Code/Host");
            })
        }
    }) 

    const handleReset = ((e) =>{
        e.preventDefault();
        axios.get('http://localhost:50004/eventDetails').then((response => {
            console.log('events data', response.data.data)
            setEvents(response.data.data)
        }))
    })


    return (
        <>
         <TopNavBar/>        
        {events ? (<>

        <div className="flex h-screen">
        <div className="w-[350px] md:w-[400px] lg:w-[450px] overflow-y-auto border-r border-gray-200 p-4">
        <h1 className="font-bold text-xl py-2">All Events</h1>

        <p ref={errRef} className={errMsg ? "py-4 border w-[300px] border-gray-200 rounded-lg p-4 flex text-red-500" : "hidden"} aria-live='assertive'
        >{errMsg}</p>
        <form className="flex flex-col space-y-4 mb-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Search by name"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded"
                  required
                />

                <input
                  type="text"
                
                  placeholder="Search by host"
                  value={searchHost}
                  onChange={(e) => setSearchHost(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded"
                />

                <input
                  type="text"
                
                  placeholder="Search by postalCode"
                  value={searchPostalCode}
                  onChange={(e) => setSearchPostalCode(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded"
                />
                


                <button
                  type = 'submit'
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Filter by Rating
                </button>
                <button
                  onClick={handleReset}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Reset to normal
                </button>
              </form>
            {events.map((event) => (
                <div key = {uuidv4().replace(/-/g, '').slice(0, 10)}>
                    <NavLink
                    to = {`/events/${event.eventName}/${event.startTime}/${event.duration}`}>
                    <EventElement
                    event = {event}
                    />
                    </NavLink>
                </div>

            ))}

          </div>
          <div className="w-2/3 p-4 pt-16">
            <Outlet />
          </div>
          </div>

        <NavLink className="bg-gray-200 px-4 py-2 border border-black-300 rounded hover:shadow-lg transition-shadow absolute bottom-4 right-4" to="/">
            Return to Home
          </NavLink>
    </>
)
        :
        (<div> loading...</div>)
    }

    </>
    )
}

export default EventsPage