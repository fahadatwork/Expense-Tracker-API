
module.exports = isPasswordShort = (password) => {
    if (password.length < 8) return true;
    else return false;
  }
  
 module.exports = nullCredentials = (obj) => {
    const { username, password, email } = obj;
  
    if (!username || !password || !email) return true;
    return false;
  }
  