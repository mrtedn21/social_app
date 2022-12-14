import './Auth.css';
import React from 'react';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }

        this.inputHandle = this.inputHandle.bind(this)
        this.clickHandle = this.clickHandle.bind(this)
    }

    inputHandle(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async clickHandle(event) {
        event.preventDefault()
        await fetch('http://localhost:8000/api/auth/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
        })
            .then(response => response.json())
            .then(data => document.cookie = 'token=' + data.token)
    }

    render() {
        return (
            <div>
                <p className="auth-header">Authorization page</p>
                <form className="auth-form">
                    <input type="text" placeholder="Username" className="auth-form-input"
                           name="username" onChange={this.inputHandle}/>

                    <input type="password" placeholder="Password" className="auth-form-input"
                           name="password" onChange={this.inputHandle}/>

                    <div>
                        <input type="submit" onClick={this.clickHandle}
                               value="Login" className="auth-form-button"/>
                        or
                        <a href="register" className="auth-form-button">Register</a>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;
