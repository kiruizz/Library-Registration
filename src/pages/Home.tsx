import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon } from 'lucide-react';
import TimeOutModal from '../components/TimeOutModal';
const Home = () => {
  const [isTimeOutModalOpen, setTimeOutModalOpen] = useState(false);
  const [timeOutSuccess, setTimeOutSuccess] = useState(false);
  interface TimeOutData {
    // Add properties as needed, e.g.:
    // name: string;
    // time: string;
    [key: string]: any;
  }
  const [timeOutData, setTimeOutData] = useState<TimeOutData | null>(null);

  const handleTimeOutSubmit = (data: TimeOutData): void => {
    console.log('Time out submitted:', data);
    setTimeOutData(data);
    setTimeOutModalOpen(false);
    setTimeOutSuccess(true);
  };
  return <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center p-6">
      <div className="max-w-3xl w-full text-center mt-12 md:mt-24">
        <div className="flex justify-center">
            <img
            src="./src/images/lib_logo3.jpeg"
            alt="Library Logo"
            className="h-16 w-16 rounded-full bg-blue-600 p-2 object-contain"
            />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mt-6 text-blue-900">
          Welcome to the Library
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-xl mx-auto">
          Your gateway to knowledge and discovery. Please register your visit to
          access our resources and services.
        </p>
        <div className="mt-8 space-y-8">
          <Link to="/register" className="inline-block w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Register Your Visit
          </Link>
          <button onClick={() => setTimeOutModalOpen(true)} className="inline-block w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 hover:scale-105 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            Register Your Time Out
          </button>
        </div>
      </div>
      {timeOutSuccess && <div className="mt-8 p-4 bg-green-100 border border-green-200 rounded-lg max-w-md w-full">
          <div className="flex items-center">
            <div className="bg-green-200 rounded-full p-2 mr-3">
              <svg className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-green-800">
                Time Out Registered Successfully
              </h3>
              <p className="text-sm text-green-700">
                Thank you for visiting the library!
              </p>
            </div>
          </div>
          <button onClick={() => setTimeOutSuccess(false)} className="mt-3 text-sm text-green-800 hover:underline focus:outline-none">
            Dismiss
          </button>
        </div>}
      <TimeOutModal isOpen={isTimeOutModalOpen} onClose={() => setTimeOutModalOpen(false)} onSubmit={handleTimeOutSubmit} />
    </div>;
};
export default Home;