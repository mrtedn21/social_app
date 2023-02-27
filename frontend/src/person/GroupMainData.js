import React from 'react';


class GroupMainData extends React.Component {

    render() {
        return (
            <div className="row" style={{paddingTop: '20px'}}>
                <div className="col-3"></div>
                <div className="col-2">
                    <img src={this.props.group.avatar_thumbnail} className="img rounded" alt="..."/>
                </div>
                <div className="col-4">
                    <div>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>{this.props.group.name}</td>
                                </tr>
                                <tr>
                                    <td>Theme</td>
                                    <td>{this.props.group.theme_name}</td>
                                </tr>
                                <tr>
                                    <td>Short description</td>
                                    <td>{this.props.group.short_description}</td>
                                </tr>
                                <tr>
                                    <td>Long description</td>
                                    <td>{this.props.group.long_description}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <input type="button" className="btn btn-primary" value="Follow" style={{margin: '5px'}}/>
                        </div>
                    </div>
                </div>
                <div className="col-3"></div>
            </div>
        )
    }
}

export default GroupMainData;
