const expressLoader = require('./expressLoader');
const routeLoader = require('../routes');
const swaggerLoader = require('./swaggerLoader');

module.exports = async (app) => {
    await expressLoader(app);
    await routeLoader(app); 
    await swaggerLoader(app);

    // Error Handler
    app.use((err, req, res, next) => {
        const { message, status } = err;

        return res.status(status).send({ message });
    });
}