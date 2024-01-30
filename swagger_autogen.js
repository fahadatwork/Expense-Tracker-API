const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/*.js"];

const options = {
  definition: {
    openai: "3.0.0",
    info: {
      title: "Expense Tracker API",
      version: "0.1",
      description:
        "This API Provides endpoints for operations for a expense tracker API",
      contact: {
        name: "Strugbits",
        url: "http://www.strugbits.com",
        email: "fahadkhan.strugbits@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

swaggerAutogen(outputFile, endpointsFiles, options);
