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
    const qualification = new Qualification(req.body);
    await qualification.save();
    res.status(201).json(qualification);
  } catch (err) {
    handleError(res, err);
  }
};

export const read = (req, res) => {
  res.json(req.qualification);
};

export const update = async (req, res) => {
  try {
    const updated = await Qualification.findByIdAndUpdate(req.qualification._id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    handleError(res, err);
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
