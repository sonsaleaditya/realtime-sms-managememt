const ProgramConfig = require('../models/programConfig.model');

// Add a new country-operator configuration
const addProgramConfig = async (data) => {
    const newConfig = new ProgramConfig(data);
    return newConfig.save();
};

// Update an existing country-operator configuration
const updateProgramConfig = async (id, data) => {
    return ProgramConfig.findByIdAndUpdate(id, data, { new: true });
};

// Delete a country-operator configuration
const deleteProgramConfig = async (id) => {
    return ProgramConfig.findByIdAndDelete(id);
};

// Get all configurations
const getAllProgramConfigs = async () => {
    return ProgramConfig.find({});
};

module.exports = { addProgramConfig, updateProgramConfig, deleteProgramConfig, getAllProgramConfigs };
