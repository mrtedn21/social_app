import './Person.css';
import React from 'react';

import Container from "../Container";
import NewPersonPost from "./NewPersonPost";
import PersonPost from "./PersonPost";
import PersonMainData from "./PersonMainData";


class Person extends React.Component {
    constructor(props) {
        super(props);

        this.state = {person: undefined}
    }

    async componentDidMount() {
        const request_url = 'http://localhost:8000/api/persons/1/';
        await fetch(request_url)
            .then(response => response.status === 200 ? response.json() : undefined)
            .then(data => this.setState({person: data}))
    }

    render() {
        if (this.state.person === undefined) {
            return null;
        }
        else {
            const posts = this.state.person.posts.map(post => <PersonPost post={post} key={post.pk.toString()}/>)
            return (
                <Container>
                    <PersonMainData person={this.state.person}/>
                    <div className="person-content">
                        <div className="person-content-selectors">
                            <input type="button" className="person-content-selector person-content-selector-selected" value="Posts"/>
                            <input type="button" className="person-content-selector" value="Photos"/>
                            <input type="button" className="person-content-selector" value="Videos"/>
                            <input type="button" className="person-content-selector" value="Music"/>
                        </div>
                        <NewPersonPost />
                        {posts}
                    </div>
                </Container>
            )
        }
    }
}

export default Person;
