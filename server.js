const express = require('express');
const cors = require('cors');
const { connectionWithAtlas } = require('./src/config/db_connect');
const userRoutes = require('./src/routes/userRoutes');
const financesRoutes = require('./src/routes/financesRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes')
const transactionRoutes = require('./src/routes/transactionRoutes')
const percentageRoutes = require('./src/routes/percentageroutes');
const passport = require('./src/middleware/auth');
const cron = require('node-cron')
const session = require('express-session');

const { updateAccounts } = require('./src/functions/dataFetch');

require('dotenv').config();
const swaggerui = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');




const app = express();
app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.use(passport.initialize());
app.use(passport.session());
connectionWithAtlas();

const port = process.env.PORT || 8001



app.use("/users", userRoutes);
app.use("/finances", financesRoutes);
app.use("/category", categoryRoutes);
app.use('/transaction', transactionRoutes);
app.use('/percent', percentageRoutes);
app.use('/api/docs', swaggerui.serve, swaggerui.setup(swaggerDocument));






function logMessage(job) {
  console.log(`${"[CRON (Balance Adjust)] :"} executed at:`, new Date().toLocaleString());
  }



cron.schedule('0 0 1 * *', () => {
  logMessage("getUsersWithAllFields");
   
    updateAccounts(); //cron running to update balances of users to run every month.

});





app.listen(port, () => {
  console.log(`[server]: running at http://localhost:${port}`);
});