import './Container.css';
import React from 'react';


class Container extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="main-menu">
                    <a href="/" className="main-menu-button">My page</a>
                    <a href="/" className="main-menu-button">Messages</a>
                    <a href="/" className="main-menu-button">News</a>
                    <a href="/" className="main-menu-button">Music</a>
                    <a href="/" className="main-menu-button">Photos</a>
                    <a href="/" className="main-menu-button">Videos</a>
                    <a href="/settings" className="main-menu-button">Settings</a>
                </div>
                <div className="main-content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Container;
