import React from 'react';


class PersonMainData extends React.Component {
    format_date() {
        const date_string = this.props.person.birth_date;
        const date = new Date(Date.parse(date_string))
        const date_format_options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, date_format_options)
    }

    render() {
        return (
            <div className="person-main-data">
                <img src={this.props.person.avatar_thumbnail} className="rounded" alt="avatar"/>
                <div>
                    <p className="person-name">{this.props.person.first_name} {this.props.person.last_name}</p>
                    <p className="person-birth">{this.format_date()}</p>
                    <div className="person-main-buttons">
                        <input type="button" className="person-chat-button" value="Open chat"/>
                        <input type="button" className="person-follow-button" value="Follow"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default PersonMainData;
