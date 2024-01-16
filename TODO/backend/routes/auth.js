const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
// const https = require("https");


// for sign up
router.post("/register", async(req,res) => {
    try{
       
        const{email, username, password} = req.body;
        const hashpassword = bcrypt.hashSync(password);
        const user = new User({email, username, password: hashpassword});
        await user.save().then(() => {
            res.status(200).json({user:user});
        });
    }
    catch(error){
        console.log(error);
        console.log("Hii");
        res.status(400).json({message: error});
    }
});


// for sign in
router.post("/signin", async(req,res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        console.log("user:" , user);

        if(!user) 
        {
            res.status(400).json({message: "Please Sign Up first!"});
        }

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if(!isPasswordCorrect)
        {
            res.status(400).json({message: "Incorrect Password!"});
        }

        const{password, ...others} = user._doc;
        res.status(200).json({others});
    }

    catch(error){
        console.log(error);
        res.status(400).json({message: error});
    }
});
module.exports = router;