const express = require('express')
const router = express.Router()

//import controller
const {getAllJobs, createNewJob, } = require('../controllers/listOfJobs.controller')

router.post('/', createNewJob)
router.get('/', getAllJobs)

module.exports = router;