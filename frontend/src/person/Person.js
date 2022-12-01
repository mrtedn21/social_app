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

                    <div className="row" style={{marginTop: '30px'}}>
                        <div className="col-3"></div>
                        <div className="col-6">
                            <div class="card text-center">
                                <div class="card-header">
                                    <ul class="nav nav-tabs card-header-tabs">
                                        <li class="nav-item">
                                            <a class="nav-link active" href="#">Posts</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#">Photos</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link">Videos</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link">Music</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="card-body">


                                    <div class="card" style={{marginTop: '15px', marginBottom: '15px'}}>
                                        <div class="card-body">
                                            <p class="card-text" style={{textAlign: 'left'}}>With supporting text below as a natural lead-in to additional content.</p>
                                            <div className="row">
                                                <div className="col-2" style={{textAlign: 'left'}}>
                                                    <span>3</span>
                                                    <FaHeart style={{marginLeft: '4px'}} />
                                                </div>
                                                <div className="col-6"></div>
                                                <div className="col-4">
                                                    <p className="card-text">04.11.22 10:58</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card" style={{marginTop: '15px', marginBottom: '15px'}}>
                                        <div className="card-body">
                                            <p className="card-text" style={{textAlign: 'left'}}>With supporting text
                                                below as a natural lead-in to additional content.</p>
                                            <div className="row">
                                                <div className="col-2" style={{textAlign: 'left'}}>
                                                    <span>2</span>
                                                    <FaHeart style={{marginLeft: '4px'}}/>
                                                </div>
                                                <div className="col-6"></div>
                                                <div className="col-4">
                                                    <p className="card-text">04.11.22 10:58</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card" style={{marginTop: '15px', marginBottom: '15px'}}>
                                        <div className="card-body">
                                            <p className="card-text" style={{textAlign: 'left'}}>With supporting text
                                                below as a natural lead-in to additional content.</p>
                                            <div className="row">
                                                <div className="col-2" style={{textAlign: 'left'}}>
                                                    <span>1</span>
                                                    <FaHeart style={{marginLeft: '4px'}}/>
                                                </div>
                                                <div className="col-6"></div>
                                                <div className="col-4">
                                                    <p className="card-text">04.11.22 10:58</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-3"></div>
                    </div>

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
                        <TabPanel>
                            <p>vidoses</p>
                        </TabPanel>
                        <TabPanel>
                            <PersonMusic photos={this.state.person.photos}/>
                        </TabPanel>
                    </Tabs>

                </div>
            </Container>
        )
    }
}

export default Person;
