import { Link, Outlet, NavLink} from "react-router-dom";
import { useState, useEffect, useRef} from "react";
import useAuth from '../hooks/useAuth';
import axios from "../api/axios";





const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const ProfilePage = () => {
    const userRef = useRef();
    const errRef = useRef();
    const {auth, setAuth} = useAuth();
    const [userInfo, setUserInfo] = useState(null)

    const [oldPassword, setOldPassword] = useState('')
    const [validOldPassword, setValidOldPassword] = useState(false);
    const [success, setSuccess] = useState(false);


    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    

    const [changePassword, setChangePassword] = useState(false);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd == matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus(); 
        }
    }, [])

    useEffect(() => {
        axios.get(
            `http://localhost:50004/users/${auth.userID}`
        ).then(
            response => {
                console.log(response.data)
                console.log("response data data:", response.data.data)
                const {userID, fullName, username, password, numReviews, email} = response.data.data;
                setUserInfo({userID, fullName, username, password, numReviews, email});
            }
        )


    }, [success])

    useEffect(() => {
        if (userInfo) {
            const password = userInfo.password
        const result = oldPassword === password
        setValidOldPassword(result)
        }
    }, [oldPassword])

    const handleClick = (e) => {
        e.preventDefault();
        setChangePassword(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`http://localhost:50004/users/${userInfo.userID}/update-password`, 
                {newPassword: pwd},
            {headers: {'Content-Type': 'application/json'},
            withCredentials: true,
        }
        );

        setPwd('')
        setOldPassword('')
        setMatchPwd('')
        setSuccess(true);


        } catch (err) {
            const serverMessage = err.response?.data?.message || 'failed to update password';
            setErrMsg(serverMessage);
            errRef.current.focus();

        }

    }
    
    return (
        <>
        {userInfo ?(
        <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center">
            <p className=" text-xl text-bold text-center"> Your Profile</p>
            <div className=" flex-row p-4 gap-4 text-center">
                <p className="flex "> UserID:  {userInfo.userID}</p>
                <p className=" flex"> Full Name: {userInfo.fullName}</p>
                <p className=" flex"> Username: {userInfo.username}</p>
                <p className=" flex"> Number of Reviews: {userInfo.numReviews}</p>
                <p className=" flex"> Email: {userInfo.email}</p>
                <button 
                className="bg-gray-200 px-4 py-2 border border-black-300 rounded hover:shadow-lg transition-shadow"
                onClick = {handleClick}
                >Change Password?</button>
            </div>
            <br/>
            { changePassword ? 
            (<>
            {success?
            (<div>
                <p className="text-xl text-bold text-center"> Success!</p>
            </div>
            )
            :
            (<>
            <p ref={errRef} className={errMsg ? "py-4 border  border-gray-200 rounded-lg p-4 flex text-red-500" : "hidden"} aria-live='assertive'
            >{errMsg}</p>
            <form className="flex px-4 py-2 grid grid-cols-1" onSubmit={handleSubmit}>
                <label htmlFor="oldpassword"> Enter old password:
                <span className= {!oldPassword ? "hidden": " "}>{validOldPassword? " ✅": " ❌"}</span>
                     </label>
                <input
                className='py-2 border border-gray-200 rounded-lg p-4 flex'  
                type = "password"
                id="oldpassword"
                placeholder="enter old password here"
                onChange={(e) => {
                    setOldPassword(e.target.value);
                }}
                required
                />
                <label className='' htmlFor="pwd"> Enter New Password:
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

                <label className='' htmlFor="cpassword"> Confirm New Password:
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

                <button type='submit' className="bg-gray-200 px-4 py-2 border border-black-300 rounded hover:shadow-lg transition-shadow"
                disabled = {!validPwd || !validMatch || !validOldPassword ? true: false}> 
                Confirm Change Password </button>
            </form>
             </>
            )} 
            </>
            )
            : 
            (<br/>)
            
            }      

            <div className ='flex flex-col gap-2 '>
            <NavLink className = "bg-gray-200 px-4 py-2 border border-black-300 rounded hover:shadow-lg transition-shadow "to = '/'> Return to Homepage</NavLink>
            </div>
        </div>
        )
        :
        (<div> loading....</div>)
    }
        </>
    )
}


export default ProfilePage;