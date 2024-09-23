// app/components/Message.tsx

import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

interface MessageProps {
  type: 'success' | 'error';  // Defines whether the message is success or error
  message: string;  // The message to display
  show: boolean;    // Whether the message is currently visible
  onClose: () => void;  // Function to close the message
}

export default function Message({ type, message, show, onClose }: MessageProps) {
  useEffect(() => {
    if (show) {
      // Auto-dismiss the message after 4 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);  // Clean up the timer on unmount
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 p-4 rounded shadow-lg z-50 transition-opacity duration-500 ease-in-out
        ${show ? 'opacity-100' : 'opacity-0'}
        ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
      >
      <div className="flex items-center">
        <FontAwesomeIcon
          icon={type === 'success' ? faCheckCircle : faExclamationCircle}
          className="mr-2"
        />
        <span >{message}</span>
        <button className="ml-auto text-white" onClick={onClose}>&nbsp;&nbsp;&nbsp;✖</button>
      </div>
    </div>
  );
}
