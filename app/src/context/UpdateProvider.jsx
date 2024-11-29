import { createContext, useState, useEffect } from "react";

const UpdateContext = createContext('')

export const UpdateProvider = ({ children }) => {
    const [update, setUpdate] = useState(() => {
        const savedUpdate = localStorage.getItem('update');
        return savedUpdate ? JSON.parse(savedUpdate) : '';
    });

    useEffect(() => {
        console.log('updated', update);
        localStorage.setItem('update', JSON.stringify(update));

    }, [update])


    return (
        <UpdateContext.Provider value = {{update, setUpdate}}>
            {children}
        </UpdateContext.Provider>
    )
}

export default UpdateContext;