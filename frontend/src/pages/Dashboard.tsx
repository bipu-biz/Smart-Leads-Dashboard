import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { ILead, IPagination } from '../types';
import Navbar from '../components/Navbar';
import Filters from '../components/Filters';
import LeadTable from '../components/LeadTable';
import LeadForm from '../components/LeadForm';
import Pagination from '../components/Pagination';

const Dashboard = () => {
  const [leads, setLeads] = useState<ILead[]>([]);
  const [pagination, setPagination] = useState<IPagination>({ total: 0, page: 1, pages: 1 });
  const [filters, setFilters] = useState({ search: '', status: '', source: '', sort: 'latest' });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editLead, setEditLead] = useState<ILead | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    setError('');
    try {
      const params: any = { page, ...filters };
      Object.keys(params).forEach((k) => !params[k] && delete params[k]);
      const res = await API.get('/leads', { params });
      setLeads(res.data.leads);
      setPagination(res.data.pagination);
    } catch (err) {
      setError('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleCreate = async (data: Partial<ILead>) => {
    try {
      await API.post('/leads', data);
      setShowForm(false);
      fetchLeads();
    } catch (err) {
      setError('Failed to create lead');
    }
  };

  const handleUpdate = async (data: Partial<ILead>) => {
    try {
      await API.put(`/leads/${editLead?._id}`, data);
      setEditLead(null);
      fetchLeads();
    } catch (err) {
      setError('Failed to update lead');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      await API.delete(`/leads/${id}`);
      fetchLeads();
    } catch (err) {
      setError('Failed to delete lead');
    }
  };

  const handleExportCSV = () => {
    window.open(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/leads/export`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Leads</h2>
          <div className="flex gap-3">
            <button
              onClick={handleExportCSV}
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 text-sm"
            >
              Export CSV
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
            >
              + Add Lead
            </button>
          </div>
        </div>

        <Filters onFilterChange={handleFilterChange} />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow">
          {loading ? (
            <div className="text-center py-16 text-gray-400">
              <p>Loading leads...</p>
            </div>
          ) : (
            <LeadTable
              leads={leads}
              onEdit={(lead) => setEditLead(lead)}
              onDelete={handleDelete}
            />
          )}
        </div>

        <Pagination
          page={page}
          pages={pagination.pages}
          onPageChange={setPage}
        />

        <p className="text-center text-sm text-gray-400 mt-4">
          Total: {pagination.total} leads
        </p>
      </div>

      {showForm && (
        <LeadForm
          onSubmit={handleCreate}
          onClose={() => setShowForm(false)}
        />
      )}

      {editLead && (
        <LeadForm
          initial={editLead}
          onSubmit={handleUpdate}
          onClose={() => setEditLead(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;