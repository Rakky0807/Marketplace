import React from 'react';
import { Listbox } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';

const filters = [
  { id: 1, name: 'All Resources' },
  { id: 2, name: 'Presentation' },
  { id: 3, name: 'Template' },
  { id: 4, name: 'Pitch Deck' }
];

const FilterDropdown = ({ selectedFilter, onFilterChange }) => {
  return (
    <Listbox value={selectedFilter} onChange={onFilterChange}>
      <div className="relative w-48">
        <Listbox.Button className="w-full px-4 py-2 text-left bg-gray-100 rounded-lg flex justify-between items-center hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
          {selectedFilter.name}
          <ChevronDown className="h-4 w-4" />
        </Listbox.Button>
        
        <Listbox.Options className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg py-1 focus:outline-none">
          {filters.map((filter) => (
            <Listbox.Option
              key={filter.id}
              value={filter}
              className={({ active }) =>
                `relative cursor-pointer select-none py-2 px-4 ${
                  active ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
                }`
              }
            >
              {({ selected }) => (
                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                  {filter.name}
                </span>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};

export default FilterDropdown;