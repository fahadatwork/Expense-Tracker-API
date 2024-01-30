
exports.validateCategoryFields = (data) => {
      
    const required_fields = [ 'name' ];

    for (let field of required_fields) {
     if (!data.hasOwnProperty(field)) {
       return false;
     }
   }
   return true;

}


exports.validateUserCategoryFields = (data) => {

    const required_fields = [ 'username', 'email', 'password'];

    for (let field of required_fields) {
     if (!data.hasOwnProperty(field)) {
       return false;
     }
   }
   return true;

}

exports.validateTransactionFields = (data) =>{

  const required_fields = ["type", "source", "category", "ammount"]

  for (let field of required_fields) {
    if (!data.hasOwnProperty(field)) {
      return false;
    }
  }
  return true;

}


exports.ValidatePercentage = (percentage) => {

    if(percentage > 0 && percentage < 100){

      return true
    }


    return false

}