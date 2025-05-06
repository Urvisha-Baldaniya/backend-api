const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    taskName:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['Pending', 'Progress', 'Completed'],
        default:'Pending'
    }
},{
    timestamps:true
})

const taskModal = mongoose.model("task", taskSchema);
module.exports = taskModal;