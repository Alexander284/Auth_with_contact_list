import React from 'react';

import './back-drop.css'

const BackDrop = props => {
  return (
    <div 
      className='back__drop'
      onClick={props.onClick}
    />
  )
}

export default BackDrop