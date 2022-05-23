const expressLoader = require('./expressLoader.ts');
const routeLoader = require('../routes/index.ts');
const swaggerLoader = require('./swaggerLoader.ts');

module.exports = async ( app: any ) => {
    await expressLoader(app);
    await routeLoader(app); 
    await swaggerLoader(app);

    // Error Handler
    app.use((err: Error, req: Request, res: any, next: any) => {
        const { message } = err;

        res.status(400).send({ message });
    });
}