import React from 'react';
import { ILead } from '../types';
import { useAuth } from '../context/AuthContext';

interface LeadTableProps {
  leads: ILead[];
  onEdit: (lead: ILead) => void;
  onDelete: (id: string) => void;
}

const statusColors: { [key: string]: string } = {
  New: 'bg-blue-100 text-blue-700',
  Contacted: 'bg-yellow-100 text-yellow-700',
  Qualified: 'bg-green-100 text-green-700',
  Lost: 'bg-red-100 text-red-700',
};

const LeadTable = ({ leads, onEdit, onDelete }: LeadTableProps) => {
  const { user } = useAuth();

  if (leads.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-xl">No leads found</p>
        <p className="text-sm mt-2">Try adjusting your filters or add a new lead</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="p-3 font-medium">Name</th>
            <th className="p-3 font-medium">Email</th>
            <th className="p-3 font-medium">Status</th>
            <th className="p-3 font-medium">Source</th>
            <th className="p-3 font-medium">Created At</th>
            <th className="p-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} className="border-t hover:bg-gray-50">
              <td className="p-3">{lead.name}</td>
              <td className="p-3">{lead.email}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[lead.status]}`}>
                  {lead.status}
                </span>
              </td>
              <td className="p-3">{lead.source}</td>
              <td className="p-3">{new Date(lead.createdAt).toLocaleDateString()}</td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => onEdit(lead)}
                  className="text-blue-600 hover:underline text-xs"
                >
                  Edit
                </button>
                {user?.role === 'admin' && (
                  <button
                    onClick={() => onDelete(lead._id)}
                    className="text-red-500 hover:underline text-xs"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;