const express = require("express");

const task = require("../modal/modal.task");
const taskRoutes = express.Router();

taskRoutes.post("/addTask", async (req, res)=>{
    try{
        const {taskName, status} = req.body;

        if(!taskName || !status){
            return res.status(400).json({msg:"All field are required..!"});
        }
         const newTask = new task({taskName, status})
         await newTask.save();

        return res.status(200).json({msg:"Task Added..!", newTask});

    }catch(err){
        return res.status(400).json({msg:"Task Can't Added..!",err});
    }
})

taskRoutes.delete("/deleteTask/:id", async (req, res)=>{
    try{
        const {id} = req.params;
        const deleteTask = await task.findByIdAndDelete(id);
        return res.status(200).json({msg:"Deleted Task..!", deleteTask});

    }catch(err){
        return res.status(400).json({msg:"Can't Deleted Task..!",err});
    }
})
// taskRoutes.get("/update/:id", async (req, res)=>{
//     const {id} = req.params;
//     const data = await task.findById(id);
//     if(!data){
//         return res.status(200).json({msg:"Task not found", data});
//     }
// })

// taskRoutes.put("/updateTask/:id", async (req, res)=>{
//     try{
//      const {id} = req.params;
//      const {taskName, status} = req.body;

//      if(!taskName || !status){
//         return res.status(400).json({msg:"All fields are required..!"});
//      }

//      const updateTask = await task.findByIdAndUpdate(id,{taskName, status});
//      return res.status(200).json({msg:"Updated Task..!", tasks:updateTask});
//     }catch(err){
//         return res.status(400).json({msg:"Can't Updated Task..!",err});
//     }
// })

taskRoutes.put("/updateTask/:id", async (req, res)=>{
    try{
     const {id} = req.params;
     const {taskName, status} = req.body;

     const updateData = {};
     if(taskName) updateData.taskName = taskName;
     if(status) updateData.status = status;

     if(Object.keys(updateData).length === 0){
        return res.status(400).json({msg:"No fields to update..!"});
     }

     const updateTask = await task.findByIdAndUpdate(id, updateData, {new: true});
     return res.status(200).json({msg:"Updated Task..!", tasks:updateTask});
    }catch(err){
        return res.status(400).json({msg:"Can't Updated Task..!",err});
    }
})  

taskRoutes.get("/getTask", async (req, res)=>{
    try{
     const getTask = await task.find();
     console.log(getTask);

     return res.status(200).json({msg:"Viewed Task", tasks: getTask});
    }catch(err){
        return res.status(400).json({msg:"Task not found",err});
    }
})

module.exports = taskRoutes;