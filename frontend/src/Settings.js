import React from 'react';

import './Settings.css';
import Container from "./Container";


class Settings extends React.Component {
    render() {
        return (
            <Container>
                <div>
                    <div className="settings-parameter-block">
                        <div className="settings-image-block">
                            <p className="settings-parameter-label">Avatar</p>
                            <input type="file" className="settings-parameter-input" style={{width: '383px'}}/>
                            <img src="https://gitlab.idacloud.ru/uploads/-/system/user/avatar/321/avatar.png?width=400"
                                 alt="Avatar" style={{width: '200px', marginBottom: '10px', borderRadius: '10px'}}/>
                        </div>
                    </div>
                    <div className="settings-parameter-block">
                        <div style={{width: '180px', marginRight: '13px'}}>
                            <p className="settings-parameter-label">First name</p>
                            <input type="text" value="Martin" className="settings-parameter-input"
                                   style={{width: '100%', maxWidth: '100%'}}/>
                        </div>
                        <div style={{width: '180px'}}>
                            <p className="settings-parameter-label">Last name</p>
                            <input type="text" value="Eden" className="settings-parameter-input"
                                   style={{width: '100%', maxWidth: '100%'}}/>
                        </div>
                    </div>
                    <div className="settings-parameter-block">
                        <div style={{width: '395px'}}>
                            <p className="settings-parameter-label">Gender</p>
                            <select className="settings-parameter-input" style={{width: '100%', maxWidth: '100%'}}>
                                <option className="settings-parameter-input" value="kek">kek</option>
                                <option className="settings-parameter-input" value="lol">lol</option>
                            </select>
                        </div>
                    </div>
                    <div className="settings-parameter-block">
                        <div style={{width: '192px'}}>
                            <p className="settings-parameter-label">Gender</p>
                            <select className="settings-parameter-input" style={{width: '100%', maxWidth: '100%'}}>
                                <option className="settings-parameter-input" value="Norway">Norway</option>
                                <option className="settings-parameter-input" value="rashka">rashka</option>
                            </select>
                        </div>
                        <div style={{width: '192px'}}>
                            <p className="settings-parameter-label">City</p>
                            <select className="settings-parameter-input" style={{width: '100%', maxWidth: '100%'}}>
                                <option className="settings-parameter-input" value="Berdsk">Berdsk</option>
                                <option className="settings-parameter-input" value="ASDF">ASDF</option>
                            </select>
                        </div>
                    </div>
                    <div className="settings-parameter-block">
                        <div style={{width: '395px'}}>
                            <p className="settings-parameter-label">Language</p>
                            <select className="settings-parameter-input" style={{width: '100%', maxWidth: '100%'}} multiple>
                                <option className="settings-parameter-input" value="norsk">norsk</option>
                                <option className="settings-parameter-input" value="ruzkye">ruzkye</option>
                                <option className="settings-parameter-input" value="ruzkye">ruzkye</option>
                                <option className="settings-parameter-input" value="ruzkye">ruzkye</option>
                                <option className="settings-parameter-input" value="ruzkye">ruzkye</option>
                                <option className="settings-parameter-input" value="ruzkye">ruzkye</option>
                                <option className="settings-parameter-input" value="ruzkye">ruzkye</option>
                                <option className="settings-parameter-input" value="ruzkye">ruzkye</option>
                                <option className="settings-parameter-input" value="ruzkye">ruzkye</option>
                            </select>
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}

export default Settings;
