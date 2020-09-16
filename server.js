const express = require('express')
const bodyParser = require("body-parser");
const config = require('./config/config')
const index = require('./routes/index')
const db = require('./dbConnectivity/mongodb')
const app = express()
const morgan = require('morgan');
const path = require('path')
///////////////////////////////////////////////////////////////Swagger//////////////////////////////////////////////////////////////////////////////

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

var swaggerDefinition = {
    info: {
      title: 'Demo',
      version: '2.0.0',
      description: 'Documentation of Demo Application',
    },
    host: `${global.gConfig.swaggerURL}`,
    basePath: '/',
  };
  var options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./routes/*/*.js']
  };
  
  var swaggerSpec = swaggerJSDoc(options);
  
  app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  
  
  });

// initialize swagger-jsdoc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'controllers/data/file')));


app.use('/api/v1', index)
 
app.listen(global.gConfig.node_port, function () {

  console.log("Server is listening on", global.gConfig.node_port)

})



