import React, { Component } from 'react'
import UserTable from '../user-table'
import AddUserForm from '../add-user-form'
import EditUser from '../edit-user'

import './contact-list.css'

export default class ContactList extends Component {

  state = {
    usersData: [
      {id: 1, name: 'Брюс', surname: 'Уиллис'},
      {id: 2 , name: 'Морган', surname: 'Фримен'}
    ],
    editing: false,
    currentUser: {id: null, name: '', surname: ''}
  }

  addUser = user => {
    const users = this.state.usersData
    user.id = users.length + 1

    const usersData = [...this.state.usersData]
    usersData.push(user)
    
    this.setState({
      usersData
    })
  }

  deleteUser = id => {
    let usersData = this.state.usersData
    usersData = usersData.filter(user => user.id !== id)
    
    this.setState({
      usersData
    })
  }

  updateUser = (id, upUser) => {
    let updateUser = [...this.state.usersData]
    updateUser = updateUser.filter(user => user.id !== id)
    updateUser.push(upUser)
    
    this.setState({
      editing: false,
      usersData: updateUser
    })
  }

  editRowsUser = (user) => {
    const currentUser = {id: user.id, name: user.name, surname: user.surname}

    this.setState({
      editing: true,
      currentUser
    })
  }

  renderAddForm() {
    return (
      <div>
        <h2>Добавить пользователя</h2>
        <AddUserForm 
          addUser={this.addUser}
          users={this.state.usersData}  
        />
      </div>
    )
  }

  renderEditForm() {
    const {editing, usersData, currentUser} = this.state
    return (
      <div>
        <h2>Изменить пользователя</h2>
        <EditUser 
          editing={editing}
          addUser={this.addUser}
          users={usersData}
          updateUser={this.updateUser} 
          currentUser={currentUser} 
        />
      </div>
    )
  }
  
  render() {
    return (
      <div className='contact__list'>
        <h1>Список пользователей</h1>
          <div>
            <div>
              <h2>Пользователи</h2>
              <UserTable 
                users={this.state.usersData}
                deleteUser={this.deleteUser}
                editRowsUser={this.editRowsUser}
                editing={this.state.editing}
              />
            </div>
            {
              this.state.editing 
                ? this.renderEditForm()
                : this.renderAddForm() 
            }
            
          </div>
      </div>
    )
  }
}