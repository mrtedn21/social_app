import React from 'react';
import {FaTrash} from "react-icons/fa";
import withRouter from "../WithRouter";


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


class PhotoFull extends React.Component {
    constructor(props) {
        super(props);

        this.changeVisible = this.changeVisible.bind(this)
        this.deletePhoto = this.deletePhoto.bind(this)
    }

    changeVisible() {
        this.props.hideCallback()
    }

    async deletePhoto(photo_pk) {
        const tab_request_url = 'http://localhost:8000/api/group_photos/' + photo_pk + '/';
        await fetch(tab_request_url, {method: 'DELETE'})
            .then(response => response.status === 204 ? window.location.reload() : undefined)
    }

    render() {
        if (this.props.src === undefined) {
            return
        }

        return (
            <div onClick={this.changeVisible} style={{position: 'fixed', backdropFilter: 'blur(3px)', background: 'rgba(190, 190, 190, 0.69)', top: 0, bottom: 0, left: 0, right: 0}}>
                <img onClick={(event) => event.stopPropagation()} style={{position: 'fixed', top: '100px', left: '400px'}} src={this.props.src} alt="image"/>
                <FaTrash
                    style={{position: 'fixed', top: '90px', left: '390px'}}
                    onMouseOver={({target})=>target.style.color="red"}
                    onMouseOut={({target})=>target.style.color="black"}
                    onClick={() => this.deletePhoto(this.props.pk)}
                />
            </div>
        )
    }
}


class GroupPhotos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {description: undefined, image: undefined, fullSrc: undefined, fullPk: undefined}
        this.inputHandle = this.inputHandle.bind(this)
        this.photoUpload = this.photoUpload.bind(this)
        this.changeImage = this.changeImage.bind(this)
        this.hideFullPhotoCallback = this.hideFullPhotoCallback.bind(this)
        this.showFullPhoto = this.showFullPhoto.bind(this)
    }

    inputHandle(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async changeImage(event) {
        const file = event.target.files[0]
        this.setState({image: file})
    }

    async photoUpload(event) {
        const request_url = 'http://localhost:8000/api/group_photos/'
        const regExp = /token=(\w{40})/g;
        const token = regExp.exec(document.cookie)[1]
        const requestData = {
            image: this.state.image ? await toBase64(this.state.image) : null,
            description: this.state.description,
            group: this.props.params.slug,
        }

        await fetch(request_url, {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
            },
        })
            .then(response => window.location.reload())
    }

    hideFullPhotoCallback() {
        this.setState({fullSrc: undefined, fullPk: undefined})
    }

    showFullPhoto(src, pk) {
        this.setState({fullSrc: src, fullPk: pk})
    }

    render() {
        if (this.props.photos === undefined) {
            return
        }
        console.log(this.state)
        return (
            <div>
                <form style={{textAlign: 'left'}}>
                    <div style={{marginBottom: '10px'}}>
                        <label className="form-label">Image</label>
                        <input type="file" name="image" onChange={this.changeImage} className="form-control"/>
                    </div>
                    <div style={{marginBottom: '10px'}}>
                        <label className="form-label">Description</label>
                        <input type="text" name="description" className="form-control" onChange={this.inputHandle}/>
                    </div>
                    <input type="button" value="Add photo" className="btn btn-primary" onClick={this.photoUpload} style={{marginBottom: '30px'}}/>
                </form>
                <div className="row row-cols-3 g-1">
                    {this.props.photos.map(photo =>
                        <div className="col">
                           <img onClick={() => this.showFullPhoto(photo.image_display, photo.pk)} src={photo.image_thumbnail} alt="Group photo" key={photo.pk.toString()} className="img rounded" />
                        </div>
                    )}
                </div>
                <PhotoFull hideCallback={this.hideFullPhotoCallback} src={this.state.fullSrc} pk={this.state.fullPk}/>
            </div> 
        )
    }
}

export default withRouter(GroupPhotos);
