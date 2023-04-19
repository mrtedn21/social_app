import React from 'react';
import Container from "../Container";


class PersonList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            persons: undefined,
        }

        this.selectThemeHandle = this.selectThemeHandle.bind(this)
        this.clearFilters = this.clearFilters.bind(this)
        this.onSearchEnter = this.onSearchEnter.bind(this)
    }

    async componentDidMount() {
        await fetch('http://localhost:8000/api/persons/')
            .then(response => response.status === 200 ? response.json() : undefined)
            .then(data => this.setState({persons: data.results}))
    }

    async selectThemeHandle(event) {
        //await fetch('http://localhost:8000/api/persons/?theme_slug=' + event.target.value)
        //    .then(response => response.status === 200 ? response.json() : undefined)
        //    .then(data => this.setState({persons: data.results}))
    }

    clearFilters(event) {
        window.location.reload()
    }

    async onSearchEnter(event) {
        if (event.key === 'Enter') {
            await fetch('http://localhost:8000/api/persons/?search_by_name=' + event.target.value)
                .then(response => response.status === 200 ? response.json() : undefined)
                .then(data => this.setState({persons: data.results}))
        }
    }

    render() {
        if (this.state.persons === undefined) {
            return null;
        }

        const persons = this.state.persons.map(person => (
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-3">
                        <img src={person.avatar_thumbnail} className="img-fluid rounded" alt="..." width="106px"/>
                    </div>
                    <div className="col-md-6">
                        <div className="card-body" style={{'paddingRight': 0,'paddingLeft': 0}}>
                            <a href={person.pk} style={{marginBottom: '3px', color: 'black'}}>{person.first_name} {person.last_name}</a>
                            <p style={{marginTop: '0', marginBottom: '0'}}>{person.city.name}, {person.city.country}</p>
                            <p style={{marginTop: '0', marginBottom: '0'}}>{person.followers_count} followers</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <input type="button" value="Following" className="btn btn-primary" style={{marginTop: '10px', marginRight: '10px', float: 'right'}}/>
                    </div>
                </div>
            </div>
        ))

        return (
            <Container>
                <div className="row" style={{marginTop: '15px'}}>
                    <div className="col-3"></div>
                    <div className="col-5">
                        <input type="text" value={this.state.first_name} className="form-control" placeholder="Search"
                               name="search" onChange={this.inputHandle} style={{margin: '15px 0'}} onKeyPress={this.onSearchEnter}/>
                        {persons}
                    </div>
                    <div className="col-2" style={{marginTop: '15px'}}>
                        <div>Theme filters</div>
                        <input type="button" className="btn btn-outline-primary" value="Clear filters"
                               style={{marginTop: '10px'}} onClick={this.clearFilters}/>
                    </div>
                    <div className="col-2"></div>
                </div>
            </Container>
        )
    }
}

export default PersonList;
