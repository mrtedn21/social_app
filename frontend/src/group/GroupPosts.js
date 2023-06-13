import React from 'react';
import {FaComment, FaHeart} from "react-icons/fa";
import {FaTrash} from "react-icons/fa";
import Cookies from "js-cookie";
import {customFetchDelete} from "../utils/customFetch";


class GroupPosts extends React.Component {
    constructor(props) {
        super(props);

        this.deletePost = this.deletePost.bind(this)
    }

    async deletePost(post_pk) {
        const tab_request_url = 'http://90.189.172.136:8000/api/group_posts/' + post_pk + '/';

        await customFetchDelete({
            url: tab_request_url,
            callback_with_data: data => window.location.reload(),
        })
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
                                <p className="card-text" style={{textAlign: 'left'}}  dangerouslySetInnerHTML={{__html: post.text}}></p>
                            </div>
                            <div className="col-2">
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2" style={{textAlign: 'left'}}>
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

export default GroupPosts;
