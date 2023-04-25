import React from 'react';
import Container from "./Container";
import withRouter from "./WithRouter";


class Chat extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Container>
                <class className="row">
                    <div className="col-1"></div>
                    <div className="col-2">
                        list of persons
                    </div>
                    <div className="col-7">
                        <div className="card" id="chat1" style={{borderRadius: '15px'}}>
                            <div className="card-body">

                                <div className="d-flex flex-row justify-content-start mb-2">
                                    <div className="p-3" style={{borderRadius: '15px', backgroundColor: '#f0f2ff'}}>
                                        <p className="small mb-0">Hello and thank you for. Please click the video below.</p>
                                    </div>
                                </div>

                                <div className="d-flex flex-row justify-content-end mb-2">
                                    <div className="p-3" style={{borderRadius: '15px', backgroundColor: '#f6f6f6'}} >
                                        <p className="small mb-0">Hello and click the video below.</p>
                                    </div>
                                </div>

                                <div className="d-flex flex-row justify-content-start mb-2">
                                    <div className="p-3" style={{borderRadius: '15px', backgroundColor: '#f0f2ff'}}>
                                        <p className="small mb-0">Hello and for visiting MDBootstrap. Please click the video below.</p>
                                    </div>
                                </div>

                                <div className="d-flex flex-row justify-content-end mb-2">
                                    <div className="p-3" style={{borderRadius: '15px', backgroundColor: '#f6f6f6'}} >
                                        <p className="small mb-0">Hello and thank you for visiting MDBootstrap. Please click the video below.</p>
                                    </div>
                                </div>

                                <div className="form-outline">
                                    <textarea className="form-control" id="textAreaExample" rows="2" />
                                </div>

                          </div>
                        </div>
                        <div className="col-2"></div>
                    </div>
                </class>
            </Container>
        )
    }
}

export default withRouter(Chat);
