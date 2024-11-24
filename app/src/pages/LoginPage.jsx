import {useRef, useState, useEffect, useContext} from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';

const LOGIN_URL = 'http://localhost:50004/users/login' 

const LoginPage = () => {
    const {setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user,pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({username: user,password: pwd}),
                {headers: {'Content-Type': 'application/json'},
                withCredentials: true,
            }
            );
            console.log(JSON.stringify(response?.data));
            setAuth({user, pwd});
            setUser('')
            setPwd('')
            setSuccess(true)

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
        <> { success ? (
            <section>
                <h1> You Are logged In!</h1> 
                <br/>
                <NavLink className = 'bg-gray-200 px-4 py-2 border border-black-300 rounded hover:shadow-lg transition-shadow' to = {'/'}> Click here to return home</NavLink>
            </section>
        ): (
       <section className = 'border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center'>
        <p ref = {errRef} className = {errMsg ? "py-4 border border-gray-200 rounded-lg p-4 flex text-red-500" : "hidden"} aria-live = 'assertive'
        >{errMsg}</p>
        <h1  className='text-lg font-bold py-4'> Sign In</h1>
        <form onSubmit = {handleSubmit} className='flex px-4 py-2 grid grid-cols-1 '>
            <label className = 'py-4  'htmlFor = "username"> Username:</label>
            <input className = 'py-4 border border-gray-200 rounded-lg p-4 flex' type = "text" placeholder='enter username here'
            id = "username" 
            ref = {userRef}
            autoComplete='off'
            onChange = {(e) => setUser(e.target.value)}
            value = {user}
            required
            />
            <label htmlFor = "password" > Password:</label>
            <input className = 'py-4 border border-gray-200 rounded-lg p-4 flex' type = "password"  placeholder = 'enter password here'
            id = "password" 
            autoComplete='off'
            onChange = {(e) => setPwd(e.target.value)}
            value = {pwd}
            required
            />
            <button className = 'py-2'type = 'submit'> Sign In</button>
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
       </>
    )
}

export default LoginPage