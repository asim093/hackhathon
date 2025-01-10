import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API Documentation",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    servers: [
      {
        url: `https://ministerial-inger-asim-3f191a31.koyeb.app/`,
        description: "Local server",
      },
    ],
    components: {
      schemas: {
        Order: {
          type: "object",
          properties: {
            productId: {
              type: "string",
              description: "ID of the product",
              example: "12345",
            },
            quantity: {
              type: "integer",
              description: "Quantity of the product",
              example: 2,
            },
            address: {
              type: "string",
              description: "Delivery address",
              example: "123 Main St, City, Country",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
            },
          },
        },
        AuthError: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Token has expired or is invalid.",
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"], // Path to your route files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
