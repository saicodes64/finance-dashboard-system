const RecordsModel = require('../models/RecordsModel');

exports.createRecord = async (req, res) => {
  try {
    const { userId } = req.user;
    const { amount, type, category, date, notes } = req.body;
    const record = new RecordsModel({ userId, amount, type, category, date, notes });
    await record.save();
    res.status(201).json({ message: 'Record created successfully', success: true, record });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', success: false, error: error.message });
  }
};

exports.getRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;

    let query = {};

    // Filter by type
    if (type) {
      query.type = type;
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by date range
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const records = await RecordsModel.find(query);

    res.status(200).json({
      message: "Records fetched successfully",
      success: true,
      records
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message
    });
  }
};

exports.updateRecord = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const { amount, type, category, date, notes } = req.body;
    const record = await RecordsModel.findOneAndUpdate({ userId, _id: id }, { amount, type, category, date, notes }, { new: true });
    res.status(200).json({ message: 'Record updated successfully', success: true, record });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', success: false, error: error.message });
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const record = await RecordsModel.findOneAndDelete({ userId, _id: id });
    res.status(200).json({ message: 'Record deleted successfully', success: true, record });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', success: false, error: error.message });
  }
};