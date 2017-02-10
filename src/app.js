import React from 'react';
import ReactDom from 'react-dom';
import NoteCard from './notesCard';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      notes: []
    }
    this.showSidebar = this.showSidebar.bind(this);
    this.addNote = this.addNote.bind(this);
  }
  showSidebar(e) {
    e.preventDefault();
    this.sidebar.classList.toggle("show");
  }
  addNote(e) {
    e.preventDefault();
    console.log("Submitted")
    const note = {
      title: this.noteTitle.value,
      text: this.noteText.value
    };
    const newNotes = Array.from(this.state.notes);
    newNotes.push(note);
    this.setState({
      notes: newNotes
    });
    this.noteTitle.value = "";
    this.noteText.value = "";
    this.showSidebar(e);
  }

  render() {
    return (
      <div>
        <header className="mainHeader">
          <h1>Noted</h1>
          <nav>
            <a href="" onClick={this.showSidebar}>Add New Note</a>
          </nav>
        </header>
        <section className="notes">
          {this.state.notes.map((note,i) => {
            return (
              <NoteCard note={note} key={'note-${i}'}/>
            )
          })}
        </section>
        <aside className="sidebar" ref={ref => this.sidebar = ref}>
          <form onSubmit={this.addNote}>
            <h3>Add New Note</h3>
            <div className="close-btn" onClick={this.showSidebar}>
              <i className="fa fa-times"></i>
            </div>
            <label htmlFor="note-title">Title:</label>
            <input type="text" name="note-title" ref={ref => this.noteTitle =ref }/>
            <label htmlFor="note-text"></label>
            <textarea name="" id="" ref={ref => this.noteText =ref }></textarea>
            <input type="submit" value="Add New Note" />
          </form>
          </aside>
      </div>
    )
  }
}

ReactDom.render(<App/>, document.getElementById('app'));
