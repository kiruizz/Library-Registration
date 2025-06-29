import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, ArrowLeftIcon, ClockIcon, CalendarIcon } from 'lucide-react';
const Register = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [formData, setFormData] = useState({
    registrationNumber: '',
    name: '',
    course: '',
    location: '',
    purpose: '',
    timeIn: '',
    date: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    // Format current time for the form
    const formattedTime = currentTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    // Format current date for the form
    const formattedDate = currentTime.toISOString().split('T')[0];
    setFormData(prev => ({
      ...prev,
      timeIn: formattedTime,
      date: formattedDate
    }));
    return () => clearInterval(timer);
  }, [currentTime]);
  const validateForm = () => {
    const newErrors = {};
    if (!formData.registrationNumber) newErrors.registrationNumber = 'Registration number is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.course) newErrors.course = 'Course is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.purpose) newErrors.purpose = 'Purpose of visit is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
      // Save registration data to localStorage
      const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
      registrations.push({
        ...formData,
        id: Date.now().toString(),
        timeOut: null
      });
      localStorage.setItem('registrations', JSON.stringify(registrations));
      console.log('Form submitted:', formData);
      setSubmitted(true);
    }
  };
  if (submitted) {
    return <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center p-6">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 mt-12">
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-4">
              Registration Complete
            </h2>
            <p className="text-gray-600 mt-2">
              Thank you for registering your visit to the library.
            </p>
            <Link to="/" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors">
              Return to Home
            </Link>
          </div>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center p-6">
      <div className="max-w-3xl w-full">
        <div className="flex justify-between items-center mb-6">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeftIcon size={20} />
            <span className="ml-2">Back to Home</span>
          </Link>
          <div className="flex items-center">
            <BookOpenIcon size={24} className="text-blue-600" />
            <span className="ml-2 font-semibold text-xl text-blue-900">
              Library Registration
            </span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Register Your Visit
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Registration Number*
                </label>
                <input type="text" id="registrationNumber" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.registrationNumber ? 'border-red-500' : 'border-gray-300'}`} />
                {errors.registrationNumber && <p className="text-red-500 text-sm mt-1">
                    {errors.registrationNumber}
                  </p>}
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name*
                </label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`} />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                  Course*
                </label>
                <input type="text" id="course" name="course" value={formData.course} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.course ? 'border-red-500' : 'border-gray-300'}`} />
                {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  From (Location)*
                </label>
                <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.location ? 'border-red-500' : 'border-gray-300'}`} />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>
              <div>
                <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">
                  Purpose of Visit*
                </label>
                <select id="purpose" name="purpose" value={formData.purpose} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.purpose ? 'border-red-500' : 'border-gray-300'}`}>
                  <option value="">Select a purpose</option>
                  <option value="study">Study</option>
                  <option value="research">Research</option>
                  <option value="borrowing">Borrowing Books</option>
                  <option value="returning">Returning Books</option>
                  <option value="other">Other</option>
                </select>
                {errors.purpose && <p className="text-red-500 text-sm mt-1">{errors.purpose}</p>}
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <div className="relative">
                  <input type="date" id="date" name="date" value={formData.date} readOnly className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100" />
                  <CalendarIcon size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <p className="text-gray-500 text-xs mt-1">
                  Automatically filled with current date
                </p>
              </div>
              <div>
                <label htmlFor="timeIn" className="block text-sm font-medium text-gray-700 mb-1">
                  Time In
                </label>
                <div className="relative">
                  <input type="text" id="timeIn" name="timeIn" value={formData.timeIn} readOnly className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100" />
                  <ClockIcon size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <p className="text-gray-500 text-xs mt-1">
                  Automatically filled with current time
                </p>
              </div>
            </div>
            <div className="mt-8">
              <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Submit Registration
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default Register;