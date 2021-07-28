import React from 'react';
import ReactDOM, { render } from 'react-dom';
import Fuse from 'fuse.js';

class Notepad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentNote: "",
            noteList: ["i'm the first note. coffee i like.", "second nootteeee. christmas is almost here!"],
            currentTitle: "",
            noteTitleList: ["first title", "second titttlllee"],
            buttonName: "Save Note",
            currentIndex: "",
            newNoteButton: {visibility:"hidden"},
            trash: "",
            moveFirst: "",
            search: [],
            searchButton: "Search Content",
            searchList: "noteTitleList",
        };
    }

    changeHandler = (event) => {
        let note = event.target.value;
        let name = event.target.name;
        this.setState({[name]: note});
    }

    submitHandler = (event) => {
        console.log(Fuse);

        if(this.state.buttonName == "Save Note")
            if(this.state.currentNote == "" || this.state.currentTitle == ""){
                alert("empty field");
            }
            else {
                let currentNote = this.state.currentNote;
                this.state.noteList.push(currentNote);
                this.setState({currentNote: ""});

                let currentTitle = this.state.currentTitle;
                this.state.noteTitleList.push(currentTitle);
                this.setState({currentTitle: ""});
            }
        else {
            let index = this.state.currentIndex;
            let currentNote = this.state.currentNote;
            let currentTitle = this.state.currentTitle;
            let noteList = this.state.noteList;
            let noteTitleList = this.state.noteTitleList;

            delete noteList[index];
            delete noteTitleList[index];

            noteList.splice(index, 1, currentNote);
            noteTitleList.splice(index, 1, currentTitle);

            this.setState({trash: "trash"});
        }

    }

    viewNote = (event) => {
        let index = event.target.id;
        let selectedTitle = this.state.noteTitleList[index];
        let selectedNote = this.state.noteList[index];
        console.log(selectedTitle);
        console.log(selectedNote);

        this.setState({currentNote: selectedNote});
        this.setState({currentTitle: selectedTitle});
        this.setState({buttonName: "Edit Note"});
        this.setState({currentIndex: index});
        this.setState({newNoteButton: {visibility: "visible"}});
    }

    moveNote = (event) => {
        if(this.state.moveFirst == ""){
            let index = event.target.id;
            this.setState({moveFirst: index});
        }
        else{
            let firstIndex = this.state.moveFirst;
            let secondIndex = event.target.id;

            let noteList = this.state.noteList;
            let noteTitleList = this.state.noteTitleList;

            let firstCurrentNote = noteList[firstIndex];
            let firstCurrentNoteTitle = noteTitleList[firstIndex];

            let secondCurrentNote = noteList[secondIndex];
            let secondCurrentNoteTitle = noteTitleList[secondIndex];

            noteList[firstIndex] = secondCurrentNote;
            noteList[secondIndex] = firstCurrentNote;

            noteTitleList[secondIndex] = firstCurrentNoteTitle;
            noteTitleList[firstIndex] = secondCurrentNoteTitle;

            // delete noteList[firstIndex];
            // delete noteTitleList[firstIndex];
            // delete noteList[secondIndex];
            // delete noteTitleList[secondIndex];
            // noteList.splice(firstIndex, 1, secondCurrentNote);
            // noteTitleList.splice(firstIndex, 1, secondCurrentNoteTitle);
            // noteList.splice(secondIndex, 1, firstCurrentNote);
            // noteTitleList.splice(secondIndex, 1, firstCurrentNoteTitle);

            this.setState({moveFirst: ""});
        }
    }

    newNoteHandler = (event) => {
        this.setState({currentNote: ""});
        this.setState({currentTitle: ""});
        this.setState({buttonName: "Save Note"});
        this.setState({currentIndex: ""});
        this.setState({newNoteButton: {visibility: "hidden"}});
    }

    deleteNoteHandler = (event) => {
        let index = this.state.currentIndex;
        let noteList = this.state.noteList;
        let noteTitleList = this.state.noteTitleList;

        noteList.splice(index, 1);
        noteTitleList.splice(index, 1);

        this.setState({trash: "trash"});
    }

    searchNotes = (event) => {
        let note = event.target.value;
        if(this.state.searchButton == "Search Content"){
            var list = this.state.noteTitleList;
        }
        else{
            var list = this.state.noteList;
        }

        const options = {keys: ["title"], includeScore: true};
        const fuse = new Fuse(list, options);                            //const fuse = new Fuse([...list, ...list2], options);
        const result = fuse.search(note);
        this.setState({search: result});
    }

    searchChange = (event) => {
        if(this.state.searchButton == "Search Content"){
            this.setState({searchList: "noteList"});
            this.setState({searchButton: "Search Titles"});
        }
        else{
            this.setState({searchList: "noteTitleList"});
            this.setState({searchButton: "Search Content"});
        }
    }

    render() {
        const textareaStyle = {
            width: "400px",
            height: "200px"
        };
        
        const rightsideStyle = {
            marginLeft: "500px",
            zIndex: 9
        }

        const leftsideStyle = {
            width: "400px",
            position: "absolute"
        }

        const titleStyle = {
            width: "356px",
            position: "absolute"
        }

        const bottomStyle = {
            marginTop: "250px",
        }

        return (
            <div>
                <h1>Notepad</h1>
                <div style={leftsideStyle}>
                    <text>Title: &nbsp;</text>
                        <input
                            type="text"
                            name="currentTitle"
                            onChange={this.changeHandler}
                            value={this.state.currentTitle}
                            style={titleStyle}
                        >
                        </input>
                    <br/><br/>
                    <textarea
                        name="currentNote"
                        onChange={this.changeHandler} 
                        style={textareaStyle}
                        value={this.state.currentNote}               
                    >
                    </textarea>
                    <br/><br/>
                    <input
                        type="button"
                        name="submitButton"
                        onClick={this.submitHandler}
                        value={this.state.buttonName}
                    >
                    </input>
                    &nbsp;
                    <input
                        type="button"
                        name="newNoteButton"
                        onClick={this.newNoteHandler}
                        style={this.state.newNoteButton}
                        value="New Note"
                    >
                    </input>
                    &nbsp;
                    <input
                        type="button"
                        name="deleteNoteButton"
                        onClick={this.deleteNoteHandler}
                        style={this.state.newNoteButton}
                        value="Delete Note"
                    >
                    </input>
                </div>
                <div style={rightsideStyle}>
                    <h2>List of Notes</h2>
                    {this.state.noteTitleList.map((note, index) => (
                        <ul key={index} id={index} onClick={this.viewNote} onDoubleClick={this.moveNote}> {note} </ul>
                    ))}
                </div>
                <div style={bottomStyle}>
                    <h2>Search</h2>
                    <input
                        type="text"
                        name="searchFor"
                        onChange={this.searchNotes}>
                    </input>
                    <input
                        type="button"
                        name="searchButton"
                        onClick={this.searchChange}
                        value={this.state.searchButton}
                    >
                    </input>
                    {this.state.search.map((title, index) => (                          
                        <p key={index}>{title.item}</p>
                    ))}
                </div>
            </div>

        );
    }
}

ReactDOM.render(<Notepad />, document.getElementById('root'));