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

                                      <div className="d-flex flex-row justify-content-start mb-4">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                          alt="avatar 1" width="45px" height='100%' />
                                        <div className="p-3 ms-3" style={{borderRadius: '15px', backgroundColor: 'rgba(57, 192, 237,.2)'}}>
                                          <p className="small mb-0">Hello and thank you for visiting MDBootstrap. Please click the video
                                            below.</p>
                                        </div>
                                      </div>

                                      <div className="d-flex flex-row justify-content-end mb-4">
                                        <div className="p-3 me-3 border" style={{borderRadius: '15px', backgroundColor: '#fbfbfb'}} >
                                          <p className="small mb-0">Thank you, I really like your product.</p>
                                        </div>
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                          alt="avatar 1" width='45px' height='100%;' />
                                      </div>

                                      <div className="d-flex flex-row justify-content-start mb-4">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                          alt="avatar 1" width='45px' height='100%' />
                                        <div className="ms-3" style={{borderRadius: '15px'}}>
                                          <div className="bg-image">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/screenshot1.webp"
                                              style={{borderRadius: '15px'}} />
                                            <a href="#">
                                              <div className="mask"></div>
                                            </a>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="d-flex flex-row justify-content-start mb-4">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                          alt="avatar 1" width='45px' height='100%' />
                                        <div className="p-3 ms-3" style={{borderRadius: '15px', backgroundColor: 'rgba(57, 192, 237,.2)'}}>
                                          <p className="small mb-0">Look what interesting i found</p>
                                        </div>
                                      </div>

                                      <div className="form-outline">
                                        <textarea className="form-control" id="textAreaExample" rows="4" />
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
