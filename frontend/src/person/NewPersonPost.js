import React from 'react';
import {customFetchPost} from "../utils/customFetch";


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
        const request_url = 'http://localhost:8000/api/person_posts/';
        const requestData = {text: this.state.text}

        await customFetchPost({
            url: request_url,
            body: JSON.stringify(requestData),
            callback_with_data: data => window.location.reload(),
            content_type: 'application/json',
        })
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
