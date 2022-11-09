import * as React from 'react'
import './style.css';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import "react-mde/lib/styles/css/react-mde-all.css"

const Editor = ({currentNote,updateNote}) => {
  // console.log(currentNote,updateNote)
  const [selectedTab, setSelectedTab] = React.useState("write")

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    }) 

        // const [value, setValue] = React.useState("**Hello world!!!**");
  return (
    <section className="pane editor">
            <ReactMde
                value={currentNote.body}
                onChange={updateNote}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={80}
                heightUnits="vh"
                
            />
        </section>
  )
}

export default Editor