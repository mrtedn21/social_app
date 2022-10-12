import './Auth.css';
import React from 'react';


class RegisterSubmit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {submitText: 'Please, wait...'}
    }

    async componentDidMount() {
        const parameters = window.location.search;
        const url_param = new URLSearchParams(parameters)
        const id = url_param.get('id')

        const request_url = 'http://localhost:8000/api/register/submit/'+ id + '/';
        console.log(request_url)
        await fetch(request_url)
            .then(response => {
                if (response.status == 200) {
                    this.setState({submitText: 'Confirm successful'})
                    return response.json()
                }
                else {
                    this.setState({submitText: 'Invalid link'})
                    return undefined
                }
            })
            .then(data => {if (data !== undefined) {document.cookie = 'token=' + data.token}})
    }

    render() {
        return (
            <div className="auth-container">
                <p>{this.state.submitText}</p>
                <a href="/">Back to main page</a>
            </div>
        )
    }
}

export default RegisterSubmit;
