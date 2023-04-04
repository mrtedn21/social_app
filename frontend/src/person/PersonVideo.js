import React from 'react';


class PersonVideo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {description: undefined, preview: undefined, name: undefined, video: undefined}
        this.inputHandle = this.inputHandle.bind(this)
        this.videoUpload = this.videoUpload.bind(this)
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
        const regExp = /token=(\w{40})/g;
        const token = regExp.exec(document.cookie)[1]

        let formData = new FormData()
        formData.append('description', this.state.description)
        formData.append('name', this.state.name)
        formData.append('video', this.state.video)
        formData.append('preview', this.state.preview)

        console.log(this.state)

        await fetch(request_url, {
            method: 'POST',
            body: formData,
            headers: {
                //'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
            },
        })
            .then(response => window.location.reload())
    }

    render() {
        if (this.props.video === undefined) {
            return
        }
        return (
            <div>
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
                <div className="row row-cols-3 g-1">
                    {this.props.video.map(video =>
                        <div className="col">
                            <img src={video.preview_thumbnail} alt="Person video" key={video.pk.toString()} className="img rounded"/>
                        </div>
                    )}
                </div>
            </div> 
        )
    }
}

export default PersonVideo;
