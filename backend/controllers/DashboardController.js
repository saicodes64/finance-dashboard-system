const RecordsModel = require('../models/RecordsModel');

const GetDashboardData = async (req, res) => {
    try {
        const { userId } = req.user;
        console.log(userId);
        const records = await RecordsModel.find({ userId });
        const totalIncome = records.filter(record => record.type === 'INCOME').reduce((acc, record) => acc + record.amount, 0);
        const totalExpense = records.filter(record => record.type === 'EXPENSE').reduce((acc, record) => acc + record.amount, 0);
        const netBalance = totalIncome - totalExpense;
        const categoryWiseBreakdown = records.reduce((acc, record) => {
            acc[record.category] = (acc[record.category] || 0) + record.amount;
            return acc;
        }, {});
        const recentTransactions = records.sort((a, b) => b.date - a.date).slice(0, 10);
        res.json({ totalIncome, totalExpense, netBalance, categoryWiseBreakdown, recentTransactions });
    } catch (error) {
        
    }
}

module.exports = { GetDashboardData };
