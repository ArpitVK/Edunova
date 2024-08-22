import React, { useState, useRef, useEffect } from 'react';
import { FiFilter } from 'react-icons/fi';

type FilterOption = {
  label: string;
  options: string[];
};

type FilterProps = {
  filters: FilterOption[];
  onFilterChange: (filter: string, selectedOptions: string[]) => void;
};

const FilterComponent: React.FC<FilterProps> = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleFilterClick = (filterLabel: string) => {
    setExpandedFilter(expandedFilter === filterLabel ? null : filterLabel);
  };

  const handleOptionChange = (filterLabel: string, option: string, isChecked: boolean) => {
    const updatedOptions = isChecked
      ? [...(selectedOptions[filterLabel] || []), option]
      : (selectedOptions[filterLabel] || []).filter(item => item !== option);

    setSelectedOptions({ ...selectedOptions, [filterLabel]: updatedOptions });
  };

  const handleSelect = () => {
    Object.entries(selectedOptions).forEach(([filterLabel, options]) => {
      onFilterChange(filterLabel, options);
    });
    setIsOpen(false);
  };

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

  return (
    <div className="relative">
      <button
        className="flex items-center px-4 py-2 bg-gray-100 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiFilter className="mr-2" />
      </button>
      {isOpen && (
        <div ref={dropdownRef} className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            {filters.map(filter => (
              <div key={filter.label} className="mb-4">
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => handleFilterClick(filter.label)}
                >
                  <input 
                    type="checkbox" 
                    checked={expandedFilter === filter.label}
                    readOnly
                    className="mr-2"
                  />
                  <span className="font-medium">{filter.label}</span>
                </div>
                {expandedFilter === filter.label && (
                  <div className="ml-6 mt-2">
                    {filter.options.map(option => (
                      <label key={option} className="flex items-center mb-2">
                        <input 
                          type="checkbox"
                          checked={(selectedOptions[filter.label] || []).includes(option)}
                          onChange={(e) => handleOptionChange(filter.label, option, e.target.checked)}
                          className="mr-2"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold"
              onClick={handleSelect}
            >
              SELECT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;