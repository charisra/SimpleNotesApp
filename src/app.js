import React from 'react';
import ReactDom from 'react-dom';
import NoteCard from './notesCard';

const config = {
    apiKey: "AIzaSyBrPXH0r2P8AMIPnyoUUlFaGT68S6GxIa8",
    authDomain: "simplenotesapp-3e574.firebaseapp.com",
    databaseURL: "https://simplenotesapp-3e574.firebaseio.com",
    storageBucket: "simplenotesapp-3e574.appspot.com",
    messagingSenderId: "615545187581"
  };
  firebase.initializeApp(config);

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      notes: [],
      loggedin: false
    }
    this.showSidebar = this.showSidebar.bind(this);
    this.addNote = this.addNote.bind(this);
    this.showCreate = this.showCreate.bind(this);
    this.createUser = this.createUser.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }
componentDidMount() {
  firebase.auth().onAuthStateChanged((user) => {
    if(user) {
      firebase.database().ref(`user/${user.uid}/notes`).on('value', (res) => {
        const userData = res.val();
        console.log(userData);
        const dataArray = [];
        for(let objKey in res.val()) {
          userData[objKey].key = objKey;
          dataArray.push(userData[objKey])
        }
        this.setState({
          notes: dataArray,
          loggedin: true
        })
      });
    } else {
      this.setState({
        loggedin: false
      });
    }
  })
}

  showSidebar(e) {
    e.preventDefault();
    this.sidebar.classList.toggle("show");
  }
  addNote(e) {
    e.preventDefault();
    const note = {
      title: this.noteTitle.value,
      text: this.noteText.value
    };

    const userId = firebase.auth().currentUser.uid;

    const dbRef = firebase.database().ref(`user/${userId}/notes`);
    dbRef.push(note);

    this.noteTitle.value = "";
    this.noteText.value = "";
    this.showSidebar(e);
  }

removeNote(noteId){
  const userId = firebase.auth().currentUser.uid;
  const dbRef = firebase.database().ref(`user/${userId}/notes/${noteId}`);
  dbRef.remove();
}
showCreate(e) {
  e.preventDefault();
  this.overlay.classList.toggle('show');
  this.createUserModal.classList.toggle('show');
}

createUser(e) {
  e.preventDefault();
  //Check Passwords Match
  //If so create user
  const email = this.createEmail.value;
  const password = this.createPassword.value;
  const confirm = this.confirmPassword.value;
  if (password === confirm){
    firebase.auth()
      .createUserWithEmailAndPassword(email,password)
      .then((res) => {
        this.showCreate(e);
      })
      .catch((err) => {
        alert(err.message)
      })
  }else {
    alert("passwords must match");
  }
}
showLogin(e) {
  e.preventDefault();
  this.overlay.classList.toggle('show');
  this.loginModal.classList.toggle('show');
}

loginUser(e) {
  e.preventDefault();
  const email = this.userEmail.value;
  const password = this.userPassword.value;
  firebase.auth()
    .signInWithEmailAndPassword(email,password)
    .then((res) => {
      this.showLogin(e);
    })
    .catch((err) => {
      alert (err.message);
    });
}
logOut() {
  firebase.auth().signOut();
}

renderCards() {
  if(this.state.loggedin) {
    return this.state.notes.map((note,i) => {
      return (
        <NoteCard note={note} key={`note-${i}`} removeNote={this.removeNote}/>
      )
    }).reverse()
  } else {
    return (<h2>Login to add notes</h2>);
  }
}
  render() {
    return (
      <div>
        <header className="mainHeader">
          <h1>Simple Notes App</h1>
          <nav>
            {
              (() => {
                if(this.state.loggedin) {
                  return (
                    <span>
                    <a href="" onClick={this.showSidebar}>Add New Note</a>
                    <a href="" onClick={this.logOut}>Logout</a>
                    </span>
                )
                } else {
                  return (
                    <span>
                    <a href="" onClick={this.showCreate}>Create Account</a>
                    <a href="" onClick={this.showLogin}>Login</a>
                    </span>
                  )
                }
              })()
            }
        </nav>
        </header>
        <div className="overlay" ref={ref => this.overlay = ref}></div>
        <section className="notes">
          {this.renderCards()}
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

          <div className="loginModal modal" ref={ref => this.loginModal = ref}>
            <div className="close" onClick={this.showLogin}>
              <i className="fa fa-times"></i>
            </div>
            <form action="" onSubmit={this.loginUser}>
              <div>
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" ref={ref => this.userEmail = ref}/>
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" ref={ref => this.userPassword = ref }/>
              </div>
              <div>
                <input type="submit" value="Login"/>
              </div>
            </form>
          </div>

          <div className="createUserModal modal" ref={ref => this.createUserModal = ref}>
            <div className="close" onClick={this.showCreate}>
              <i className="fa fa-times"></i>
            </div>
            <form action="" onSubmit={this.createUser}>
              <div>
                <label htmlFor="createEmail">Email:</label>
                <input type="text" name="createEmail" ref={ref => this.createEmail = ref}/>
              </div>
              <div>
                <label htmlFor="createPassword">Password:</label>
                <input type="password" name="createPassword" ref={ref => this.createPassword = ref }/>
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password" name="confirmPasswprd" ref={ref => this.confirmPassword = ref }/>
              </div>
              <div>
                <input type="submit" value="Create"/>
              </div>
            </form>
          </div>
      </div>
    )
  }
}

ReactDom.render(<App/>, document.getElementById('app'));
