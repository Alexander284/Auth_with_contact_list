import React, { Component } from 'react'
import MenuToggle from '../components/navigator/menu-toggle'
import Draver from '../components/navigator/draver'
import { connect } from 'react-redux'

import './layout.css'

class Layout extends Component {

  state = {
    menu: false
  }

  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu
    })
  }

  menuCloseHandler = () => {
    this.setState({
      menu: false
    })
  }

  render() {
    return (
      <div className='layout'>
        
        <Draver 
          isOpen={this.state.menu}
          onClose={this.menuCloseHandler}
          isAuthenticated={this.props.isAuthenticated}
        />

        <MenuToggle 
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />

        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

export default connect(mapStateToProps)(Layout)