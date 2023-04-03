import React from 'react';
import {FaComment, FaHeart} from "react-icons/fa";


class PersonPosts extends React.Component {
    render() {
        if (this.props.posts === undefined) {
            return
        }
        return (
            this.props.posts.map(post =>
                <div className="card" style={{marginTop: '15px', marginBottom: '15px'}}>
                    <div className="card-body">
                        <p className="card-text" style={{textAlign: 'left'}}>{post.text}</p>
                        <div className="row">
                            <div className="col-2" style={{textAlign: 'left'}}>
                                <span>{post.likes_count}</span>
                                <FaHeart style={{marginLeft: '4px'}}/>
                            </div>
                            <div className="col-7"></div>
                            <div className="col-3">
                                <p className="card-text">{post.date_time}</p>
                            </div>
                        </div>
                    </div>
                </div>

            )
        )
    }
}

export default PersonPosts;
