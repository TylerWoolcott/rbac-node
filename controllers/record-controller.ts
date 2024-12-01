const Record = require('../models/record')

const getAllRecords = async (req, res) => {
  try {
    const records = await Record.find()
    return res.json(records)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}

const createRecord = async (req, res) => {
  const { title, description } = req.body
  try {
    const record = new Record({
      title,
      description
    })
    await record.save()
    res.status(200).json(record)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update a record
const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const record = await Record.findByIdAndUpdate(id, { title, description });
    if (!record) throw new Error('Record not found');
    res.json({ title, description });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete a record
const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Record.findByIdAndDelete(id);
    if
      (!record) throw new Error('Record not found');
    res.json(`Record with id ${id} is deleted successfully`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getAllRecords, createRecord, updateRecord, deleteRecord }
