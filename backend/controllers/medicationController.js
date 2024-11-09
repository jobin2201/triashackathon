const medicationModel = require('../models/medication');

const getAllMedications = async (req, res) => {
  try {
    const medications = await medicationModel.getAllMedications();
    res.status(200).json(medications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch medications' });
  }
};

const addMedication = async (req, res) => {
  const medication = req.body;
  try {
    const newMedication = await medicationModel.addMedication(medication);
    res.status(201).json(newMedication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add medication' });
  }
};

const updateMedication = async (req, res) => {
  const id = req.params.id;
  const updatedDetails = req.body;
  try {
    const updatedMedication = await medicationModel.updateMedication(id, updatedDetails);
    res.status(200).json(updatedMedication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update medication' });
  }
};

const deleteMedication = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedMedication = await medicationModel.deleteMedication(id);
    if (deletedMedication) {
      res.status(200).json({ message: `Medication with ID ${id} deleted` });
    } else {
      res.status(404).json({ error: 'Medication not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete medication' });
  }
};

module.exports = {
  getAllMedications,
  addMedication,
  updateMedication,
  deleteMedication,
};
