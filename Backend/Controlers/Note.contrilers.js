const AuthVerify = require('../middleware/authverify.middleware');
const NotesModel = require('../schema/note.model');
const AuthModel = require("../Schema/Auth.model");
 //note create controller
const createNote = async (req, res) => {
    const { title, description, tag, isPrivate } = req.body;
    try {
        const user = await AuthModel.findById(req.user)
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "Account does not exist!"
            })
        }
        const note = await NotesModel.create({ title, description, tag, isPrivate, createdBy: req.user })

        res.status(201).send({
            success: true,
            message: "Note added successfully!",
            note
        })
    } catch (error) {
        let message = Object.values(error.errors)[0].properties.message
        if (!message) message = "Internal server error!"

        return res.status(500).send({
            success: false,
            message
        })
    }
}
 //note get controller
const getNote = async (req, res) => { 
    const note = await NotesModel.find({ createdBy: req.user }).sort({ updatedAt: -1 })
    try {
        res.status(200).send({
            success: true,
            message: "Note fetched successfully!",
            note
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error!"       
        })
    }
}
//public note get controller
const publicNote = async (req, res) => {
   try {
       const note = await NotesModel.find({ isPrivate: false })
         .sort({ updatedAt: -1 })
         .populate("createdBy");
       res.status(200).send({
         success: true,
         message: "Note fetched successfully!",
         note,
       });
     } catch (error) {
       console.log(error);
       return res.status(500).send({
         success: false,
         message: "Internal server error!",
       });
     }
   }
//update note controller
   const updateNote = async (req, res) => { 
    const { title, description, tag, isPrivate } = req.body;
  const { noteId } = req.params;
  const userId = req.user;

  try {
    const note = await NotesModel.findOne({ _id: noteId, createdBy: userId });
    console.log(note);
    if (!note) {
      return res.status(404).send({
        success: false,
        message: "Note not found!",
      });
    }

    if (title) note.title = title;
    if (description) note.description = description;
    if (tag) note.tag = tag;
    if (isPrivate) note.isPrivate = isPrivate;

    await note.save();
    res.status(201).send({
      success: true,
      message: "Note updated successfully!",
      note,
    });
  } catch (error) {
    console.log(error);
    let message = Object.values(error?.errors)[0]?.properties?.message;
    if (!message) message = "Internal server error!";

    return res.status(500).send({
      success: false,
      message,
    });
  }
}

//delete note controller

const deleteNote = async (req, res) => {
const { noteId } = req.params;
  const userId = req.user;
  try {
    const note = await NotesModel.findById(noteId);
    if (!note) {
      return res.status(404).send({
        success: false,
        message: "Note not found!",
      });
    }
    const deleteNote = await NotesModel.deleteOne({
      _id: noteId,
      createdBy: userId,
    });
    res.status(200).send({
      success: true,
      message: "Note deleted successfully!",
      note: deleteNote,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error!",
    });
  }
}

module.exports = {createNote, getNote, publicNote, updateNote, deleteNote}