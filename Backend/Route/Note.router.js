const express = require('express')
const router = express.Router();
const AuthVerify = require('../middleware/authverify.middleware');
const NotesModel = require('../schema/note.model');
const AuthModel = require("../Schema/Auth.model");
const { createNote,getNote,publicNote, updateNote ,deleteNote} = require('../Controlers/Note.contrilers');

router.post("/create", AuthVerify, createNote);

router.get("/mynote",AuthVerify,getNote) 

router.get("/public",AuthVerify,publicNote)

router.put("/update", AuthVerify,  updateNote)

router.delete("/delete", AuthVerify, deleteNote)

module.exports = router;