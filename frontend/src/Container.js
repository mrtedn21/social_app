import React from 'react';


class Container extends React.Component {
    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <a href="http://localhost:3000/"><img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Twitter-logo.svg" width="30px" alt=""/></a>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item"><a className="nav-link active" href="#">Messages</a></li>
                                <li className="nav-item"><a className="nav-link active" href="#">News</a></li>
                                <li className="nav-item"><a className="nav-link active" href="#">Music</a></li>
                                <li className="nav-item"><a className="nav-link active" href="/groups/">Groups</a></li>
                                <li className="nav-item"><a className="nav-link active" href="/persons">People</a></li>
                                <li className="nav-item"><a className="nav-link active" href="/settings/">Settings</a></li>
                            </ul>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-primary" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    <div className="main-content">
                        {this.props.children}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Container;
