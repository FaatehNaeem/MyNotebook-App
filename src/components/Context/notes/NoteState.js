import noteContext from "./noteContext";
import { useState,useEffect} from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNote = async () => {
    // todo api call

    // Api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    // todo api call

    // Api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // console.log("Adding a new note")

  // Delete a note
  const deleteNote = async (id) => {
    // api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(),
    });
    const json = await response.json();
    // console.log(json);
    // console.log("delete the note with id" + id)
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  // Edit a note
  // const editNote = async(id,title,description,tag)=>{

  //   // Api call
  //   const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
  //     method: "PUT",
  //     mode: "cors",
  //     cache: "no-cache",
  //     credentials: "same-origin",
  //     headers: {
  //       "Content-Type": "application/json",
  //   "auth-token":localStorage.getItem("token")  //     },

  //   });
  //   const json = await response.json();
  //   console.log(json)

  //   let newNotes = JSON.parse(JSON.stringify(notes))
  //   // Logic to edit in client
  //   for (let index = 0; index < newNotes.length; index++) {
  //     const element = newNotes[index];
  //     if(element._id===id){
  //       newNotes[index].title = title;
  //       newNotes[index].description = description;
  //       newNotes[index].tag = tag;
  //       break;
  //     }
  //   }
  //   // console.log(notes,id)
  //   setNotes(newNotes);
  // }
  const editNote = async (id, title, description, tag) => {
    // Construct the updated note object
    const updatedNote = {
      title,
      description,
      tag,
    };
  
    // Retrieve the auth token from your application state or storage
    const authToken = localStorage.getItem("token"); // Replace this with your method of retrieving the token
  
    // Api call to update the note on the server with the dynamic auth token
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken, // Use the dynamic auth token
      },
      body: JSON.stringify(updatedNote), // Send the updated note in the request body
    });
  
    const json = await response.json();
    // console.log(json);
  
    if (response.ok) {
      // If the server successfully updated the note, update it in the frontend
      const newNotes = notes.map((note) =>
        note._id === id ? { ...note, ...updatedNote } : note
      );
  
      setNotes(newNotes);
    }
  };
  
  useEffect(() => {
    getNote(); // Add getNote() here, or any other action you want to trigger on component mount
  }, []);

  return (
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
