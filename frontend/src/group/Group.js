import Cookies from 'js-cookie'
import React from 'react';
import { FaHeart } from "react-icons/fa";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Container from "../Container";
import NewGroupPost from "./NewGroupPost";
import GroupMusic from "./GroupMusic";
import GroupPhotos from "./GroupPhotos";
import GroupPosts from "./GroupPosts";
import GroupMainData from "./GroupMainData";
import GroupVideo from "./GroupVideo";
import withRouter from "../WithRouter";


class Group extends React.Component {
    COOKIE_TAB_NAME = 'cookie_tab'
    TAB_NAMES = [
        {name: 'Posts', partUrl: 'group_posts/'},
        {name: 'Photos', partUrl: 'group_photos/'},
        {name: 'Video', partUrl: 'group_videos/'},
        {name: 'Music', partUrl: 'group_music/'},
    ]

    constructor(props) {
        super(props);

        this.selectHandle = this.selectHandle.bind(this)
        this.updateDataForTab = this.updateDataForTab.bind(this)
        let index = Cookies.get(this.COOKIE_TAB_NAME) || 0
        this.state = {group: undefined, selectedTabIndex: Number(index), Posts: undefined, Photos: undefined, Videos: undefined, Music: undefined}
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

        const tab_request_url = 'http://localhost:8000/api/' + selectedTab.partUrl + '?group_slug=' + this.props.params.slug;
        await fetch(tab_request_url)
            .then(response => response.status === 200 ? response.json() : undefined)
            .then(data => {
                this.setState({[selectedTab.name.toLowerCase()]: data.results})
            })
    }

    async componentDidMount() {
        const group_request_url = 'http://localhost:8000/api/groups/' + this.props.params.slug;
        await fetch(group_request_url)
            .then(response => response.status === 200 ? response.json() : undefined)
            .then(data => this.setState({group: data}))

        await this.updateDataForTab()
    }

    async selectHandle(index, lastIndex, event) {
        this.setState({selectedTabIndex: index});
        Cookies.set(this.COOKIE_TAB_NAME, index)

        await this.updateDataForTab(index)
    }

    render() {
        if (this.state.group === undefined) {
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
                <GroupMainData group={this.state.group}/>
                <div className="group-content">

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
                                            <NewGroupPost />
                                            <GroupPosts posts={this.state.posts}/>
                                        </TabPanel>
                                        <TabPanel>
                                            <GroupPhotos photos={this.state.photos}/>
                                        </TabPanel>
                                        <TabPanel>
                                            <GroupVideo video={this.state.video}/>
                                        </TabPanel>
                                        <TabPanel>
                                            <GroupMusic music={this.state.music}/>
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

export default withRouter(Group);
