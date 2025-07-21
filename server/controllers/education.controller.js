import Qualification from '../models/education.model.js';

const handleError = (res, err) => res.status(500).json({ error: err.message });

export const list = async (req, res) => {
  try {
    const qualifications = await Qualification.find();
    res.json(qualifications);
  } catch (err) {
    handleError(res, err);
  }
};

export const create = async (req, res) => {
  try {
    const edu = new Education(req.body);
    const result = await edu.save();
    res.status(201).json(result);
  } catch (err) {
    console.error("Education create error:", err); // 👈 log this
    res.status(500).json({ error: "Server error", details: err.message });
  }
};


export const read = (req, res) => {
  res.json(req.qualification);
};

export const update = async (req, res) => {
  if (req.auth.role !== 'admin') {
    return res.status(403).json({ error: "Access denied" });
  }
  try {
    const updated = await Education.findByIdAndUpdate(req.params.educationId, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Could not update education entry" });
  }
};

export const remove = async (req, res) => {
  try {
    await req.qualification.deleteOne();
    res.json({ message: 'Qualification deleted' });
  } catch (err) {
    handleError(res, err);
  }
};

export const removeAll = async (req, res) => {
  try {
    await Qualification.deleteMany({});
    res.json({ message: 'All qualifications deleted' });
  } catch (err) {
    handleError(res, err);
  }
};

export const qualificationByID = async (req, res, next, id) => {
  try {
    const qualification = await Qualification.findById(id);
    if (!qualification) return res.status(404).json({ error: 'Qualification not found' });
    req.qualification = qualification;
    next();
  } catch (err) {
    handleError(res, err);
  }
};
