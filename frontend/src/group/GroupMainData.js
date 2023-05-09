import React from 'react';


class GroupMainData extends React.Component {
    format_date() {
        const date_string = this.props.group.birth_date;
        const date = new Date(Date.parse(date_string))
        const date_format_options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, date_format_options)
    }

    render() {
        return (
            <div className="row" style={{paddingTop: '20px'}}>
                <div className="col-3"></div>
                <div className="col-2">
                    <img src={this.props.group.avatar_thumbnail} className="img rounded" alt="..."/>
                </div>
                <div className="col-3">
                    <div>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Название</td>
                                    <td>{this.props.group.name}</td>
                                </tr>
                                <tr>
                                    <td>Тема</td>
                                    <td>{this.props.group.theme_name}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-4"></div>
            </div>
        )
    }
}

export default GroupMainData;
