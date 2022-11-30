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
            .then(window.location.reload())
    }

    render() {
        return (
            <div className="person-post-form">
                <textarea onChange={this.inputHandle} name="text" className="person-post-form-input" value={this.state.text} />
                <input type="button" value="Create post" onClick={this.createPost}
                       style={{float: 'right'}} className="person-form-button"/>
            </div>
        )
    }
}

export default PersonPost;
