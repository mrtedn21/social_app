import React from 'react';

import Container from "./Container";
import { customFetchGet, customFetchPatch } from "./utils/customFetch";
import Cookies from "js-cookie";


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
            person_pk: undefined,
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
        this.multipleSelectHandle = this.multipleSelectHandle.bind(this)
        this.updateSettings = this.updateSettings.bind(this)
        this.updateAvatar = this.updateAvatar.bind(this)
        this.changeCountry = this.changeCountry.bind(this)
    }

    async componentDidMount() {
        await customFetchGet({
            url: 'http://localhost:8000/api/persons/' + Cookies.get('user_pk') + '/',
            callback_with_data: (data) => this.setState({
                concrete_settings: data,
                cities_for_select: this.state.initial_settings.countries.filter(country => country.pk.toString() === data.city.country_pk)[0].cities
            })
        })

        await customFetchGet({
            url: 'http://localhost:8000/api/person_settings/',
            callback_with_data: (data) => this.setState({initial_settings: data}),
        })
    }

    inputHandle(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    multipleSelectHandle(event){
        this.setState({
            [event.target.name]: Array.from(event.target.selectedOptions).map(option => option.value)
        })
    }

    async updateAvatar(event) {
        const file = event.target.files[0]
        this.setState({avatar: file})
        let avatar_image_element = document.getElementById('person-avatar')
        avatar_image_element.src = URL.createObjectURL(file)
    }

    async updateSettings() {
        let requestData = {}
        if (this.state.avatar) {requestData['avatar'] = await toBase64(this.state.avatar)}
        if (this.state.first_name) {requestData['first_name'] = this.state.first_name}
        if (this.state.last_name) {requestData['last_name'] = this.state.last_name}
        if (this.state.gender) {requestData['gender'] = this.state.gender}
        if (this.state.city) {requestData['city'] = this.state.city.pk === undefined ? this.state.city : this.state.city.pk}
        if (this.state.languages) {requestData['languages'] = this.state.languages}

        await customFetchPatch({
            url: 'http://localhost:8000/api/persons/' + this.state.person_pk + '/',
            callback_with_data: (data) => window.location.reload(),
            body: JSON.stringify(requestData),
            content_type: 'application/json',
        })
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
        return (
            <Container>
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <div style={{marginBottom: '13px'}}>
                            <label className="form-label">Avatar</label>
                            <input type="file" className="form-control" name="avatar" onChange={this.updateAvatar}/>
                            <img src={this.state.concrete_settings.avatar_thumbnail} id="person-avatar"
                                 alt="Avatar" style={{width: '200px', marginBottom: '10px', borderRadius: '10px'}}/>
                        </div>
                        <div style={{marginBottom: '13px'}}>
                            <label className="form-label">First name</label>
                            <input type="text" value={this.state.first_name} defaultValue={this.state.concrete_settings.first_name} className="form-control"
                                   name="first_name" onChange={this.inputHandle}/>
                        </div>
                        <div style={{marginBottom: '13px'}}>
                            <label className="form-label">Last name</label>
                            <input type="text" value={this.state.last_name} defaultValue={this.state.concrete_settings.last_name} className="form-control"
                                   name="last_name" onChange={this.inputHandle}/>
                        </div>
                        <div style={{marginBottom: '13px'}}>
                            <label className="form-label">Gender</label>
                            <select className="form-control"
                                    value={this.state.gender} defaultValue={this.state.concrete_settings.gender.pk} name="gender" onChange={this.inputHandle}>
                                {this.state.initial_settings.genders.map(
                                    gender => <option key={gender.pk.toString()}
                                                        value={gender.pk}>{gender.name}</option>
                                )}
                            </select>
                        </div>
                        <div style={{marginBottom: '13px'}}>
                            <label className="form-label">Country</label>
                            <select className="form-control" onChange={event => {this.inputHandle(event); this.changeCountry(event) }}
                                    value={this.state.country} defaultValue={this.state.concrete_settings.city.country_pk} name="country">
                                {this.state.initial_settings.countries.map(
                                    country => <option key={country.pk.toString()}
                                                        value={country.pk}>{country.name}</option>
                                )}
                            </select>
                        </div>
                        <div style={{marginBottom: '13px'}}>
                            <label className="form-label">City</label>
                            <select className="form-control"
                                    defaultValue={this.state.city || this.state.concrete_settings.city.pk} name="city" onChange={this.inputHandle}>
                                {this.state.cities_for_select.map(
                                    city => <option key={city.pk.toString()}
                                                        value={city.pk}>{city.name}</option>
                                )}
                            </select>
                        </div>
                        <div style={{marginBottom: '13px'}}>
                            <label className="form-label">Languages</label>
                            <select name="languages" className="form-control" defaultValue={this.state.concrete_settings.languages.map(language => language.pk)}
                                    onChange={this.multipleSelectHandle} multiple value={this.state.languages}>
                                {this.state.initial_settings.languages.map(
                                    language => <option key={language.pk.toString()}
                                                    value={language.pk}>{language.name}</option>
                                )}
                            </select>
                        </div>
                        <div>
                            <input type="button" value="Save settings" className="btn btn-primary" onClick={this.updateSettings}/>
                        </div>
                    </div>
                    <div className="col-4"></div>
                </div>
            </Container>
        )
    }
}

export default Settings;
