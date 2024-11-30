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
    const [searchName, setSearchName] = useState('')

    const [searchHost, setSearchHost] = useState('')

    const [searchPostalCode, setSearchPostalCode] = useState('')


    useEffect(() => {
        axios.get('http://localhost:50004/eventDetails').then((response => {
            console.log('events data', response.data.data)
            setEvents(response.data.data)
        }))
    }, [])

    const handleSubmit = ((e) => {
        e.preventDefault();
        if (!searchHost && ! searchPostalCode) {
            // get search by Name
            axios.get()
        }

        else if (!searchHost) {
            // get search by name and host
        }

        else if (!searchPostalCode) {
            // get search by name and time
        }

        else if (searchHost && searchPostalCode) {
            // get search by all 3
            axios.get(`http://localhost:50004/${searchName}/${searchHost}/${searchPostalCode}`)
            .then((response) => {
                console.log("events filtered", response.data.data)
                setEvents(response.data.data)
            })
            .catch((error) => {
                console.error("error getting filter", error)
            })
        }
    }) 



    return (
        <>
        
        {events ? (<>

        <TopNavBar/>

        <form className="flex space-x-2 items-center" onSubmit={handleSubmit}>
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

        <div className="w-2/3 p-4 pt-16">
            <Outlet />
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