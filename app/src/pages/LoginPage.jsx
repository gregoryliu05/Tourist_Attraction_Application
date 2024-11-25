import {useRef, useState, useEffect, useContext} from 'react';
import useAuth from '../hooks/useAuth';

import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';

const LOGIN_URL = 'http://localhost:50004/users/login' 

const LoginPage = () => {
    const {auth, setAuth} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user,pwd])

    useEffect(() => {
        console.log("Auth state updated:", auth);
    }, [auth]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            
            const response = await axios.post(LOGIN_URL, 
                {username: user,password: pwd},
                {headers: {'Content-Type': 'application/json'},
                withCredentials: true,
            }
            );
            console.log(response.data)
            const { userID, fullName, username, numReviews, email } = response.data.data;
            console.log(response.data.email);
            console.log("values that should be in auth", {userID, fullName, username, email});
            setAuth({ userID, fullName, username, email });
            console.log("values in auth", auth);
            setUser('')
            setPwd('')
            navigate(from, {replace: true});

        } catch (err) {
            if (!err?.response) {
                setErrMsg('no server response');
            } else if (err.response?.status === 400) {
                setErrMsg('missing username or password');
            } else if (err.response?.status == 500) {
                const serverMessage = err.response?.data?.message || 'Internal server error';
                setErrMsg(serverMessage);
            } else {
                setErrMsg('login failed')
            }
            errRef.current.focus();
        }
        
    }

    return (
       
       <section className = 'border border-gray-200 rounded-lg p-4 flex flex-col items-center '>
        <p ref = {errRef} className = {errMsg ? "py-4 border border-gray-200 rounded-lg p-4 flex text-red-500" : "hidden"} aria-live = 'assertive'
        >{errMsg}</p>
        <h1  className='text-lg font-bold py-4'> Sign In</h1>
        <form onSubmit = {handleSubmit} className='flex px-4 py-2 grid grid-cols-1 '>
            <label className = ' 'htmlFor = "username"> Username:</label>
            <input className = 'py-2 border border-gray-200 rounded-lg p-4 flex' type = "text" placeholder='enter username here'
            id = "username" 
            ref = {userRef}
            autoComplete='off'
            onChange = {(e) => setUser(e.target.value)}
            value = {user}
            required
            />
            <br/>
            <label htmlFor = "password" > Password:</label>
            <input className = 'py-2 border border-gray-200 rounded-lg p-4 flex' type = "password"  placeholder = 'enter password here'
            id = "password" 
            autoComplete='off'
            onChange = {(e) => setPwd(e.target.value)}
            value = {pwd}
            required
            />
            <br/>
            <button className = 'bg-gray-200 px-4 py-2 border border-black-300 rounded hover:shadow-lg transition-shadow' type = 'submit'
            > Sign In</button>
        </form>
        <p className='py-2'>
            Need an Account? <br/>
            <br/>
                <NavLink className = 'bg-gray-200 px-4 py-2 border border-black-300 rounded hover:shadow-lg transition-shadow' to = {'/signup'}> Click here to Signup
                </NavLink>

        </p>

       </section>
        )
}

export default LoginPage