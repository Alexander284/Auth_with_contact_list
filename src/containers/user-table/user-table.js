import React, { Component } from 'react'
import Button from '../../components/navigator/UI/button'

import './user-table.css'

class UserTable extends Component {

  deleteUserHandler = id => {
    const answer = window.confirm('Вы действительно хотите удалить пользователя?')

    if (answer) {
      this.props.deleteUser(id)
    }
  }

  render() {
    return(
      <table>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Редактирование</th>
        </tr>
      </thead>
      <tbody>
        {
          this.props.users.length > 0 
            ? (this.props.users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.surname}</td>
                  <td>
                    <Button 
                      type='primary'
                      onClick={() => {this.props.editRowsUser(user)}}
                      disabled={this.props.editing === true}
                    >Изменить</Button>
                    <Button 
                      type='danger'
                      onClick={() => this.deleteUserHandler(user.id)}
                      disabled={this.props.editing === true}
                    >Удалить</Button>
                  </td>
                </tr>
              )))
            : <tr>
              <td colSpan={3}>Нет пользователей</td>
            </tr>
        }
      </tbody>
    </table>
    )
  }
}

export default UserTable