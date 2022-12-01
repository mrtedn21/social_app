import React from 'react';


class Container extends React.Component {
    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Twitter-logo.svg" width="30px" alt=""/>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item"><a className="nav-link active" aria-current="page" href="#">Messages</a></li>
                                <li className="nav-item"><a className="nav-link active" aria-current="page" href="#">News</a></li>
                                <li className="nav-item"><a className="nav-link active" aria-current="page" href="#">Music</a></li>
                                <li className="nav-item"><a className="nav-link active" aria-current="page" href="#">Photos</a></li>
                                <li className="nav-item"><a className="nav-link active" aria-current="page" href="#">Videos</a></li>
                                <li className="nav-item"><a className="nav-link active" aria-current="page" href="#">Settings</a></li>
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
