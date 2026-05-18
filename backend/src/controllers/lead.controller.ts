import { Response } from 'express';
import { AuthRequest } from '../types';
import Lead from '../models/lead.model';

export const createLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, email, status, source } = req.body;
    const lead = await Lead.create({ name, email, status, source });
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getLeads = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, source, search, sort, page = 1 } = req.query;
    const limit = 10;
    const skip = (Number(page) - 1) * limit;

    const query: any = {};

    if (status) query.status = status;
    if (source) query.source = source;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const sortOrder = sort === 'oldest' ? 1 : -1;

    const total = await Lead.countDocuments(query);
    const leads = await Lead.find(query)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      leads,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getLeadById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      res.status(404).json({ message: 'Lead not found' });
      return;
    }
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lead) {
      res.status(404).json({ message: 'Lead not found' });
      return;
    }
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteLead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      res.status(404).json({ message: 'Lead not found' });
      return;
    }
    res.status(200).json({ message: 'Lead deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const exportCSV = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const leads = await Lead.find();
    const header = 'Name,Email,Status,Source,CreatedAt\n';
    const rows = leads.map(l =>
      `${l.name},${l.email},${l.status},${l.source},${l.createdAt}`
    ).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
    res.status(200).send(header + rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};