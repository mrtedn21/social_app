import React from 'react';
import {customFetchPost} from "../utils/customFetch";


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


class PersonMusic extends React.Component {
    constructor(props) {
        super(props);

        this.state = {artist: undefined, album: undefined, title: undefined, file: undefined}
        this.inputHandle = this.inputHandle.bind(this)
        this.songUpload = this.songUpload.bind(this)
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

    //async musicUpload(event) {
    //    const request_url = 'http://localhost:8000/api/song/'
    //    const regExp = /token=(\w{40})/g;
    //    const token = regExp.exec(document.cookie)[1]
    //    const requestData = {
    //        file: await toBase64(event.target.files[0]),
    //    }

    //    await fetch(request_url, {
    //        method: 'POST',
    //        body: JSON.stringify(requestData),
    //        headers: {
    //            'Content-Type': 'application/json',
    //            'Authorization': 'Token ' + token,
    //        },
    //    })
    //        .then(response => response.json())
    //        .then(data => console.log(data))
    //}

    async songUpload(event) {
        const request_url = 'http://localhost:8000/api/person_music/'

        let formData = new FormData()
        formData.append('artist', this.state.artist)
        formData.append('album', this.state.album)
        formData.append('title', this.state.title)
        formData.append('file', this.state.file)

        await customFetchPost({
            url: request_url,
            body: formData,
            callback_with_data: data => window.location.reload(),
        })
    }

    render() {
        if (this.props.music === undefined) {
            return
        }
        return (
            <div>
                <form style={{textAlign: 'left'}}>
                    <div style={{marginBottom: '10px'}}>
                        <label className="form-label">Artist</label>
                        <input type="text" name="artist" className="form-control" onChange={this.inputHandle}/>
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <label className="form-label">Album</label>
                        <input type="text" name="album" className="form-control" onChange={this.inputHandle}/>
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <label className="form-label">Title</label>
                        <input type="text" name="title" className="form-control" onChange={this.inputHandle}/>
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <label className="form-label">File</label>
                        <input type="file" name="file" className="form-control" accept="audio/*" onChange={this.inputFileHandle}/>
                    </div>
                    <input type="button" value="Add video" className="btn btn-primary" onClick={this.songUpload} style={{marginBottom: '30px'}}/>
                </form>
                <div className="row">
                    {this.props.music.map(song =>
                        <div className="col-12">
                            <p style={{float: 'left', marginBottom: 0, marginTop: '5px'}}>{song.artist} {song.title}</p>
                            <audio controls={true} src={song.file} key={song.pk.toString()} style={{width: '600px'}}/>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default PersonMusic;
