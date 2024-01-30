const Finances = require("../models/FinancesSchema");  



exports.IncrementBalanceAccordingly = async (source, ammount, user_id) => {
  if (source === "cash") {
    const updatedFinances = await Finances.findOne({ "user._id": user_id });

    updatedFinances.updateOne(
      { $inc: { cash_in_hand: ammount } },
      function (err, res, next) {
        if (err) {
          console.log(err); 
        } else {
          next();
        }
      }
    );
  }

  if (source === "saving_ammount") {
    const updatedFinances = await Finances.findOne({ "user._id": user_id });

    updatedFinances.updateOne(
      { $inc: { saving_ammount: ammount } },
      function (err, res, next) {
        if (err) {
          console.log(err);
        } else {
          next();
        }
      }
    );
  }

  if (source === "account_ammount") {
    const updatedFinances = await Finances.findOne({ "user._id": user_id });

    updatedFinances.updateOne(
      { $inc: { account_ammount: ammount } },
      function (err, res, next) {
        if (err) {
          console.log(err);
        } else {
          next();
        }
      }
    );
  }
};


exports.DecrementBalanceAccordingly = async(source, ammount, user_id) => {
    if (source === "cash") {
      const updatedFinances = await Finances.findOne({ "user._id": user_id });
  
      updatedFinances.updateOne(
        { $inc: { cash_in_hand: -ammount } },
        function (err, res, next) {
          if (err) {
            console.log(err);
          } else {
            next();
          }
        }
      );
    }
  
    if (source === "saving_ammount") {
      const updatedFinances = await Finances.findOne({ "user._id": user_id });
  
      updatedFinances.updateOne(
        { $inc: { saving_ammount: -ammount } },
        function (err, res, next) {
          if (err) {
            console.log(err);
          } else {
            next();
          }
        }
      );
    }
  
    if (source === "account_ammount") {
      const updatedFinances = await Finances.findOne({ "user._id": user_id });
  
      updatedFinances.updateOne(
        { $inc: { account_ammount: -ammount } },
        function (err, res, next) {
          if (err) {
            console.log(err);
          } else {
            next();
          }
        }
      );
    }
  };
