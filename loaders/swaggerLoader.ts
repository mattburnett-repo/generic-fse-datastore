var path = require('path');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs'); 

const swaggerDocument = yaml.load(fs.readFileSync(path.resolve(__dirname, '../openapi.yml'), 'utf8'));

module.exports = (app: any) => {
    app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    return app;
}
