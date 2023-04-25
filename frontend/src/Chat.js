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
                <class className="row" style={{paddingTop: '20px'}}>
                    <div className="col-1"></div>
                    <div className="col-3">
                        <div className="card" id="chat1" style={{borderRadius: '15px', marginBottom: '10px'}}>
                            <div className="card-body" style={{padding: '12px'}}>
                                <div style={{display: 'flex'}}>
                                    <img height="60px" style={{display: 'inline-block'}} className="rounded" src="https://social-bucket-mrtedn.storage.yandexcloud.net/social-bucket-mrtedn/CACHE/images/person_avatars/oslo/dabb3f2f563b7dd09dbf9bbce09fb982.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJENz7a58AelGO9p87eZn75%2F20230425%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230425T052828Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=ba49b224f975c9fe199a16ed8d0fe08735a7b4b1d44fb3894fbc08cd63e5030f" alt=""/>
                                    <div style={{marginLeft: '9px'}}>
                                        <p style={{marginBottom: '5px', fontWeight: '500'}}>Martin Eden</p>
                                        <p style={{marginBottom: '5px', fontWeight: '300'}}>I wrote bla bla</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card" id="chat1" style={{borderRadius: '15px', marginBottom: '10px'}}>
                            <div className="card-body" style={{padding: '12px'}}>
                                <div style={{display: 'flex'}}>
                                    <img height="60px" style={{display: 'inline-block'}} className="rounded" src="https://social-bucket-mrtedn.storage.yandexcloud.net/social-bucket-mrtedn/CACHE/images/person_avatars/9429fa1e-2152-457b-9138-ab4d32fa0b51/3572ba5eca422b7e2e95d82ae6ae8c3f.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJENz7a58AelGO9p87eZn75%2F20230425%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230425T062851Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=89127c636b831b18ddc3ddc60f46e696d7d025e64eae3eeb8d87f91d26e0c777" alt=""/>
                                    <div style={{marginLeft: '9px'}}>
                                        <p style={{marginBottom: '5px', fontWeight: '500'}}>Cheza</p>
                                        <p style={{marginBottom: '5px', fontWeight: '300'}}>I wrote bla bla</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="card" id="chat1" style={{borderRadius: '15px', marginBottom: '10px'}}>
                            <div className="card-body" style={{padding: '12px'}}>
                                <div style={{display: 'flex'}}>
                                    <img height="60px" style={{display: 'inline-block'}} className="rounded" src="https://social-bucket-mrtedn.storage.yandexcloud.net/social-bucket-mrtedn/CACHE/images/person_avatars/oslo/dabb3f2f563b7dd09dbf9bbce09fb982.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJENz7a58AelGO9p87eZn75%2F20230425%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230425T052828Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=ba49b224f975c9fe199a16ed8d0fe08735a7b4b1d44fb3894fbc08cd63e5030f" alt=""/>
                                    <div style={{marginLeft: '9px'}}>
                                        <p style={{marginBottom: '5px', fontWeight: '500'}}>Salam</p>
                                        <p style={{marginBottom: '5px', fontWeight: '300'}}>I wrote bla bla</p>
                                    </div>
                                </div>
                            </div>
                        </div>


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
