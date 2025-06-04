const express = require('express');

const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');


const router = express.Router()

const swaggerOption = {
  customCssUrl: "/style/swaggerStyle.css",
};

router.use('/' , swaggerUi.serve)
router.get('/' , swaggerUi.setup(swaggerDoc , swaggerOption))

module.exports = router