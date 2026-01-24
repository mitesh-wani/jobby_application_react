import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  // Handle input changes
  handleUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  handlePasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  // Handle form submission
  handleSubmit = async event => {
    event.preventDefault() // Prevent default browser page refresh
    const {username, password} = this.state
    console.log('Form submitted:', {username, password})
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({errorMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, errorMsg} = this.state
    console.log('err')
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <img
            className="logo-img-login"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div className="login-card">
            <label htmlFor="username">Username:</label>
            <br />
            <input
              type="text"
              id="username"
              value={username}
              placeholder="USERNAME"
              onChange={this.handleUsernameChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <br />
            <input
              type="password"
              id="password"
              value={password}
              placeholder="PASSWORD"
              onChange={this.handlePasswordChange}
              required
            />
          </div>
          <button type="submit">Login</button>
          {errorMsg !== '' && <p className="alert-text">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
