import React,{useContext} from 'react'
import noteContext from "./Context/notes/noteContext";

function Noteitems(props) {
  const context = useContext(noteContext);
  const {deleteNote} = context
  const {note,updatenote} = props
  return (
<div className='col-md-3 container'>
    <div className="card my-3">
    <div className="card-body d-flex align-items-center justify-content-center">
    <h5 className="card-title">{note.title}</h5>
    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);
      props.showAlert("Deleted Successfully","success")}}></i>
    <i className="fa-regular fa-pen-to-square" onClick={()=>{updatenote(note)}}></i>
    </div>
    <p className="card-text text-center">{note.description}</p>
  </div>
</div> 
// </div>
  )
}

export default Noteitems
