import fse from 'fs-extra';
import swaggerJSDoc from 'swagger-jsdoc';

import swaggerDefinition from './openapi.json';
import CONFIG from './config';

const apis = ['./controller/**.js'];

const options = {
  swaggerDefinition,
  apis,
};

const doc = swaggerJSDoc(options);

fse.outputJSON(CONFIG.SWAGGER_JSON, doc)
  .then(() => fse.readJson(CONFIG.SWAGGER_JSON))
  .then(x => process.stdout.write(`${JSON.stringify(x, null, 2)}\n`))
  .catch(x => process.stderr.write(`${x}\n`));
