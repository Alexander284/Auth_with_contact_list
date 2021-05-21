import React, { Component } from 'react'
import Button from '../../components/navigator/UI/button'

import '../add-user-form/add-user-form.css'

class EditUser extends Component {

  state = {
    currentUser: this.props.currentUser
  }

  onInputChange = event => {
    const {name, value} = event.target
    
    const users = {...this.state.currentUser}
    users[name] = value
    console.log(users)
    
    this.setState({
      currentUser: users
    })
    console.log(this.state.currentUser)
  }

  onSubmitHandler = event => {
    event.preventDefault()

    const {name, surname} = this.state.currentUser
    if (!name || !surname) return

    this.props.updateUser(this.state.currentUser.id, this.state.currentUser)
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
            value={this.state.currentUser.name} 
            onChange={event => this.onInputChange(event)}
          />
          <label htmlFor='surname'>Фамилия</label>
          <input 
            id='surname' 
            type='text' 
            name='surname' 
            value={this.state.currentUser.surname} 
            onChange={event => this.onInputChange(event)}
          />
          <Button 
            type='success'
          >Изменить</Button>
        </form>
      </div>
    )
  }
}

export default EditUser