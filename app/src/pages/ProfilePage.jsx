import { Link, Outlet, NavLink} from "react-router-dom";


const ProfilePage = () => {
    const profiles = [1,2,3,4,5]; 
    return (
        <div className="flex gap-2">
            <div className= " flex flex-col gap-2">
            <p> PROFILE PAGE</p>
            {profiles.map((profile) => (
                <NavLink key = {profile} 
                to = {`/profile/${profile}`}
                className={({isActive}) => {
                    return isActive ? 'text-primary-700' : '';
                }}> 
                profile {profile} 
                </NavLink>
            ))}
            </div>
            <Outlet/>
        </div>
    )
}


export default ProfilePage;