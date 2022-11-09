import './App.css';
import {data} from './components/data/data.jsx';
import Split from 'react-split';
import {nanoid} from 'nanoid';
import Sidebar from './components/Sidebar';
import { useEffect, useState } from 'react';
import Editor from './components/Editor';


function App() {
   const [notes,setNotes] = useState( () => JSON.parse(localStorage.getItem('notes')) || []);
   const [currentNoteId,setCurrentNoteId] = useState((notes[0]&&notes[0].id) || '')
  // console.log(currentNoteId);
  useEffect(() => {
    localStorage.setItem('notes',JSON.stringify(notes))
 
  }, [notes])
  


   function createNewNote(){
    const newNote = {
      id: nanoid(),
      body:"# Type your markdown note's title here"
    }
    setNotes(prevNotes => [newNote,...prevNotes])
    setCurrentNoteId(newNote.id)
    
   }

   function deleteNote(event,noteId){
    event.stopPropagation();
    setNotes(oldNotes => oldNotes.filter((note)=> note.id !== noteId))
      
   }

   function findCurrentNote(){
    return notes.find(note =>{
      return note.id === currentNoteId
    }) || notes[0]
   }
  //  console.log(findCurrentNote());
   
  
  function updateNote(text) {
    // this is not rearrange the note
    // setNotes(oldNotes => oldNotes.map(oldNote => {
    //     return oldNote.id === currentNoteId
    //         ? { ...oldNote, body: text }
    //         : oldNote
    // }))


    //Try to rearrange the most recent-note
   setNotes(oldNotes =>{
    const newArray = [];
    for(let i = 0; i < oldNotes.length; i++){
      if(oldNotes[i].id === currentNoteId){
        newArray.unshift({...oldNotes[i],body: text})
      }else{
        newArray.push(oldNotes[i])
      }

    }
    return newArray
   })

  
}

  
  return (

    
    <main>
      {
        notes.length > 0
        ? 
        <Split
          sizes={[40,60]}
          direction="horizontal"
          gutterSize={10}
          // cursor="col-resize"
          className='split'>
            <Sidebar 
            notes ={notes}
            currentNoteId={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}/>
            {
            
            currentNoteId && <Editor
            currentNote={findCurrentNote()}
            updateNote={updateNote}
            />
            
            }

      </Split>
      :
      <div className='no-notes'>
        <h1>You have no note</h1>
        <button className='first-note' onClick={createNewNote}>
          Create one now
        </button>
      </div>

      }
      
      
    </main>
  );
}

export default App;
