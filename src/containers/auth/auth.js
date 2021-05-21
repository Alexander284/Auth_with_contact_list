import React, { Component } from 'react'
import Button from '../../components/navigator/UI/button'
import Input from '../../components/navigator/UI/input'
import auth from '../../store/actions/auth'
import { connect } from 'react-redux'

import './auth.css'

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase())
}

class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  validateControl(value, validation) {
    if (!validation) {
      return true
    }

    const {required, email, minLength} = validation
    let isValid = true

    if (required) {
      isValid = value.trim() !== '' && isValid
    }

    if (email) {
      isValid = validateEmail(value) && isValid
    }

    if (minLength) {
      isValid = value.length >= minLength && isValid
    }

    return isValid
  }

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    )
  }

  registerHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    )
  }

  submitHandler = event => {
    event.preventDefault()
  }

  onChangeHandler = (event, controlName) => {
    const formControls = {...this.state.formControls}
    const control = {...formControls[controlName]}

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      formControls, 
      isFormValid
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const {type, value, valid, touched, label, errorMessage, validation} = this.state.formControls[controlName]     
      
      return (
        <Input 
          key={controlName + index}
          type={type}
          value={value}
          valid={valid}
          touched={touched}
          label={label}
          shouldValidate={!!validation}
          errorMessage={errorMessage}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  render() {
    return (
      <div className='auth'>
        <div>
          <h1>Авторизация</h1>

          <form 
            onSubmit={this.submitHandler} 
            className='auth__form'
          >
            {this.renderInputs()}

            <Button 
              type='success' 
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >Войти
            </Button>
            <Button 
              type='primary' 
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(
      auth(email, password, isLogin)
    )
  }
}

export default connect(null, mapDispatchToProps)(Auth)