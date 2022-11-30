import React from 'react';
import {FaComment, FaHeart} from "react-icons/fa";


class PersonPost extends React.Component {
    render() {
        return (
            <div className="person-post">
                {this.props.post.text}
                <div className="person-post-bottom">
                    <div>
                        <FaComment className="person-comment-icon" />
                        <FaHeart className="person-heart-icon person-heart-liked" />
                        <p className="person-like-count">{this.props.post.likes_count}</p>
                    </div>
                    <p className="person-post-date-time">
                        {this.props.post.date_time}
                    </p>
                </div>
            </div>
        )
    }
}

export default PersonPost;
