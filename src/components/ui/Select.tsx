// ==========================================
// OWNER: Omar, Doaa
// ==========================================
import React from 'react';

export function Select({
  className = '',
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="w-full">
      <select
        className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none ${className}`}
        {...props}
      >
        <option value="" disabled hidden>
          Select an option
        </option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </select>
    </div>
  );
}
