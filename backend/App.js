const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const database = require("./database.json");
const app = express();
const port = process.env.PORT || 5000;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Example API",
      description: "Project API Information",
      servers: ["http://localhost:5000"]
    }
  },
  // ['.routes/*.js']
  apis: ["App.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
// const corsOptions = {
//   origin: ["http://localhost:80","http://localhost:3000"],
//   optionsSuccessStatus: 200,
// };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Routes
/**
 * @swagger
 * /database:
 *  get:
 *    tags : ["Example"]
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
/**
 * @swagger
 * /database/{name}:
 *  get:
 *    tags : ["Example"]
 *    parameters:
 *       - name: name
 *         in: path
 *         required: true
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/database",  (req, res) => {
  res.json(database);
});

app.get("/database/:name", (req, res) => {
  const resalt = database.filter(database => database.name == req.params.name)
  if(resalt.length > 0){
    res.json(resalt[0])
  }else{
    res.json({})
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
