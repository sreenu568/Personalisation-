import React, { useState } from 'react';

const DomainDropdown = ({ domains, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('Select Domain');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (domain) => {
    setSelectedDomain(domain);
    setIsOpen(false);
    if (onSelect) onSelect(domain);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="relative inline-block text-left">
        {/* Dropdown Button */}
        <button
          onClick={toggleDropdown}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none"
        >
          <span className="text-lg font-medium">{selectedDomain}</span>
          <svg
            className="w-5 h-5 ml-2 -mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className="absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg"
          >
            {domains.map((domain, index) => (
              <a
                key={index}
                href="#"
                onClick={() => handleSelect(domain)}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                {domain}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DomainDropdown;
