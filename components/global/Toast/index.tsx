import { faChevronLeft, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';

interface ToastProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const Toast: FC<ToastProps> = ({ isOpen, message, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-slate-100 opacity-20"></div>
      <div className="relative bg-white p-6 rounded shadow-lg max-w-sm mx-auto z-50">
        <button onClick={onClose} className="absolute right-0 top-0 m-2 text-gray-500 hover:text-gray-700">
          <FontAwesomeIcon icon={faWindowClose} /> {/* Window Close Icon*/}
         
        </button>
        <div className='p-5'>{message}</div>
      </div>
    </div>
  );
}


export default React.memo(Toast); 
