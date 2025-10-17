// src/components/SearchModal.tsx
import { SearchIcon } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInputChange: (v: string) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onInputChange }) => {
  const [results, setResults] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  const setQuery = (v) => {
    onInputChange(v)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed h-[100vh] inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 transition-opacity duration-300">
      <div
        ref={modalRef}
        className="bg-white h-[50vh] w-full max-w-md mx-4 sm:mx-0 rounded-lg shadow-lg p-4 animate-slide-up"
      >
        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </span>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search for services..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        <div className="space-y-2">
          {results.length > 0 ? (
            results.map((result, index) => (
              <div key={index} className="text-gray-800 border-b pb-1">
                {result}
              </div>
            ))
          ) : query.trim() !== '' ? (
            <div className="text-gray-500">No results found.</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
