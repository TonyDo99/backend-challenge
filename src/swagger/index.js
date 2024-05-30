import { join } from 'path';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Game Titles API',
      version: '1.0.0',
      description: 'API for managing game titles',
      contact: {
        name: 'Developer',
        email: 'developer@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
  },
  apis: [join(process.cwd(), 'src/routes/*.route.js')],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
export { swaggerUi, swaggerDocs };
