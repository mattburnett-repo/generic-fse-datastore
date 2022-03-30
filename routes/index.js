// const authRouter = require('./auth');
const policyRouter = require('./policyRoutes');
const customerRouter = require('./customerRoutes');
const insuranceTypeRouter = require('./insuranceTypeRoutes');
const policyStatusRouter = require('./policyStatusRoutes');
const providerRouter = require('./providerRoutes')

module.exports = (app) => {
  // authRouter(app);
  policyRouter(app);
  customerRouter(app);
  insuranceTypeRouter(app);
  policyStatusRouter(app);
  providerRouter(app);
}