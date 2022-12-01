import React from 'react';
import {FaComment, FaHeart} from "react-icons/fa";


class PersonPost extends React.Component {
    render() {
        return (
            <div className="card" style={{marginTop: '15px', marginBottom: '15px'}}>
                <div className="card-body">
                    <p className="card-text" style={{textAlign: 'left'}}>{this.props.post.text}</p>
                    <div className="row">
                        <div className="col-2" style={{textAlign: 'left'}}>
                            <span>{this.props.post.likes_count}</span>
                            <FaHeart style={{marginLeft: '4px'}}/>
                        </div>
                        <div className="col-7"></div>
                        <div className="col-3">
                            <p className="card-text">{this.props.post.date_time}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PersonPost;
