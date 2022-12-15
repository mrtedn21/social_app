import React from 'react';


class PersonPost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {text: ''}
        this.inputHandle = this.inputHandle.bind(this)
        this.createPost = this.createPost.bind(this)
    }

    inputHandle(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async createPost() {
        const request_url = 'http://localhost:8000/api/posts/';
        const requestData = {text: this.state.text}

        const regExp = /token=(\w{40})/g;
        const token = regExp.exec(document.cookie)[1]

        await fetch(request_url, {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
            },
        })
            .then(response => response.json())
            .then(data => window.location.reload())
    }

    render() {
        return (
            <form>
                <textarea name="text" onChange={this.inputHandle} value={this.state.text} style={{marginBottom: '5px'}} className="form-control" aria-label="With textarea" />
                <div style={{textAlign: 'left'}}>
                    <input type="button" className="btn btn-primary" onClick={this.createPost} value="Add post" />
                </div>
            </form>
        )
    }
}

export default PersonPost;
