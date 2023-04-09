import React from 'react';
import {FaComment, FaHeart} from "react-icons/fa";
import {FaTrash} from "react-icons/fa";
import Cookies from "js-cookie";


class PersonPosts extends React.Component {
    constructor(props) {
        super(props);

        this.deletePost = this.deletePost.bind(this)
    }

    async deletePost(post_pk) {
        const tab_request_url = 'http://localhost:8000/api/person_posts/' + post_pk + '/';
        await fetch(tab_request_url, {method: 'DELETE'})
            .then(response => response.status === 204 ? window.location.reload() : undefined)
    }

    render() {
        if (this.props.posts === undefined) {
            return
        }
        return (
            this.props.posts.map(post =>
                <div className="card" style={{marginTop: '15px', marginBottom: '15px'}}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-10">
                                <p className="card-text" style={{textAlign: 'left'}}>{post.text}</p>
                            </div>
                            <div className="col-2">
                                <FaTrash
                                    style={{position: 'relative', top: '-6px', right: '-20px'}}
                                    onMouseOver={({target})=>target.style.color="red"}
                                    onMouseOut={({target})=>target.style.color="black"}
                                    onClick={() => this.deletePost(post.pk)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2" style={{textAlign: 'left'}}>
                                {/*<span>{post.likes_count}</span>*/}
                                {/*<FaHeart style={{marginLeft: '4px'}}/>*/}
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
