import React, { Component } from 'react'
import Button from '../../components/navigator/UI/button'

import './add-user-form.css'


class AddUserForm extends Component {

  state = {
    initialUser: {id: null, name: '', surname: ''}
  }

  onInputChange = event => {
    const {name, value} = event.currentTarget

    const users = { ...this.state.initialUser}
    users[name] = value

    this.setState({
      initialUser: users
    })
  }

  onSubmitHandler = event => {
    event.preventDefault()

    const {name, surname} = this.state.initialUser
    if (!name || !surname) return

    this.props.addUser(this.state.initialUser)

    this.setState({
      initialUser: {id: null, name: '', surname: ''}
    })
  }
  
  render() {

    return(
      <div className='add__user__form'>
        <form onSubmit={this.onSubmitHandler}>
          <label htmlFor='name'>Имя</label>
          <input 
            id='name' 
            type='text' 
            name='name' 
            value={this.state.initialUser.name} 
            onChange={event => this.onInputChange(event)}
          />
          <label htmlFor='surname'>Фамилия</label>
          <input 
            id='surname' 
            type='text' 
            name='surname' 
            value={this.state.initialUser.surname} 
            onChange={event => this.onInputChange(event)}
          />
          <Button type='success'>Добавить</Button>
        </form>
      </div>
    )
  }
}

export default AddUserForm