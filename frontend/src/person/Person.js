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
import PersonVideo from "./PersonVideo";
import withRouter from "../WithRouter";
import { customFetchPost, customFetchGet } from "../utils/customFetch";


class Person extends React.Component {
    COOKIE_TAB_NAME = 'cookie_tab'
    TAB_NAMES = [
        {name: 'Posts', partUrl: 'person_posts/'},
        {name: 'Photos', partUrl: 'person_photos/'},
        {name: 'Video', partUrl: 'person_videos/'},
        {name: 'Music', partUrl: 'person_music/'},
    ]

    constructor(props) {
        super(props);

        this.selectHandle = this.selectHandle.bind(this)
        this.updateDataForTab = this.updateDataForTab.bind(this)
        let index = Cookies.get(this.COOKIE_TAB_NAME) || 0
        this.state = {
            person: undefined,
            selectedTabIndex: Number(index),
            Posts: undefined,
            Photos: undefined,
            Video: undefined,
            Music: undefined,
            can_edit: undefined,
        }
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

        await customFetchGet({
            url: tab_request_url,
            callback_with_data: data => this.setState({[selectedTab.name.toLowerCase()]: data.results}),
        })
    }

    async componentDidMount() {
        const person_request_url = 'http://localhost:8000/api/persons/' + this.props.params.pk;
        await customFetchGet({
            url: person_request_url,
            callback_with_data: data => this.setState({person: data}),
        })

        await customFetchGet({
            url: person_request_url + '/can_i_edit',
            callback_with_data: data => this.setState({can_edit: data.result}),
        })

        await this.updateDataForTab()
    }

    async selectHandle(index, lastIndex, event) {
        this.setState({selectedTabIndex: index});
        Cookies.set(this.COOKIE_TAB_NAME, index)

        await this.updateDataForTab(index)
    }

    render() {
        if ((this.state.person === undefined) || (this.state.can_edit === undefined)) {
            return null;
        }

        const tabs = this.TAB_NAMES.map((tab, index) => {
            let className
            if (this.state.selectedTabIndex === index) {
                className = 'nav-link active'
            } else {
                className = 'nav-link'
            }
            let tab_name
            if (tab.name == 'Posts') {tab_name = 'Посты'}
            if (tab.name == 'Photos') {tab_name = 'Фото'}
            if (tab.name == 'Video') {tab_name = 'Видео'}
            if (tab.name == 'Music') {tab_name = 'Музыка'}
            return <Tab className={className} style={{cursor: 'pointer', userSelect: 'none'}}>{tab_name}</Tab>
        })

        return (
            <Container>
                <PersonMainData can_edit={this.state.can_edit} person={this.state.person}/>
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
                                            { this.state.can_edit ? <NewPersonPost /> : null }
                                            <PersonPosts can_edit={this.state.can_edit} posts={this.state.posts}/>
                                        </TabPanel>
                                        <TabPanel>
                                            <PersonPhotos can_edit={this.state.can_edit} photos={this.state.photos}/>
                                        </TabPanel>
                                        <TabPanel>
                                            <PersonVideo can_edit={this.state.can_edit} video={this.state.video}/>
                                        </TabPanel>
                                        <TabPanel>
                                            <PersonMusic can_edit={this.state.can_edit} music={this.state.music}/>
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
