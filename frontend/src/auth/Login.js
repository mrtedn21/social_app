import React from 'react';
import Container from "../Container";
import Cookies from "js-cookie";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
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
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
                else {
                    this.setState({error: 'Incorrect username or password'})
                }
            })
            .then(data => {
                Cookies.set('token', data.token)
                Cookies.set('person_pk', data.person_pk)
                window.location.href = '/persons/' + data.person_pk + '/'
            })
    }

    render() {
        return (
            <Container>
                <div className="row" style={{marginTop: '15px'}}>
                    <div className="col-4"></div>
                    <div className="col-3">
                        <h2 className="h2">Authorization page</h2>
                        { this.state.error === '' ? null : <p style={{color: 'red'}}>{this.state.error}</p>}

                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Username</label>
                            <input type="username" name="username" className="form-control" id="exampleFormControlInput1" onChange={this.inputHandle}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password_id" className="form-label">Password</label>
                            <input type="password" name="password" className="form-control" id="password_id" onChange={this.inputHandle}/>
                        </div>

                        <div style={{display: 'flex', justifyContent: 'space-around'}}>
                            <input type="submit" onClick={this.clickHandle} value="Login" className="btn btn-primary" />
                            <a href="register" className="btn btn-primary" >Register</a>
                        </div>
                    </div>
                    <div className="col-5"></div>
                </div>
            </Container>
        )
    }
}

export default Login;
