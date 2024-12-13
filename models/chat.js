const mongoose = require('mongoose');
// creating schema
const chatSchema=new mongoose.Schema({
    from:{
        type:String,
        require:true
    },
    to:{
        type:String,
        require:true
    },
    msg:{
        type:String,
        maxLength:50
    },
    created:{
        type:Date,
        require:true
    }
});

// creaating model 
const Chat=mongoose.model("Chat",chatSchema);
module.exports=Chat;



