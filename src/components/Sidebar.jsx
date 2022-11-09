import React, { useState } from 'react'
import {AiFillDelete} from 'react-icons/ai';
import './style.css'




const Sidebar = (props) => {
    // console.log(props)
    const noteElements = props.notes.map((note,index)=>(
        <div key={note.id}>
            <div className={`title ${note.id === props.currentNoteId.id ? 'selected-note' : ''}`}
                onClick={()=>props.setCurrentNoteId(note.id)}
            >
                <h4 className='text-snippet'>{note.body.split('\n')[0]}</h4>
                <button className='delete-btn' onClick={(event)=>props.deleteNote(event,note.id)}>
                    <AiFillDelete size={'24px'} color={'gray'}/>
                </button>
            </div>
        </div>
    ))
    return (
    <section className='pane sidebar'>
        <div className='sidebar--header'>
            <h3>Notes {`(${props.notes.length})`}</h3>
            <button className='new-note' onClick={props.newNote}>+</button>
        </div>
        {noteElements}
        
        
    </section>
  )
}

export default Sidebar