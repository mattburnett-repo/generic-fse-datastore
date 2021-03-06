
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = require('./server.ts')
var PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})

module.exports = app;