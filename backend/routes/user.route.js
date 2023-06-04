const express = require('express')
const router = express.Router()

//import controller
const {createNewUser, getAllUsers, getUserByUsername, updateUserByUsername} = require('../controllers/users.controller')

//GET ALL
router.get('/', getAllUsers)

//GET SINGLE
router.get('/:username', getUserByUsername)

//POST SINGLE
router.post('/', createNewUser)

//DELETE SINGLE
router.delete('/:username', (req, res) => {
    res.json({message : "Delete one data"})
})

//UPDATE SINGLE
router.patch('/:username', updateUserByUsername)

module.exports = router;