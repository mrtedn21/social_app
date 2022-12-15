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
                    <div className="col-md-2">
                        <img src={group.avatar_thumbnail} className="img-fluid rounded-start" alt="..." width="100px"/>
                    </div>
                    <div className="col-md-10">
                        <div className="card-body">
                            <h5 className="card-title">{group.name}</h5>
                            <p className="card-text">{group.short_description}</p>
                        </div>
                    </div>
                </div>
            </div>
        ))

        return (
            <Container>
                <div className="row" style={{marginTop: '15px'}}>
                    <div className="col-3"></div>
                    <div className="col-6">
                        {groups}
                    </div>
                    <div className="col-3"></div>
                </div>
            </Container>
        )
    }
}

export default GroupList;
