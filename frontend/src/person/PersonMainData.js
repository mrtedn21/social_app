import React from 'react';


class PersonMainData extends React.Component {
    format_date() {
        const date_string = this.props.person.birth_date;
        const date = new Date(Date.parse(date_string))
        const date_format_options = { year: 'numeric', month: 'numeric', day: 'numeric' };
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
                                    <td>Имя</td>
                                    <td>{this.props.person.first_name} {this.props.person.last_name}</td>
                                </tr>
                                <tr>
                                    <td>Дата рождения</td>
                                    <td>{this.format_date()}</td>
                                </tr>
                                <tr>
                                    <td>Город</td>
                                    <td>{this.props.person.city.country}, {this.props.person.city.name}</td>
                                </tr>
                                <tr>
                                    <td>Языки</td>
                                    <td>{this.props.person.languages.map(language => language.name).join(', ')}</td>
                                </tr>
                            </tbody>
                        </table>
                        {this.props.can_edit !== true ?
                            <div>
                                <a href={'/chat/?direct_person_pk=' + this.props.person.pk} type="button" className="btn btn-primary" style={{margin: '5px'}}>Open chat</a>
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
