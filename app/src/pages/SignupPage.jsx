import { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import axios from "../api/axios";

const NAME_REGEX = /^[A-Z][a-zA-Z'’\-]+(?: [a-z]*[A-Z][a-zA-Z'’\-]+)*$/;
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const SIGNUP_URL = 'http://localhost:50004/users/insert-users' 


const SignupPage = () => {
    const userRef = useRef();
    const errRef = useRef();


    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [user, setUser] = useState('');
    const [validUser, setValidUser] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])


    useEffect(() => {
        const result = NAME_REGEX.test(name);
        console.log(result)
        console.log(name);
        setValidName(result);
        console.log({ nameFocus, name, validName });
    }, [name])


    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidUser(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd == matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(email);
        console.log(result);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd, email])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);

        if (!v1 || !v2) {
            setErrMsg("invalid entry");
            return;
        }

        try {console.log("Payload being sent:", {
            userID: uuidv4().replace(/-/g, '').slice(0, 10),
            fullName: name,
            username: user,
            password: pwd,
            email: email,
        });
            const response = await axios.post(SIGNUP_URL, 
                JSON.stringify({
                    userID:  uuidv4().replace(/-/g, '').slice(0, 10),
                    fullName: name,
                    username: user,
                    password: pwd,
                    email: email
                }), 
                {headers: {'Content-Type': 'application/json'},
                withCredentials: true,
            }
            );
            console.log("Axios response:", response); 
            //console.log(JSON.stringify(response?.data)); 
            console.log("worked????"); // Debug log
            setName('')
            setUser('')
            setPwd('')
            setMatchPwd('')
            setEmail('')
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
    }


    return (
        <>
        {success? (
            
            <section className='border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center'>
            <h1 className='py-4'> You Are now Signed Up!</h1> 
            <br/>
            <NavLink className = 'bg-gray-200 px-4 py-2 border border-black-300 rounded hover:shadow-lg transition-shadow' to = {'/login'}> Click here to Log In</NavLink>
        </section>
        ) 
        :


        (<section className='border border-gray-200 rounded-lg p-4 flex flex-col items-center'>
            <p ref={errRef} className={errMsg ? "py-4 border  border-gray-200 rounded-lg p-4 flex text-red-500" : "hidden"} aria-live='assertive'
            >{errMsg}</p>
            <h1 className='text-lg font-bold py-4'> Sign Up</h1>
            <form className='flex px-4 py-2 grid grid-cols-1 ' onSubmit={handleSubmit}>
                
                <label htmlFor='fullname'> Full Name:
                    <span className={ !name ? "hidden": " "}>{validName ? " ✅": " ❌"}</span>
                </label>
                <input
                    className='py-2 border border-gray-200 rounded-lg p-4 flex'
                    type="text" 
                    placeholder='enter fullname here'
                    id="fullname"
                    onChange={(e) => {setName(e.target.value);}}
                    value={name}
                    required
                    autoComplete="off"
                    aria-invalid = {validName ? 'false' : 'true'}
                    aria-describedby = 'namenote'
                    onFocus = {() => setNameFocus(true)}
                    onBlur = {() => setNameFocus(false)}

                />
                <p id = 'namenote' className= {nameFocus && name && !validName ? "py-4 border bg-gray-200 border-gray-200 rounded-lg p-4 flex text-black-500" : "hidden"} >
                    First and Last name must be capitalized. <br/>
                    No numeric characters or symbols.
                </p>
                <br />

                <label htmlFor="username"> Username:
                <span className={ !user ? "hidden": " "}>{validUser  ? " ✅": " ❌"}</span>
                </label>
                <input 
                    className='py-2 border border-gray-200 rounded-lg p-4 flex' 
                    type="text" 
                    ref = {userRef}
                    placeholder='enter username here'
                    id="username"
                    onChange={(e) => {
                        setUser(e.target.value);
                    }}
                    value={user}
                    required
                    autoComplete="off"
                    aria-invalid = {validUser ? 'false' : 'true'}
                    aria-describedby = 'uidnote'
                    onFocus = {() => setUserFocus(true)}
                    onBlur = {() => setUserFocus(false)}
                />
                <p id = 'uidnote' className= {
                    userFocus && user && !validUser ? "py-4 border border-gray-200  bg-gray-200 rounded-lg p-4 flex text-black-500" : "hidden"} >
                    4 to 24 characters. <br/>
                    Must begin with a letter. <br/>
                    Letters, numbers, underscores, hyphens allowed.
                </p>

                <br />

                <label className='' htmlFor="pwd"> Password:
                    <span className= {!pwd ? "hidden": " "}>{validPwd? " ✅": " ❌"}</span>
                </label>
                <input 
                    className='py-2 border border-gray-200 rounded-lg p-4 flex'  
                    type = "password"
                    id="pwd"
                    onChange={(e) => {
                        setPwd(e.target.value);
                    }}
                    value={pwd}
                    required
                    aria-invalid = {validPwd ? 'false' : 'true'}
                    aria-describedby = 'pwdnote'
                    placeholder='enter password here'
                    onFocus = {() => setPwdFocus(true)}
                    onBlur = {() => setPwdFocus(false)}

                />
                <p id = 'pwdnote' className= {
                    pwdFocus && pwd && !validPwd ? "py-4 border border-gray-200  bg-gray-200 rounded-lg p-4 flex text-black-500" : "hidden"} >
                    8 to 24 characters. <br/>
                    Must include upper & lowercase letters, a number and a special character <br/>
                    Allowed special characters: ! @ # $ %
                </p>

                <br />

                <label className='' htmlFor="cpassword"> Confirm Password:
                <span className= {!matchPwd ? "hidden": " "}>{validMatch? " ✅": " ❌"}</span>
                </label>
                <input 
                    className='py-2 border border-gray-200 rounded-lg p-4 flex' 
                    type="password" 
                    placeholder='retype password here'
                    id="cpassword"
                    onChange={(e) => {
                        setMatchPwd(e.target.value);
                    }}
                    value={matchPwd}
                    required
                    aria-invalid = {validMatch ? 'false' : 'true'}
                    aria-describedby = 'matchnote'
                    onFocus = {() => setMatchFocus(true)}
                    onBlur = {() => setMatchFocus(false)}
                />
                <p id = 'match' className= {
                    matchFocus && match && !validMatch ? "py-4 border border-gray-200  bg-gray-200 rounded-lg p-4 flex text-black-500" : "hidden"} >
                    Must match password above.
                </p>

                <br />

                <label className='' htmlFor="email"> E-Mail Address:
                <span className= {!email ? "hidden": " "}>{validEmail? " ✅": " ❌"}</span>
                </label>
                <input 
                    className="py-2 border border-gray-200 rounded-lg p-4 flex" 
                    type="text" 
                    placeholder='enter email here'
                    id="email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    value={email}
                    required
                    aria-invalid = {validEmail ? 'false' : 'true'}
                    aria-describedby = 'emailnote'
                    onFocus = {() => setEmailFocus(true)}
                    onBlur = {() => setEmailFocus(false)}
                />
                 <p id = 'emailnote' className= {
                    emailFocus && email && !validEmail ? "py-4 border border-gray-200  bg-gray-200 rounded-lg p-4 flex text-black-500" : "hidden"} >
                    Must be a valid email address.
                </p>
                <br />

                <button type='submit' className="bg-gray-200 px-4 py-2 border border-black-300 rounded hover:shadow-lg transition-shadow"
                disabled = {!validName || !validUser || !validMatch || !validEmail ? true: false}> 
                Sign Up </button>
            </form>

            <p className='py-2'>
                Already Registered? <br />
                <br />
                <NavLink className='bg-gray-200 px-4 py-2 border border-black-300 rounded hover:shadow-lg transition-shadow' to={'/login'}> Click here to Sign In
                </NavLink>

            </p>

        </section>
    )
}
</>
    )
}

export default SignupPage;