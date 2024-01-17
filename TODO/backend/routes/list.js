const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");


// add task
router.post("/addTask", async(req,res) => {
  try {
    const {title, body, id} = req.body;
    console.log("title: " ,title);
    // console.log("email: ", email);
    const existingUser = await User.findById(id);
    console.log(existingUser);
    if(existingUser)
    {
        const list = new List({title,body, user:existingUser});
        await list.save().then(() => res.status(200).json({list}));
        existingUser.list.push(list);
        existingUser.save();
        console.log("Task added successfully by existing user!");
    }
    
  } catch (error) {
    console.log(error);
  } 
});



// update task
router.put("/updateTask/:id", async(req,res) => {
    try {
      const {title, body, email} = req.body;
      console.log("title: ", title);
  
      const existingUser = await User.findOne({email});
      console.log(existingUser);
      if(existingUser)
      {
         const list =  await List.findByIdAndUpdate(req.params.id, {title,body});
          list.save().then(() => res.status(200).json({message: "Task Updated!"}));
      }
      
    } catch (error) {
      console.log(error);
    } 
  });


// delete task
router.delete("/deleteTask/:id", async(req,res) => {
    try {
      const {email} = req.body;
      console.log(email);
  
      const existingUser = await User.findOne({email});
      console.log(existingUser);
      if(existingUser)
      { 
          await List.findByIdAndDelete(req.params.id).then(() => res.status(200).json({message: "Task Deleted!"}));
      } 
      
    } catch (error) {
      console.log(error);
    } 
  });

// get the task
router.get("/getTask/:id", async(req,res) => {
    const list = await List.find({user: req.params.id}).sort({createdAt: -1});
    if(list.length !==0 )
    {
        res.status(200).json({"message": "No Task"});
    }
    res.status(200).json({list});
})



module.exports = router;