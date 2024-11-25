import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { use } from "../../../appControllers/userController";

const useAuth =() => {
    return useContext(AuthContext);
}

export default useAuth;