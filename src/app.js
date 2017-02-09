import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <header className="mainHeader">
          <h1>Noted</h1>
          <nav>
            <a href="">Add New Note</a>
          </nav>
        </header>
        <section className="notes">
          <div className="noteCard">
            <i className="fa fa-edit"></i>
            <i className="fa fa-times"></i>
            <h4>Test note!</h4>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </div>
        </section>
        <aside className="sidebar">
          <form>
            <h3>Add New Note</h3>
            <div className="close-btn">
              <i className="fa fa-times"></i>
            </div>
            <label htmlFor="note-title">Title:</label>
            <input type="text" name="note-title"/>
            <label htmlFor="note-text"></label>
            <textarea name="" id=""></textarea>
            <input type="submit" value="Add New Note"/>
          </form>
          </aside>
      </div>
    )
  }
}

ReactDom.render(<App/>, document.getElementById('app'));
