import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import BackDrop from '../UI/back-drop'

import './draver.css'

class Draver extends Component {
  
  clickHandler = () => {
    this.props.onClose()
  }

  renderLinks(links) {
    return links.map((link, index) => {
      return(
        <li key={index}>
          <NavLink
            to={link.to}
            exect={link.exect}
            activeClassName={'active'}
            onClick={this.clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    const classes = [
      'draver'
    ]

    if (!this.props.isOpen) {
      classes.push('close')
    }

    const links = [
      {to: '/', label: 'Главная', exact: true}      
    ]

    if (this.props.isAuthenticated) {
      links.push({to: '/contact-list', label: 'Пользователи', exact: false})
      links.push({to: '/logout', label: 'Выйти', exact: false})
    } else {
      links.push({to: '/auth', label: 'Авторизация', exact: false})
    }

    return (
      <>
        <nav className={classes.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>
        {this.props.isOpen ? <BackDrop onClick={this.props.onClose}/> : null }
      </>
    )
  }
}

export default Draver