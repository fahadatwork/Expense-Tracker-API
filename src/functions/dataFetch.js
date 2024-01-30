const User =  require('../models/UserSchema');
const Percentage = require('../models/PercentageSchema');
const Finances = require('../models/FinancesSchema');
const { BalanceUpdate } = require('./percentageCalculators');




/* we are fetching all users from db, then fetching percentages and finances for each users, 
after using it we all calling BalanceUpdate() to allocate balances from account ammount and cash_in_hand to savings_ammount,
the Balance Update functions takes cash_in_hand ammount, percentage, and account_ammount and user_id to loacate users, 
then adjusts balance from both cash in hand and accounts_ammount to savings account */


exports.updateAccounts = async () => {
  
  const users = await User.find();
  for (let user of users) {
    const percentages = await Percentage.find({ user: user._id }).exec();
    const finances = await Finances.find({ user : user._id}).exec();
    
    percentages.forEach((percent) => {
      const persentage = percent.allocation_amount;  

       finances.forEach(async (obj) => {

           const { account_ammount, cash_in_hand } = obj 
           BalanceUpdate(persentage, account_ammount, cash_in_hand, user._id);

       });
    });
  }
};

