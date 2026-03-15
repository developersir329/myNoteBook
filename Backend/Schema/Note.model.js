const mongoose = require("mongoose");
 const NoteSchema = new mongoose.Schema({


    title:{
        type: String,
        required: [true, "title is required!"],
        minlength: [3, "Title must be atleast 3 characters"],
        maxlength: [100, "Title must be atmost 100 characters"]
    },
    description:{
        type: String,
        required: [true, "title is required!"],
        minlength: [3, "Title must be atleast 3 characters"]
    },
    tag:[String],
    image:{
         type: String,
        default: null
    },
    isPrivate:{
         type:Boolean,
        default:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
                ref:"Auth"
    }
    
 },{timestamps:true});

 const Note = mongoose.model("Note",NoteSchema)

 module.exports = Note