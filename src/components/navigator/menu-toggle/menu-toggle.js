import React from 'react'

import './menu-toggle.css'

const MenuToggle = props => {
  const classes = [
    'menu__toggle',
    'fa'
  ]

  if (props.isOpen) {
    classes.push('fa-times')
    classes.push('open')
  } else {
    classes.push('fa-bars')
  }
  
  return (
    <i 
      className={classes.join(' ')}
      onClick={props.onToggle}
    />
  )
}

export default MenuToggle