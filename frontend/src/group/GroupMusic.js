import React from 'react';
import withRouter from "../WithRouter";
import {customFetchPost} from "../utils/customFetch";


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


class GroupMusic extends React.Component {
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
        console.log(this.state)
        const request_url = 'http://localhost:8000/api/group_music/'

        let formData = new FormData()
        formData.append('artist', this.state.artist)
        formData.append('album', this.state.album)
        formData.append('title', this.state.title)
        formData.append('file', this.state.file)
        formData.append('group', this.props.params.slug)

        await customFetchPost({
            url: request_url,
            callback_with_data: data => window.location.reload(),
            body: formData,
        })
    }

    render() {
        if (this.props.music === undefined) {
            return
        }
        return (
            <div>
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

export default withRouter(GroupMusic);
