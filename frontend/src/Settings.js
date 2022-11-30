import React from 'react';
import Select from 'react-select';

import Container from "./Container";


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initial_settings: undefined,
            concrete_settings: undefined,
            cities_for_select: undefined,

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
        this.changeCountry = this.changeCountry.bind(this)
    }

    async componentDidMount() {
        let request_url = 'http://localhost:8000/api/person_settings/';
        await fetch(request_url)
            .then(response => response.json())
            .then(data => this.setState({initial_settings: data}))

        request_url = 'http://localhost:8000/api/persons/1/';
        await fetch(request_url)
            .then(response => response.json())
            .then(data => this.setState({
                concrete_settings: data,
                cities_for_select: this.state.initial_settings.countries.filter(country => country.pk.toString() === data.city.country_pk)[0].cities
            }))
    }

    inputHandle(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    selectChangeHandle(event, target_name) {
        this.setState({
            [target_name]: event
        })
    }

    async updateAvatar(event) {
        const file = event.target.files[0]
        this.setState({avatar: file})
        let avatar_image_element = document.getElementById('person-avatar')
        avatar_image_element.src = URL.createObjectURL(file)
    }

    async updateSettings() {
        const request_url = 'http://localhost:8000/api/persons/1/';

        let requestData = {}
        if (this.state.avatar) {requestData['avatar'] = await toBase64(this.state.avatar)}
        if (this.state.first_name) {requestData['first_name'] = this.state.first_name}
        if (this.state.last_name) {requestData['last_name'] = this.state.last_name}
        if (this.state.gender) {requestData['gender'] = this.state.gender}
        if (this.state.city) {requestData['city'] = this.state.city.pk === undefined ? this.state.city : this.state.city.pk}
        if (this.state.languages) {requestData['languages'] = this.state.languages.map(language => Number(language.value))}

        await fetch(request_url, {
            method: 'PATCH',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => window.location.reload())
    }

    changeCountry(event) {
        const cities = this.state.initial_settings.countries.filter(country => country.pk == event.target.value)[0].cities
        this.setState({cities_for_select: cities})
        this.setState({city: cities[0]})
    }

    render() {
        if (!this.state.initial_settings || !this.state.concrete_settings) {
            return null;
        }
        const languages = this.state.concrete_settings.languages.map(language => ({value: language.pk, label: language.name}));

        const customStyles = {
            control: (provided, isFocused) => ({
                ...provided,
                margin: '2px 0 10px',
                border: 'none',
                borderRadius: '5px',
                background: '#edf4fe',
                boxShadow: 'none',
                ':hover': {
                    border: 'none',
                },
            }),

            option: (provided) => ({
                ...provided,
                background: '#edf4fe',
            }),
            menu: (provided) => ({
                ...provided,
                background: '#edf4fe',
            }),
            multiValue: (provided) => ({
                ...provided,
                background: 'none',
                border: '1px #b3b3b3 solid',
            }),
        }

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
                            <select className="settings-parameter-input" style={{width: '100%', maxWidth: '100%'}} onChange={event => {this.inputHandle(event); this.changeCountry(event) }}
                                    value={this.state.country} defaultValue={this.state.concrete_settings.city.country_pk} name="country">
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
                                {this.state.cities_for_select.map(
                                    city => <option key={city.pk.toString()}
                                                        value={city.pk}>{city.name}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="settings-parameter-block">
                        <div style={{width: '395px'}}>
                            <p className="settings-parameter-label">Language</p>
                            <Select styles={customStyles} isMulti name="language" value={this.state.languages || languages}
                                    onChange={event => this.selectChangeHandle(event, 'languages')}
                                    options={this.state.initial_settings.languages.map(language => {return {value: language.pk, label: language.name}})} />
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
