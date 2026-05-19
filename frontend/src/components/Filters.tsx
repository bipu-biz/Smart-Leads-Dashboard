import React, { useEffect, useState } from 'react';

interface FiltersProps {
  onFilterChange: (filters: {
    search: string;
    status: string;
    source: string;
    sort: string;
  }) => void;
}

const Filters = ({ onFilterChange }: FiltersProps) => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [source, setSource] = useState('');
  const [sort, setSort] = useState('latest');

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ search, status, source, sort });
    }, 500);
    return () => clearTimeout(timer);
  }, [search, status, source, sort]);

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <input
        type="text"
        placeholder="Search by name or email..."
        className="border rounded-lg p-2 flex-1 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
        <option value="Lost">Lost</option>
      </select>
      <select
        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      >
        <option value="">All Sources</option>
        <option value="Website">Website</option>
        <option value="Instagram">Instagram</option>
        <option value="Referral">Referral</option>
      </select>
      <select
        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
};

export default Filters;