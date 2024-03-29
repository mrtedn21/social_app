import React from 'react';
import {FaTrash} from "react-icons/fa";
import { customFetchPost, customFetchDelete } from "../utils/customFetch";


class VideoFull extends React.Component {
    constructor(props) {
        super(props);

        this.changeVisible = this.changeVisible.bind(this)
        this.deleteVideo = this.deleteVideo.bind(this)
    }

    changeVisible() {
        this.props.hideCallback()
    }

    async deleteVideo(video_pk) {
        const tab_request_url = 'http://localhost:8000/api/person_videos/' + video_pk + '/';
        await customFetchDelete({
            url: tab_request_url,
            callback_with_data: data => window.location.reload(),
        })
    }

    render() {
        if (this.props.src === undefined) {
            return
        }

        return (
            <div onClick={this.changeVisible} style={{position: 'fixed', backdropFilter: 'blur(3px)', background: 'rgba(190, 190, 190, 0.69)', top: 0, bottom: 0, left: 0, right: 0}}>
                <video controls onClick={(event) => event.stopPropagation()} style={{position: 'fixed', top: '100px', left: '400px'}} src={this.props.src} />
                {this.props.can_edit ?
                    <FaTrash
                        style={{position: 'fixed', top: '90px', left: '390px'}}
                        onMouseOver={({target}) => target.style.color = "red"}
                        onMouseOut={({target}) => target.style.color = "black"}
                        onClick={() => this.deleteVideo(this.props.pk)}
                    />
                    :
                    null
                }
            </div>
        )
    }
}


class PersonVideo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {description: undefined, preview: undefined, name: undefined, video: undefined, fullSrc: undefined, fullPk: undefined}
        this.inputHandle = this.inputHandle.bind(this)
        this.videoUpload = this.videoUpload.bind(this)
        this.showFullVideo = this.showFullVideo.bind(this)
        this.hideFullVideo = this.hideFullVideo.bind(this)
        this.inputFileHandle = this.inputFileHandle.bind(this)
    }

    inputHandle(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async inputFileHandle(event) {
        const file = event.target.files[0]
        this.setState({
            [event.target.name]: file
        })
    }

    async videoUpload(event) {
        const request_url = 'http://localhost:8000/api/person_videos/'

        let formData = new FormData()
        formData.append('description', this.state.description)
        formData.append('name', this.state.name)
        formData.append('video', this.state.video)
        formData.append('preview', this.state.preview)

        await customFetchPost({
            url: request_url,
            body: formData,
            callback_with_data: data => window.location.reload(),
        })
    }

    showFullVideo(src, pk) {
        this.setState({fullSrc: src, fullPk: pk})
    }

    hideFullVideo() {
        this.setState({fullSrc: undefined, fullPk: undefined})
    }

    render() {
        if (this.props.video === undefined) {
            return
        }
        return (
            <div>
                { this.props.can_edit ?
                    <form style={{textAlign: 'left'}}>
                        <div style={{marginBottom: '10px'}}>
                            <label className="form-label">Name</label>
                            <input type="text" name="name" className="form-control" onChange={this.inputHandle}/>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <label className="form-label">Description</label>
                            <input type="text" name="description" className="form-control" onChange={this.inputHandle}/>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <label className="form-label">Preview</label>
                            <input type="file" name="preview" onChange={this.inputFileHandle} className="form-control"/>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <label className="form-label">Video</label>
                            <input type="file" name="video" className="form-control" accept="video/*" onChange={this.inputFileHandle}/>
                        </div>
                        <input type="button" value="Add video" className="btn btn-primary" onClick={this.videoUpload} style={{marginBottom: '30px'}}/>
                    </form>
                    :
                    null
                }
                <div className="row row-cols-3 g-1">
                    {this.props.video.map(video =>
                        <div className="col">
                            <img onClick={() => this.showFullVideo(video.video, video.pk)} src={video.preview_thumbnail} alt="Person video" key={video.pk.toString()} className="img rounded"/>
                        </div>
                    )}
                </div>
                <VideoFull can_edit={this.props.can_edit} hideCallback={this.hideFullVideo} src={this.state.fullSrc} pk={this.state.fullPk}/>
            </div>
        )
    }
}

export default PersonVideo;
