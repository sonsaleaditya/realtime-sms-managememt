const CountryOperator = require('../models/countryOperatorModel');

const addCountryOperator = async (data) => {
    const newOperator = new CountryOperator(data);
    return newOperator.save();
};

const updateCountryOperator = async (id, data) => {
    return CountryOperator.findByIdAndUpdate(id, data, { new: true });
};

const deleteCountryOperator = async (id) => {
    return CountryOperator.findByIdAndDelete(id);
};

module.exports = { addCountryOperator, updateCountryOperator, deleteCountryOperator };
