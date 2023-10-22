const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../Models/Note")
const { body, validationResult } = require("express-validator");


//ROUTE 1: Get all the notes : Get "api/auth/getuser". login required

router.get("/fetchallnotes", fetchuser, async(req, res) => {

  try{
const note = await Note.find({user:req.user.id});
  res.json(note);
  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
    }
});

//ROUTE 2: Add a new note using : Post "api/auth/addnote". login required

router.post("/addnote", fetchuser, [
  body("title", "Enter a valid title").isLength({min:3}),
  body("description", "Description must be atleast 5 characters").isLength({min:5}),
 
], async(req, res) => {

  try{
  const{title,description,tag} = req.body

  // if there are error return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const note = new Note({
title,description,tag, user: req.user.id
  })
  
  const savedNote = await note.save()

    res.json(savedNote);
}catch(error){
  console.error(error.message);
  res.status(500).send("Internal Server Error");
  }
  });

//ROUTE 3: Update an existing note using : Put "api/auth/updatenote". login required

router.put("/updatenote/:id", fetchuser, async(req,res)=>{
const{title,description,tag} = req.body

//create a newNote object
try{
const newNote = {};

if(title){newNote.title=title};
if(description){newNote.description=description};
if(tag){newNote.tag=tag};

// find the note to be updated and update it
let note = await Note.findById(req.params.id);
if(!note){
 return res.status(404).send("Not Found");
}

if(note.user.toString()!==req.user.id){
  return res.status(401).send("Not Allowed");
}

note = await Note.findByIdAndUpdate(req.params.id ,{$set:newNote},{new:true})
res.json({note});
}catch(error){
  res.status(500).send("Internal Server Error");

}

})

//ROUTE 4: Delete an existing note using : Delete "api/auth/deletenote". login required

router.delete("/deletenote/:id", fetchuser, async(req,res)=>{
  
  const{title,description,tag} = req.body
  

try{  
  // find the note to be deleted and delete it
  let note = await Note.findById(req.params.id);
  if(!note){
   return res.status(404).send("Not Found");
  }
  
  // allow deletion only if user owns this note 
  if(note.user.toString()!==req.user.id){
    return res.status(401).send("Not Allowed");
  }
  
  note = await Note.findByIdAndDelete(req.params.id)
  res.json({"Success": "Note has been deleted",note:note});
}catch(error){
  res.status(500).send("Internal Server Error");

}   
  })
module.exports = router