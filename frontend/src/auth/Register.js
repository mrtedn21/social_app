import './Auth.css';
import React from 'react';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            first_name: '',
            last_name: '',
            birth_date: '',
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
        let response = await fetch('http://localhost:8000/api/auth/', {
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
            <div className="auth-container">
                <p>Registration</p>
                <form className="auth-form">
                    <input type="text" placeholder="Email"
                           name="email" onChange={this.inputHandle}/>

                    <input type="text" placeholder="Username"
                           name="username" onChange={this.inputHandle}/>

                    <input type="password" placeholder="Password"
                           name="password" onChange={this.inputHandle}/>

                    <input type="text" placeholder="First name"
                           name="first_name" onChange={this.inputHandle}/>

                    <input type="text" placeholder="Last name"
                           name="last_name" onChange={this.inputHandle}/>

                    <input type="text" placeholder="Birth date"
                           name="birth_date" onChange={this.inputHandle}/>

                    <div>
                        <input type="submit" onClick={this.clickHandle} value="Register"/>
                        or
                        <a href="login">Login</a>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;
