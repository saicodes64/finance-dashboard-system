const mongoose = require('mongoose');
const RecordsModel = mongoose.model('Records', {
    userId: String,
    amount: Number,
    type: { type: String, enum: ['INCOME', 'EXPENSE'] },    
    category: String,
    date: Date,
    notes: String,
    createdAt: Date,
    updatedAt: Date,
});

module.exports = RecordsModel;