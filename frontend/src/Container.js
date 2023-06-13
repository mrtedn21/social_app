import React from 'react';
import {customFetchGet} from "./utils/customFetch";
import Cookies from "js-cookie";


class Container extends React.Component {
    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <a href="http://90.189.172.136:3000/"><img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Twitter-logo.svg" width="30px" alt=""/></a>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item"><a className="nav-link active" href={'/persons/' + Cookies.get('person_pk')}>Моя страница</a></li>
                                <li className="nav-item"><a className="nav-link active" href="/chat">Сообщения</a></li>
                                <li className="nav-item"><a className="nav-link active" href="/music/">Музыка</a></li>
                                <li className="nav-item"><a className="nav-link active" href="/groups/">Группы</a></li>
                                <li className="nav-item"><a className="nav-link active" href="/persons">Люди</a></li>
                                <li className="nav-item"><a className="nav-link active" href="/settings/">Настройки профиля</a></li>
                            </ul>
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
