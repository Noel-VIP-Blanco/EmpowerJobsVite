const express = require('express')
//import models
const ListOfJobs = require('../models/listOfJobs.model')

const createNewJob = async (req, res) => { 
    const {jobName, prefferedSkills, suitableDisabilities, salaryPerYear} = req.body
    try{
        const listOfJobs = await ListOfJobs.create({
        jobName,
        prefferedSkills,
        suitableDisabilities,
        salaryPerYear
        })
        res.status(200).json(listOfJobs)   
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
}
//Get all jobs
const getAllJobs = async (req, res) => { 
    const listOfJobs = await ListOfJobs.find({})
    res.status(200).json(listOfJobs)
}


module.exports = {
    getAllJobs,
    createNewJob,
}