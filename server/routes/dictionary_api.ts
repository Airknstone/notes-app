import express from 'express';
const router = express.Router();
const definitionController = require('../controller/definition.controller');

/* Gets documents definitions that match search term */
router.get('/:word', definitionController.getMatchingDefinitions);

module.exports = router;
