import React from 'react';
import Container from "../Container";
import {customFetchGet} from "../utils/customFetch";


class GroupList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: undefined,
            specs: undefined,
        }

        this.selectThemeHandle = this.selectThemeHandle.bind(this)
        this.clearFilters = this.clearFilters.bind(this)
        this.onSearchEnter = this.onSearchEnter.bind(this)
    }

    async componentDidMount() {
        await customFetchGet({
            url: 'http://90.189.172.136:8000/api/groups/',
            callback_with_data: data => this.setState({groups: data.results}),
        })
        await customFetchGet({
            url: 'http://90.189.172.136:8000/api/groups/specs/',
            callback_with_data: data => this.setState({specs: data}),
        })
    }

    async selectThemeHandle(event) {
        await customFetchGet({
            url: 'http://90.189.172.136:8000/api/groups/?theme_slug=' + event.target.value,
            callback_with_data: data => this.setState({groups: data.results}),
        })
    }

    clearFilters(event) {
        window.location.reload()
    }

    async onSearchEnter(event) {
        if (event.key === 'Enter') {
            await customFetchGet({
                url: 'http://90.189.172.136:8000/api/groups/?name_like=' + event.target.value,
                callback_with_data: data => this.setState({groups: data.results}),
            })
        }
    }

    render() {
        if ((this.state.groups === undefined) || (this.state.specs === undefined)) {
            return null;
        }

        const groups = this.state.groups.map(group => (
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-3">
                        <img src={group.avatar_thumbnail} className="img-fluid rounded" alt="..." width="106px"/>
                    </div>
                    <div className="col-md-6">
                        <div className="card-body" style={{'paddingRight': 0,'paddingLeft': 0}}>
                            <a href={group.slug} style={{marginBottom: '3px', color: 'black'}}>{group.name}</a>
                            <p style={{marginTop: '0', marginBottom: '0'}}>{group.theme_name}</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <a href={'/groups/' + group.slug } type="button" className="btn btn-primary" style={{marginTop: '10px', marginRight: '10px', float: 'right'}}>Открыть</a>
                    </div>
                </div>
            </div>
        ))

        const theme_filters = this.state.specs.find(element => element.name === 'theme_slug').values.map( theme => (
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" value={theme.slug} onChange={this.selectThemeHandle}/>
                    <label className="form-check-label">{theme.name}</label>
                </div>
            )
        )

        return (
            <Container>
                <div className="row" style={{marginTop: '15px'}}>
                    <div className="col-3"></div>
                    <div className="col-5">
                        <input type="text" value={this.state.first_name} className="form-control" placeholder="Поиск"
                               name="search" onChange={this.inputHandle} style={{margin: '15px 0'}} onKeyPress={this.onSearchEnter}/>
                        {groups}
                    </div>
                    <div className="col-2" style={{marginTop: '15px'}}>
                        <div>Фильтры по теме</div>
                        {theme_filters}
                        <input type="button" className="btn btn-outline-danger" value="Очистить фильтры"
                               style={{marginTop: '10px'}} onClick={this.clearFilters}/>
                    </div>
                    <div className="col-2"></div>
                </div>
            </Container>
        )
    }
}

export default GroupList;
