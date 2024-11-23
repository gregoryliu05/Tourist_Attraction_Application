import { useParams } from "react-router-dom"

const ProfileP = () => {
    const params = useParams();
    console.log(params);

    return (
        <div>profile lol {params.id}</div>
    )
}

export default ProfileP