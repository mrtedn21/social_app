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

        this.selectHandle = this.selectHandle.bind(this)
        this.state = {person: undefined, selectedTabIndex: undefined}
    }

    async componentDidMount() {
        const request_url = 'http://localhost:8000/api/persons/1/';
        await fetch(request_url)
            .then(response => response.status === 200 ? response.json() : undefined)
            .then(data => this.setState({person: data}))
    }

    selectHandle(index, lastIndex, event) {
        this.setState({selectedTabIndex: index});
    }

    render() {
        if (this.state.person === undefined) {
            return null;
        }

        const posts = this.state.person.posts.map(post => <PersonPost post={post} key={post.pk.toString()}/>)
        const tabNames = ['Posts', 'Photos', 'Videos', 'Music']
        const tabs = tabNames.map((tabName, index) => {
            let className = ''
            if ((this.state.selectedTabIndex === undefined && index === 0) || (this.state.selectedTabIndex === index)) {
                className = 'person-content-selector person-content-selector-selected'
            } else {
                className = 'person-content-selector'
            }
            return <Tab className={className}>{tabName}</Tab>
        })

        return (
            <Container>
                <PersonMainData person={this.state.person}/>
                <div className="person-content">
                    <Tabs onSelect={this.selectHandle}>
                        <TabList className="person-content-selectors">
                            {tabs}
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
