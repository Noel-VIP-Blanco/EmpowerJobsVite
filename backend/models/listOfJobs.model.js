const mongoose = require('mongoose')

const Schema = mongoose.Schema

const listOfJobsSchema = new Schema({
    jobName : {
        type : String,
        required : true
    },
    prefferedSkills : {
        type : [String],
        required : true,
    },
    suitableDisabilities : {
        type : [String],
        required : true
    },
    salaryPerYear : {
        type : Number,
        required : true
    }

})

module.exports = mongoose.model('List-Of-Job', listOfJobsSchema)