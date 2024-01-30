const mongoose = require('mongoose');


const FinancesSchema = new mongoose.Schema({
    
    saving_ammount: {
        type: Number,
        required: true,
     },
     account_ammount : {
        type: Number,
        required: true,
      
     },
     cash_in_hand : {
        type: Number,
        required: true,
        
     },
    user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
    }

   });

const Finances = mongoose.model("Finances" , FinancesSchema);

module.exports = Finances