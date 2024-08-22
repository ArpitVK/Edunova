import React from 'react';
import Image from 'next/image';
import { FiX } from 'react-icons/fi';

type User = {
  image: string;
  name: string;
  username: string;
  role: string;
  gender: string;
  email: string;
  // Add any other fields your user object may have
};

type UserDetails = {
  user: User;
  onClose: () => void;
};

const UserDetails: React.FC<UserDetails> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="bg-slate-700 text-white p-6 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center">
            <Image src={user.image} alt={user.name} width={64} height={64} className="rounded-full mr-4" />
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p>{user.username} | {user.role}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <FiX size={24} />
          </button>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Date of Birth</p>
              <p>29-04-2005</p>
            </div>
            <div>
              <p className="text-gray-600">Gender</p>
              <p>{user.gender}</p>
            </div>
            <div>
              <p className="text-gray-600">Nationality</p>
              <p>Canadian</p>
            </div>
            <div>
              <p className="text-gray-600">Contact no.</p>
              <p>1234567890</p>
            </div>
            <div>
              <p className="text-gray-600">E-mail Address</p>
              <p>{user.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Work email Address</p>
              <p>{user.email}</p>
            </div>
          </div>
          <h3 className="text-lg font-semibold mt-6 mb-4">Research & Publication</h3>
          <div>
            <h4 className="font-medium">AI and User Experience: The Future of Design</h4>
            <p className="text-sm text-gray-600">Published in the Journal of Modern Design • 2022</p>
            <p className="text-sm mt-2">
              AI, IoT based real time condition monitoring of Electrical Machines using Python 
              language Abstract: Maintaining induction motors in good working order before they 
              fail benefits small... <span className="text-blue-600 cursor-pointer">See More...</span>
            </p>
            <button className="mt-4 text-red-500 font-medium">SEE PUBLICATION</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;