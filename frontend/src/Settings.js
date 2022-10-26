import React from 'react';

import './Settings.css';
import Container from "./Container";


class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initial_settings: undefined,
            concrete_settings: undefined,

            first_name: undefined,
            last_name: undefined,
            gender: undefined,
            languages: undefined,
            country: undefined,
            city: undefined,
            avatar: undefined,
        }

        this.inputHandle = this.inputHandle.bind(this)
        this.updateSettings = this.updateSettings.bind(this)
        this.updateAvatar = this.updateAvatar.bind(this)
    }

    async componentDidMount() {
        let request_url = 'http://localhost:8000/api/person_settings';
        await fetch(request_url)
            .then(response => response.json())
            .then(data => this.setState({initial_settings: data}))

        request_url = 'http://localhost:8000/api/persons/1/';
        await fetch(request_url)
            .then(response => response.json())
            .then(data => this.setState({concrete_settings: data}))
    }

    inputHandle(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    updateAvatar(event) {
        const file = event.target.files[0]
        this.setState({avatar: file})
        let avatar_image_element = document.getElementById('person-avatar')
        avatar_image_element.src = URL.createObjectURL(file)
    }

    async updateSettings() {
        const request_url = 'http://localhost:8000/api/persons/1/';

        const formData = new FormData();
        if (this.state.avatar) {formData.append("avatar", this.state.avatar)}
        if (this.state.first_name) {formData.append('first_name', this.state.first_name)}
        if (this.state.last_name) {formData.append('last_name', this.state.last_name)}
        if (this.state.gender) {formData.append('gender', this.state.gender)}
        if (this.state.country) {formData.append('country', this.state.country)}
        if (this.state.city) {formData.append('city', this.state.city)}
        if (this.state.languages) {formData.append('languages', this.state.languages)}

        await fetch(request_url, {
            method: 'PATCH',
            body: formData,
        })
            .then(response => {
                if (response.status === 200) {
                        alert('data updated!');
                        window.location.reload();
                    }
            })
    }

    render() {
        if (!this.state.initial_settings || !this.state.concrete_settings) {
            return null;
        }
        const languages_pks = this.state.concrete_settings.languages.map(language => language.pk);
        const cities = this.state.initial_settings.countries.filter(country => country.pk.toString() === this.state.concrete_settings.city.country_pk)[0].cities
        return (
            <Container>
                <div>
                    <div className="settings-parameter-block">
                        <div className="settings-image-block">
                            <p className="settings-parameter-label">Avatar</p>
                            <input type="file" className="settings-parameter-input" style={{width: '383px'}} name="avatar" onChange={this.updateAvatar}/>
                            <img src={this.state.concrete_settings.avatar_thumbnail} id="person-avatar"
                                 alt="Avatar" style={{width: '200px', marginBottom: '10px', borderRadius: '10px'}}/>
                        </div>
                    </div>
                    <div className="settings-parameter-block">
                        <div style={{width: '180px', marginRight: '13px'}}>
                            <p className="settings-parameter-label">First name</p>
                            <input type="text" value={this.state.first_name} defaultValue={this.state.concrete_settings.first_name} className="settings-parameter-input"
                                   style={{width: '100%', maxWidth: '100%'}} name="first_name" onChange={this.inputHandle}/>
                        </div>
                        <div style={{width: '180px'}}>
                            <p className="settings-parameter-label">Last name</p>
                            <input type="text" value={this.state.last_name} defaultValue={this.state.concrete_settings.last_name} className="settings-parameter-input"
                                   style={{width: '100%', maxWidth: '100%'}} name="last_name" onChange={this.inputHandle}/>
                        </div>
                    </div>
                    <div className="settings-parameter-block">
                        <div style={{width: '395px'}}>
                            <p className="settings-parameter-label">Gender</p>
                            <select className="settings-parameter-input" style={{width: '100%', maxWidth: '100%'}}
                                    value={this.state.gender} defaultValue={this.state.concrete_settings.gender.pk} name="gender" onChange={this.inputHandle}>
                                {this.state.initial_settings.genders.map(
                                    gender => <option key={gender.pk.toString()}
                                                        value={gender.pk}>{gender.name}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="settings-parameter-block">
                        <div style={{width: '192px'}}>
                            <p className="settings-parameter-label">Country</p>
                            <select className="settings-parameter-input" style={{width: '100%', maxWidth: '100%'}}
                                    value={this.state.country} defaultValue={this.state.concrete_settings.city.country_pk} name="country" onChange={this.inputHandle}>
                                {this.state.initial_settings.countries.map(
                                    country => <option key={country.pk.toString()}
                                                        value={country.pk}>{country.name}</option>
                                )}
                            </select>
                        </div>
                        <div style={{width: '192px'}}>
                            <p className="settings-parameter-label">City</p>
                            <select className="settings-parameter-input" style={{width: '100%', maxWidth: '100%'}}
                                    defaultValue={this.state.city || this.state.concrete_settings.city.pk} name="city" onChange={this.inputHandle}>
                                {cities.map(
                                    city => <option key={city.pk.toString()}
                                                        value={city.pk}>{city.name}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="settings-parameter-block">
                        <div style={{width: '395px'}}>
                            <p className="settings-parameter-label">Language</p>
                            <select className="settings-parameter-input" style={{width: '100%', maxWidth: '100%'}}
                                    value={this.state.languages} multiple={true} defaultValue={languages_pks} name="languages" onChange={this.inputHandle}>
                                {this.state.initial_settings.languages.map(
                                    language => <option key={language.pk.toString()}
                                                        value={language.pk}>{language.name}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="settings-parameter-block">
                        <input type="button" value="Save settings" className="settings-parameter-button" onClick={this.updateSettings}/>
                    </div>
                </div>
            </Container>
        )
    }
}

export default Settings;
