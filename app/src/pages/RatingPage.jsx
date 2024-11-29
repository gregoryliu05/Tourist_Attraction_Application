import {useRef, useState, useEffect, useContext, } from 'react';
import { NavLink, Link, useNavigate, useLocation ,useParams, Outlet } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import useUpdate from '../hooks/useUpdate';

const SCORE_REGEX = /^(5(\.0{1,2})?|[0-4](\.\d{1,2})?|0)$/;
const RATING_URL = 'http://localhost:50004/ratings/insert-rating'
const COMMENT_URL = 'http://localhost:50004/userComments/add-userComments'

const RatingPage = () => {
    const {auth, setAuth} = useAuth();
    const {update, setUpdate} = useUpdate();
    const params = useParams();

    const ratingRef = useRef();
    const errRef = useRef();

    const [success, setSuccess] = useState(false)
    const [locationDetails, setLocationDetails] = useState(null)

    const [errMsg, setErrMsg] = useState('')
    // rating ID generate
    // score input
    const [score, setScore] = useState('')
    const [validScore, setValidScore] = useState(false)
    const [scoreFocus, setScoreFocus] = useState(false)
    // userID generate
    // postalCode from params
    // address from params

    // text for user comments ... 
    const [text, setText] = useState('')
    const [validText, setValidText] = useState(false)
    const [textFocus, setTextFocus] = useState(false)


    useEffect(() => {
        const result = SCORE_REGEX.test(score)
        setValidScore(result)
    }, [score])

    useEffect(() => {
        if (text.length > 0 && text.length < 200) {
            setValidText(true)
        } else {
            setValidText(false)
        }
    }, [text])

    useEffect(() => {
        setErrMsg('')
    }, [score ])    

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
            const ratingID = uuidv4().replace(/-/g, '').slice(0,10)
            const response = await axios.post(RATING_URL,
                JSON.stringify({
                    ratingID: ratingID,
                    score,
                    userID: auth.userID,
                    postalCode: locationDetails.postalCode,
                    address: locationDetails.address
                }),
                {headers: {'Content-Type': 'application/json'},
                withCredentials:true,
            }
            );
            if (text) {
                try {
                    const resp = await axios.post(COMMENT_URL,
                        JSON.stringify({
                            ratingID: ratingID,
                            text
                        }), 
                        {headers: {'Content-Type': 'application/json'},
                        withCredentials:true,}
                    )
                    console.log('text added', resp)

                    setText('')
                } catch (error) {
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
                    console.log('error with text', response)
                }
            }
            console.log('axios response', response)
            setScore('')
            setSuccess(true)
            setUpdate(uuidv4().replace(/-/g, '').slice(0,10))
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
            <h1 className='py-4'> Review Added!</h1> 
            <br/>
            <NavLink className = 'bg-gray-200 px-4 py-2 border border-black-300 rounded hover:shadow-lg transition-shadow' to = {'/profile'}> Click here to View Your Reviews</NavLink>
        </section>
        ) 
        : 

        (
        <section className='w-[400px] md:w-[500px] lg:w-[600px] h-auto border border-gray-200 bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center'> 
        <p ref={errRef} className={errMsg ? "py-4 border  border-gray-200 rounded-lg p-4 flex text-red-500" : "hidden"} aria-live='assertive'
        >{errMsg}</p>
            <h1 className='font-bold text-xl'>Make a Review</h1>
            <form className='' onSubmit = {handleSubmit}>
            
            <label className=' block text-left' htmlFor='score'>
                Score:
                <span className={ !score ? "hidden": " "}>{validScore ? " ✅": " ❌"}</span>
            </label>
            <input
            className='py-2 border border-gray-200  w-full rounded-lg p-4 flex'
            type = 'text'
            id = 'score'
            onChange={(e) => {setScore(e.target.value)}}
            value = {score}
            required
            aria-invalid = {validScore ? 'false' : 'true'}
            aria-describedby= 'scorenote'
            onFocus={() => setScoreFocus(true)}
            onBlur={() => setScoreFocus(false)}
            placeholder='ex: 0.0, 2.5, 4.99'
            ref = {ratingRef}
            maxLength= '5'
            />
            <p id = "scorenote" 
            className= {score && score && !validScore ? "py-4 border bg-gray-200 border-gray-200 rounded-lg p-4 flex text-black-500" : "hidden"}
            >
               2 digit decimal num from 0 to 5 inclusive, e.g. 0.0, 2.5, 4.99
            </p>
            
            <label className='text-left block' htmlFor='text'>
                Comment:
                <span className={ !text ? "hidden": " "}>{validText ? " ✅": " ❌"}</span>
            </label>
            <textarea
            className="w-full h-40 border border-gray-200 rounded-lg p-4 resize-none"
            id="text"
            onChange={(e) => {setText(e.target.value)}}
            value={text}
            aria-invalid={validText ? 'false' : 'true'}
            aria-describedby="textnote"
            onFocus={() => setTextFocus(true)}
            onBlur={() => setTextFocus(false)}
            placeholder="Start comment here..."
            maxLength="200"
            required
        />

            <p id = "textnote" 
            className= {textFocus && text && !validText ? "py-4 border bg-gray-200 border-gray-200 rounded-lg p-4 flex text-black-500" : "hidden"}
            >
               max 200 chars.
            </p>


        
            <button className='px-4 py-2 text-sm rounded border border-gray-200 bg-blue-500 hover:shadow-lg hover:bg-blue-600 transition-shadow text-white'
            type='submit'
            disabled = {!validScore || !validText ? true: false}
            > 
                Submit
            </button>
            </form>
            </section> 
        )}
        </>
        
    )
}


export default RatingPage;