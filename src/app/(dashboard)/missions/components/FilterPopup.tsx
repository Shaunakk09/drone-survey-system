import React from 'react';

type FilterOption = 'all' | 'pending' | 'in-progress' | 'completed' | 'failed' | 'recent';

interface FilterPopupProps {
  show: boolean;
  onClose: () => void;
  onSelectFilter: (filter: FilterOption) => void;
  activeFilter: FilterOption;
}

const filterOptions: { value: FilterOption; label: string }[] = [
  { value: 'all', label: 'All Missions' },
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'failed', label: 'Failed' },
  { value: 'recent', label: 'Recent' }
];

const FilterPopup: React.FC<FilterPopupProps> = ({ show, onClose, onSelectFilter, activeFilter }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Filter Missions</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onSelectFilter(option.value)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeFilter === option.value
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPopup; 