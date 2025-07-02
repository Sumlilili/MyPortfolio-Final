import Project from '../models/project.model.js';

const handleError = (res, err) => res.status(500).json({ error: err.message });

export const list = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    handleError(res, err);
  }
};

export const create = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    handleError(res, err);
  }
};

export const read = (req, res) => {
  res.json(req.project);
};

export const update = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.project._id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    handleError(res, err);
  }
};

export const remove = async (req, res) => {
  try {
    await req.project.deleteOne();
    res.json({ message: 'Project deleted' });
  } catch (err) {
    handleError(res, err);
  }
};

export const removeAll = async (req, res) => {
  try {
    await Project.deleteMany({});
    res.json({ message: 'All projects deleted' });
  } catch (err) {
    handleError(res, err);
  }
};

export const projectByID = async (req, res, next, id) => {
  try {
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    req.project = project;
    next();
  } catch (err) {
    handleError(res, err);
  }
};
