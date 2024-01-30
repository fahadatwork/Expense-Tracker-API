const Transaction = require("../models/TransactionSchema");
const  { validateTransactionFields } =  require('../utils/validators');
const { IncrementBalanceAccordingly , DecrementBalanceAccordingly } = require('../functions/balanceCalcuators');

exports.addTransaction = async (req, res) => {
  try {
    const { type, source, category_id, ammount, description} = req.body;

    if (!type || !source || !category_id ||!ammount || !description ) {
      return res.status(400).json({ message: "please input required fields" });
    }

   if(type === "credit"){

     IncrementBalanceAccordingly(source,ammount,req.user._id);
   }

   if(type === "debit"){

    DecrementBalanceAccordingly(source,ammount,req.user._id);
  }

    const newTransaction = Transaction({
      type: req.body.type,
      source: req.body.source,
      category: req.body.category_id,
      ammount : req.body.ammount,
      date : new Date(),
      description : req.body.description
    });

    await newTransaction.save();
    return res.status(200).json(newTransaction);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error_message : "Server Error" });
  }
};




exports.viewTransaction = async(req,res) => {

  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json("error : transaction does not exists");
    }

    return res.status(200).json(transaction);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error_message : "server Error" });
  }

};



exports.editTransaction = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
     
    if(!validateTransactionFields(date)){

        res.status(400).json({ error_message : "Fields are empty"});
    }
  
    const updatedTransaction = await Transaction.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedTransaction) {
      return res
        .status(404)
        .json({ error_mesaage: "transaction not found please retry" });
    }

    res.status(200).json(updatedTransaction);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error_mesaage: "internal Server Error" });
  }
};


exports.getTransactionsbyGroup = async (req, res) => {
    try {
      let { startDate, endDate, search } = req.query;
  
  
      if (startDate) startDate = new Date(startDate);
      if (endDate) endDate = new Date(endDate);
  
   
      let query = Transaction.find();
  
      // Filter by date range
      if (startDate && endDate) {
        query.where('date').gte(startDate).lte(endDate);
      }
  
      // Search filter
      if (search) {
        query.where({ $text: { $search: search } });
      }
  
      // Execute the query
      const transactions = await query.exec();
  
      // Group by month
      const groupedTransactions = transactions.reduce((groups, transaction) => {
        const month = transaction.date.getMonth();
        if (!groups[month]) groups[month] = [];
        groups[month].push(transaction);
        return groups;
      }, {});
  
      res.json(groupedTransactions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };