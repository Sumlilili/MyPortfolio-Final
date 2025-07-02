import Contact from '../models/contact.model.js';

// GET all contacts
export const list = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET contact by ID
export const read = async (req, res) => {
  res.json(req.contact); // uses middleware (see contactByID)
};

// POST add new contact
export const create = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update contact by ID
export const update = async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.contact._id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE contact by ID
export const remove = async (req, res) => {
  try {
    await req.contact.deleteOne();
    res.json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE all contacts
export const removeAll = async (req, res) => {
  try {
    await Contact.deleteMany({});
    res.json({ message: 'All contacts deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Middleware: contactByID
export const contactByID = async (req, res, next, id) => {
  try {
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    req.contact = contact;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Could not retrieve contact' });
  }
};
