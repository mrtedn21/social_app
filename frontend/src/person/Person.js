import Cookies from 'js-cookie'
import React from 'react';
import { FaHeart } from "react-icons/fa";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Container from "../Container";
import NewPersonPost from "./NewPersonPost";
import PersonMusic from "./PersonMusic";
import PersonPhotos from "./PersonPhotos";
import PersonPosts from "./PersonPosts";
import PersonMainData from "./PersonMainData";
import withRouter from "../WithRouter";


class Person extends React.Component {
    COOKIE_TAB_NAME = 'cookie_tab'
    TAB_NAMES = [
        {name: 'Posts', partUrl: 'person_posts/'},
        {name: 'Photos', partUrl: 'person_photos/'},
        {name: 'Videos', partUrl: 'person_videos/'},
        {name: 'Music', partUrl: 'person_music/'},
    ]

    constructor(props) {
        super(props);

        this.selectHandle = this.selectHandle.bind(this)
        this.updateDataForTab = this.updateDataForTab.bind(this)
        let index = Cookies.get(this.COOKIE_TAB_NAME) || 0
        this.state = {person: undefined, selectedTabIndex: Number(index), Posts: undefined, Photos: undefined, Videos: undefined, Music: undefined}
    }

    async updateDataForTab(index) {
        let resultIndex = this.state.selectedTabIndex
        if (index !== undefined) {
            resultIndex = index;
        }
        const selectedTab = this.TAB_NAMES[resultIndex]


        if (this.state[selectedTab.name] !== undefined) {
            return;
        }

        const tab_request_url = 'http://localhost:8000/api/' + selectedTab.partUrl + '?person_id=' + this.props.params.pk;
        await fetch(tab_request_url)
            .then(response => response.status === 200 ? response.json() : undefined)
            .then(data => {
                this.setState({[selectedTab.name.toLowerCase()]: data.results})
            })
    }

    async componentDidMount() {
        const person_request_url = 'http://localhost:8000/api/persons/' + this.props.params.pk;
        await fetch(person_request_url)
            .then(response => response.status === 200 ? response.json() : undefined)
            .then(data => this.setState({person: data}))

        await this.updateDataForTab()
    }

    async selectHandle(index, lastIndex, event) {
        this.setState({selectedTabIndex: index});
        Cookies.set(this.COOKIE_TAB_NAME, index)

        await this.updateDataForTab(index)
    }

    render() {
        if (this.state.person === undefined) {
            return null;
        }
        console.log(this.state)

        const tabs = this.TAB_NAMES.map((tab, index) => {
            let className
            if (this.state.selectedTabIndex === index) {
                className = 'nav-link active'
            } else {
                className = 'nav-link'
            }
            return <Tab className={className} style={{cursor: 'pointer', userSelect: 'none'}}>{tab.name}</Tab>
        })

        return (
            <Container>
                <PersonMainData person={this.state.person}/>
                <div className="person-content">

                    <div className="row" style={{marginTop: '30px'}}>
                        <div className="col-3"></div>
                        <div className="col-6">
                            <Tabs onSelect={this.selectHandle} defaultIndex={this.state.selectedTabIndex}>
                                <div className="card text-center">
                                    <TabList className="card-header">
                                        <ul className="nav nav-tabs card-header-tabs">
                                            {tabs}
                                        </ul>
                                    </TabList>
                                    <div className="card-body">
                                        <TabPanel>
                                            <NewPersonPost />
                                            <PersonPosts posts={this.state.posts}/>
                                        </TabPanel>
                                        <TabPanel>
                                            <PersonPhotos photos={this.state.photos}/>
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

export default withRouter(Person);
