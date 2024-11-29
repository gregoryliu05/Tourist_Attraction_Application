import { useContext } from "react";
import UpdateContext from "../context/UpdateProvider";

const useUpdate = () => {
    return useContext(UpdateContext);
}

export default useUpdate