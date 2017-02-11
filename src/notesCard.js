import React from 'react';

export default class NoteCard extends React.Component {
  constructor(){
    super();
    this.state = {
      editing: false,
      note: {}
    };
    this.save = this.save.bind(this);
  }

  save(e) {
    e.preventDefault();
    const userId = firebase.auth().currentUser.uid;
    const dbRef = firebase.database().ref(`user/${userId}/notes/${this.props.note.key}`);
    dbRef.update({
      title: this.noteTitle.value,
      text: this.noteText.value
    })
    this.setState({
      editing: false
    });
  }
  render(){
    let editingTemp = (
      <span>
      <h4>{this.props.note.title}</h4>
      <p>{this.props.note.text}</p>
      </span>
    )

    if(this.state.editing) {
      editingTemp = (
        <form onSubmit={this.save}>
          <div>
            <input type="text" defaultValue={this.props.note.title} name="title" ref={ref => this.noteTitle = ref}></input>
          </div>
          <div>
            <input type="text" defaultValue={this.props.note.text} name="text" ref={ref => this.noteText = ref}></input>
          </div>
          <input type="submit" value="Done editing"/>
        </form>
      )
    }

  return (
    <div className="noteCard">
      <i className="fa fa-edit" onClick={()=> this.setState({editing: true})}></i>
      <i className="fa fa-times" onClick={() => this.props.removeNote(this.props.note.key)}></i>
      {editingTemp}
    </div>
    )
  }
}
