import React from 'react';


class GroupList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {person: undefined, selectedTabIndex: undefined}
    }

    async componentDidMount() {
        const request_url = 'http://localhost:8000/api/persons/1/';
        await fetch(request_url)
            .then(response => response.status === 200 ? response.json() : undefined)
            .then(data => this.setState({person: data}))
    }

    render() {
        if (this.state.person === undefined) {
            return null;
        }

        return (
            <div>test</div>
        )
    }
}

export default GroupList;
