import React, { useEffect, useState } from 'react';
import { ClockIcon, CalendarIcon, XIcon } from 'lucide-react';
interface TimeOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}
const TimeOutModal = ({
  isOpen,
  onClose,
  onSubmit
}: TimeOutModalProps) => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [registrations, setRegistrations] = useState([]);
  const [timeOut, setTimeOut] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    if (isOpen) {
      // Get current time and date
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      const formattedDate = now.toISOString().split('T')[0];
      setTimeOut(formattedTime);
      setDate(formattedDate);
      // Load registrations from localStorage
      const savedRegistrations = JSON.parse(localStorage.getItem('registrations') || '[]');
      // Filter only registrations with no timeOut value
      const activeRegistrations = savedRegistrations.filter(reg => reg.timeOut === null);
      setRegistrations(activeRegistrations);
    }
  }, [isOpen]);
  const handleSubmit = e => {
    e.preventDefault();
    if (!registrationNumber) {
      setError('Please select a registration number');
      return;
    }
    // Find the selected registration
    const allRegistrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    const updatedRegistrations = allRegistrations.map(reg => {
      if (reg.registrationNumber === registrationNumber && reg.timeOut === null) {
        return {
          ...reg,
          timeOut,
          timeOutDate: date
        };
      }
      return reg;
    });
    // Save updated registrations
    localStorage.setItem('registrations', JSON.stringify(updatedRegistrations));
    onSubmit({
      registrationNumber,
      timeOut,
      date
    });
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <XIcon size={20} />
        </button>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Register Time Out
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Registration Number*
              </label>
              <select id="registrationNumber" value={registrationNumber} onChange={e => {
              setRegistrationNumber(e.target.value);
              setError('');
            }} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`}>
                <option value="">Select your registration number</option>
                {registrations.map((reg, index) => <option key={index} value={reg.registrationNumber}>
                    {reg.registrationNumber} - {reg.name}
                  </option>)}
              </select>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <div className="relative">
                  <input type="date" id="date" value={date} readOnly className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100" />
                  <CalendarIcon size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div>
                <label htmlFor="timeOut" className="block text-sm font-medium text-gray-700 mb-1">
                  Time Out
                </label>
                <div className="relative">
                  <input type="text" id="timeOut" value={timeOut} readOnly className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100" />
                  <ClockIcon size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
            <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Submit Time Out
            </button>
          </form>
        </div>
      </div>
    </div>;
};
export default TimeOutModal;