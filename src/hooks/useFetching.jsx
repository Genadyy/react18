import {useState} from 'react';


export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const fetching = async () => {
        try{
            setIsLoading(true);
           // setTimeout(async () => {await callback()}, 4000);
            await callback();
        } catch(e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }
    return [fetching, isLoading, error];
}