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
            <div className="row" style={{paddingTop: '20px'}}>
                <div className="col-3"></div>
                <div className="col-2">
                    <img src={this.props.person.avatar_thumbnail} className="img rounded" alt="..."/>
                </div>
                <div className="col-3">
                    <div>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>{this.props.person.first_name} {this.props.person.last_name}</td>
                                </tr>
                                <tr>
                                    <td>Birthday</td>
                                    <td>{this.format_date()}</td>
                                </tr>
                                <tr>
                                    <td>City</td>
                                    <td>{this.props.person.city.country}, {this.props.person.city.name}</td>
                                </tr>
                                <tr>
                                    <td>Languages</td>
                                    <td>{this.props.person.languages.map(language => language.name).join(', ')}</td>
                                </tr>
                            </tbody>
                        </table>
                        {this.props.can_edit !== true ?
                            <div>
                                <input type="button" className="btn btn-primary" value="Open chat"
                                       style={{margin: '5px'}}/>
                                <input type="button" className="btn btn-primary" value="Follow"
                                       style={{margin: '5px'}}/>
                            </div>
                            :
                            null
                        }
                    </div>
                </div>
                <div className="col-4"></div>
            </div>
        )
    }
}

export default PersonMainData;
