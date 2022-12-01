import React from 'react';
import { FaHeart } from "react-icons/fa";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Container from "../Container";
import NewPersonPost from "./NewPersonPost";
import PersonMusic from "./PersonMusic";
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
                className = 'nav-link active'
            } else {
                className = 'nav-link'
            }
            return <Tab className={className} style={{cursor: 'pointer', userSelect: 'none'}}>{tabName}</Tab>
        })

        return (
            <Container>
                <PersonMainData person={this.state.person}/>
                <div className="person-content">

                    <div className="row" style={{marginTop: '30px'}}>
                        <div className="col-3"></div>
                        <div className="col-6">
                            <Tabs onSelect={this.selectHandle}>
                                <div className="card text-center">
                                    <TabList className="card-header">
                                        <ul className="nav nav-tabs card-header-tabs">
                                            {tabs}
                                        </ul>
                                    </TabList>
                                    <div className="card-body">
                                        <TabPanel>
                                            <NewPersonPost />
                                            {posts}
                                        </TabPanel>
                                        <TabPanel>
                                            <PersonPhoto photos={this.state.person.photos}/>
                                        </TabPanel>
                                        <TabPanel>
                                            <p>videos</p>
                                        </TabPanel>
                                        <TabPanel>
                                            <PersonMusic photos={this.state.person.photos}/>
                                        </TabPanel>

                                    </div>
                                </div>
                            </Tabs>
                        </div>
                        <div className="col-3"></div>
                    </div>
                </div>
            </Container>
        )
    }
}

export default Person;
