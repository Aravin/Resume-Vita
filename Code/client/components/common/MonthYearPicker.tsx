"use client";

import React, { useState, useRef, useEffect } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface MonthYearPickerProps {
  register: UseFormRegisterReturn;
  defaultValue?: string;
  className?: string;
  hasError?: boolean;
  placeholder?: string;
}

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
  register,
  defaultValue,
  className = "",
  hasError = false,
  placeholder = "Select month and year"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [displayValue, setDisplayValue] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  // Parse default value and set initial state
  useEffect(() => {
    if (defaultValue && defaultValue !== '') {
      const [year, month] = defaultValue.split('-');
      if (year && month) {
        setSelectedYear(parseInt(year));
        setSelectedMonth(parseInt(month) - 1);
        setDisplayValue(`${months[parseInt(month) - 1]} ${year}`);
      }
    }
    // Don't set any default values - let the field start empty
  }, [defaultValue]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMonthSelect = (monthIndex: number) => {
    setSelectedMonth(monthIndex);
    updateValue(monthIndex, selectedYear);
  };

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    updateValue(selectedMonth, year);
  };

  const updateValue = (month: number | null, year: number | null) => {
    if (month !== null && year !== null) {
      const monthStr = String(month + 1).padStart(2, '0');
      const yearStr = String(year);
      const value = `${yearStr}-${monthStr}`;
      
      setDisplayValue(`${months[month]} ${year}`);
      
      // Update the hidden input value
      if (inputRef.current) {
        inputRef.current.value = value;
        // Trigger change event for react-hook-form
        const event = new Event('input', { bubbles: true });
        inputRef.current.dispatchEvent(event);
      }
      
      setIsOpen(false);
    }
  };

  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };

  const handleInputFocus = () => {
    // Add focus styling when clicked
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Hidden input for react-hook-form */}
      <input
        {...register}
        ref={inputRef}
        type="hidden"
        defaultValue={defaultValue}
      />
      
      {/* Display input with calendar icon and dropdown arrow */}
      <div className="relative">
        <input
          type="text"
          readOnly
          value={displayValue}
          onClick={handleInputClick}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className={`input input-bordered font-medium cursor-pointer pl-10 pr-10 bg-white hover:bg-gray-50 focus:bg-white transition-all duration-200 ${
            hasError 
              ? 'input-error border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
              : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
          } ${!displayValue ? 'text-gray-400' : 'text-gray-900'} ${isOpen ? 'ring-2 ring-blue-200 border-blue-500' : ''} ${className}`}
        />
        {/* Calendar icon */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        {/* Dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-xl z-50 max-h-80 overflow-hidden animate-in slide-in-from-top-2 duration-200">
          <div className="flex">
            {/* Month selection */}
            <div className="flex-1 border-r border-gray-200">
              <div className="p-3 bg-gray-50 border-b border-gray-200">
                <h4 className="text-sm font-semibold text-gray-800">Month</h4>
              </div>
              <div className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {months.map((month, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleMonthSelect(index)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-blue-50 ${
                      selectedMonth === index 
                        ? 'bg-blue-100 text-blue-800 font-medium border-r-2 border-blue-500' 
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Year selection */}
            <div className="flex-1">
              <div className="p-3 bg-gray-50 border-b border-gray-200">
                <h4 className="text-sm font-semibold text-gray-800">Year</h4>
              </div>
              <div className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {years.map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => handleYearSelect(year)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-blue-50 ${
                      selectedYear === year 
                        ? 'bg-blue-100 text-blue-800 font-medium border-r-2 border-blue-500' 
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthYearPicker;
