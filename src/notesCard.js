import React from 'react';

export default function(props) {
  return (
    <div className="noteCard">
      <i className="fa fa-edit"></i>
      <i className="fa fa-times"></i>
      <h4>{props.note.title}</h4>
      <p>{props.note.text}</p>
    </div>
  )
}
