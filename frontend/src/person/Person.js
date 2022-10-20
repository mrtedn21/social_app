import './Person.css';
import React from 'react';
import { FaComment, FaHeart } from 'react-icons/fa';

import Container from "../Container";


class Person extends React.Component {
    render() {
        return (
            <Container>
                <div className="person-main-data">
                    <img src="https://gitlab.idacloud.ru/uploads/-/system/user/avatar/321/avatar.png?width=400"
                        className="person-avatar"/>
                    <div>
                        <p className="person-name">Bezgin Alexander</p>
                        <p className="person-birth">October 06, 1998</p>
                        <div className="person-main-buttons">
                            <input type="button" className="person-chat-button" value="Open chat"/>
                            <input type="button" className="person-follow-button" value="Follow"/>
                        </div>
                    </div>
                </div>

                <div className="person-content">
                    <div className="person-content-selectors">
                        <input type="button" className="person-content-selector person-content-selector-selected" value="Posts"/>
                        <input type="button" className="person-content-selector" value="Photos"/>
                        <input type="button" className="person-content-selector" value="Videos"/>
                        <input type="button" className="person-content-selector" value="Music"/>
                    </div>

                    <div className="person-post">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta distinctio dolores et explicabo facere inventore ipsum rem reprehenderit tempora? Alias animi aperiam debitis nobis odit, possimus quas quisquam repellendus sunt.
                        <div className="person-post-bottom">
                            <div>
                                <FaComment className="person-comment-icon" />
                                <FaHeart className="person-heart-icon" />
                                <p className="person-like-count">42</p>
                            </div>
                            <p className="person-post-date-time">01.01.2022 18:43</p>
                        </div>
                    </div>

                    <div className="person-post">
                        Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta distinctio dolores et explicabo facere inventore ipsum rem reprehenderit tempora? Alias animi aperiam debitis nobis odit, possimus quas quisquam repellendus sunt.
                        <div className="person-post-bottom">
                            <div>
                                <FaComment className="person-comment-icon" />
                                <FaHeart className="person-heart-icon person-heart-liked" />
                                <p className="person-like-count">13</p>
                            </div>
                            <p className="person-post-date-time">01.01.2022 18:43</p>
                        </div>
                    </div>

                    <div className="person-post">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta distinctio dolores et explicabo facere inventore ipsum rem reprehenderit tempora? Alias animi aperiam debitis nobis odit, possimus quas quisquam repellendus sunt.
                        <div className="person-post-bottom">
                            <div>
                                <FaComment className="person-comment-icon" />
                                <FaHeart className="person-heart-icon" />
                            </div>
                            <p className="person-post-date-time">01.01.2022 18:43</p>
                        </div>
                    </div>

                    <div className="person-post">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta distinctio dolores et explicabo facere inventore ipsum rem reprehenderit tempora? Alias animi aperiam debitis nobis odit, possimus quas quisquam repellendus sunt.
                        <div className="person-post-bottom">
                            <div>
                                <FaComment className="person-comment-icon" />
                                <FaHeart className="person-heart-icon" />
                            </div>
                            <p className="person-post-date-time">01.01.2022 18:43</p>
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}

export default Person;
