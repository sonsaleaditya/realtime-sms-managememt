const CountryOperator = require('../models/countryOperator.model');

// Create or Update a country-operator pair
const createOrUpdateCountryOperator = async (req, res) => {
    const { country, operator, isHighPriority } = req.body;

    if (!country || !operator) {
        return res.status(400).json({
            success: false,
            msg: "Both 'country' and 'operator' fields are required."
        });
    }

    try {
        const existingPair = await CountryOperator.findOneAndUpdate(
            { country, operator },
            { isHighPriority },
            { new: true, upsert: true }
        );

        res.status(200).json({ success: true, pair: existingPair });
    } catch (error) {
        console.error('Error while saving country-operator pair:', error);
        res.status(500).json({ success: false, msg: 'Error while saving country-operator pair', error: error.message });
    }
};


// Get all country-operator pairs
const getCountryOperators = async (req, res) => {
    try {
        const pairs = await CountryOperator.find();
        res.status(200).json({ success: true, pairs });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Error fetching country-operator pairs', error });
    }
};

// Delete a country-operator pair
const deleteCountryOperator = async (req, res) => {
    const { id } = req.params || req.body;

    if (!id) {
        return res.status(400).json({ success: false, msg: "ID is required to delete a country-operator pair." });
    }

    try {
        const deletedPair = await CountryOperator.findByIdAndDelete(id);
        if (!deletedPair) {
            return res.status(404).json({ success: false, msg: "Country-operator pair not found." });
        }

        res.status(200).json({ success: true, message: 'Country-operator pair deleted successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Error deleting country-operator pair', error });
    }
};

module.exports = { createOrUpdateCountryOperator, getCountryOperators, deleteCountryOperator };
