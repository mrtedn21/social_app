import React from 'react';
import Container from "./Container";


class GroupList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {groups: undefined}
    }

    async componentDidMount() {
        const request_url = 'http://localhost:8000/api/groups';
        await fetch(request_url)
            .then(response => response.status === 200 ? response.json() : undefined)
            .then(data => this.setState({groups: data.results}))
    }

    render() {
        if (this.state.groups === undefined) {
            return null;
        }

        const groups = this.state.groups.map(group => (
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-3">
                        <img src={group.avatar_thumbnail} className="img-fluid rounded" alt="..." width="100px"/>
                    </div>
                    <div className="col-md-6">
                        <div className="card-body" style={{'paddingRight': 0,'paddingLeft': 0}}>
                            <a href="#" style={{marginBottom: '3px', color: 'black'}}>{group.name}</a>
                            <p style={{marginTop: '0', marginBottom: '0'}}>{group.theme_name}</p>
                            <p style={{marginTop: '0', marginBottom: '0'}}>{group.followers_count} followers</p>
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
                               name="search" onChange={this.inputHandle} style={{margin: '15px 0'}}/>
                        {groups}
                    </div>
                    <div className="col-2" style={{marginTop: '15px'}}>
                        <div>Theme filters</div>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault"/>
                            <label className="form-check-label">Default radio</label>
                        </div>
                        <div class="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault"/>
                            <label className="form-check-label">Default checked radio</label>
                        </div>

                    </div>
                    <div className="col-2"></div>
                </div>
            </Container>
        )
    }
}

export default GroupList;
