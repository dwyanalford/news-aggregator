// app/components/Loading.tsx

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';

interface LoadingProps {
    isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
    const [timedOut, setTimedOut] = useState(false);

    useEffect(() => {
        let timer: number | undefined;

        if (isLoading) {
            timer = window.setTimeout(() => {
                setTimedOut(true);
            }, 3000); 
        }

        return () => clearTimeout(timer); // Cleanup the timer if loading completes
    }, [isLoading]);

    if (timedOut) {
        return (
            <div className="flex flex-col justify-center items-center h-screen space-y-4">
                <div className="flex flex-col items-center bg-red-100 p-6 rounded-lg shadow-lg">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-600 text-4xl mb-4" />
                    <p className="text-2xl font-bold text-red-800 text-center mb-2">
                        Oops! Something Went Wrong
                    </p>
                    <p className="text-lg font-medium text-red-600 text-center">
                        Unable to Load Articles. <br /> Please try again later.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen space-y-4">
            <p className="text-2xl font-semibold text-gray-700 animate-pulse">Loading...</p>
            <div className="w-24 h-24 border-8 border-t-8 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
        </div>
    );
};

export default Loading;



