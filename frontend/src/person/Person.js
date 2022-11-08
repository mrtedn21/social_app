import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import './Person.css';
import Container from "../Container";
import NewPersonPost from "./NewPersonPost";
import PersonPhoto from "./PersonPhoto";
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

        const posts = this.state.person.posts.map(post => <PersonPost post={post} key={post.pk.toString()}/>)
        return (
            <Container>
                <PersonMainData person={this.state.person}/>
                <div className="person-content">
                    <Tabs defaultIndex={0}>
                        <TabList className="person-content-selectors">
                            <Tab className="person-content-selector">Posts</Tab>
                            <Tab className="person-content-selector">Photos</Tab>
                            <Tab className="person-content-selector">Videos</Tab>
                            <Tab className="person-content-selector">Music</Tab>
                        </TabList>

                        <TabPanel>
                            <NewPersonPost />
                            {posts}
                        </TabPanel>
                        <TabPanel>
                            <PersonPhoto photos={this.state.person.photos}/>
                        </TabPanel>
                    </Tabs>
                </div>
            </Container>
        )
    }
}

export default Person;
