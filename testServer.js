
// try this while we work out the problems with testing on different port from dev/prod

const app = require('./server.js')

app.listen(4100, () => {
  console.log(`TEST SERVER is listening on random port`);
})

module.exports = app;
