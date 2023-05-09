import React from 'react';
import {FaTrash} from "react-icons/fa";
import { customFetchDelete, customFetchPost } from "../utils/customFetch";


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
        const tab_request_url = 'http://localhost:8000/api/person_photos/' + photo_pk + '/';
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
                <img onClick={(event) => event.stopPropagation()} style={{position: 'fixed', top: '100px', left: '400px'}} src={this.props.src} alt="image"/>
                { this.props.can_edit ?
                    <FaTrash
                        style={{position: 'fixed', top: '80px', left: '399px'}}
                        onMouseOver={({target})=>target.style.color="red"}
                        onMouseOut={({target})=>target.style.color="black"}
                        onClick={() => this.deletePhoto(this.props.pk)}
                    />
                    :
                    null
                }
            </div>
        )
    }
}


class PersonPhotos extends React.Component {
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
        const request_url = 'http://localhost:8000/api/person_photos/'
        const requestData = {
            image: await toBase64(this.state.image),
            description: this.state.description,
        }

        await customFetchPost({
            url: request_url,
            body: JSON.stringify(requestData),
            content_type: 'application/json',
            callback_with_data: data => window.location.reload(),
        })
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
        return (
            <div>
                {this.props.can_edit ?
                    <form style={{textAlign: 'left'}}>
                        <div style={{marginBottom: '10px'}}>
                            <label className="form-label">Фотография</label>
                            <input type="file" name="image" onChange={this.changeImage} className="form-control"/>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <label className="form-label">Описание</label>
                            <input type="text" name="description" className="form-control" onChange={this.inputHandle}/>
                        </div>
                        <input type="button" value="Добавить фото" className="btn btn-primary" onClick={this.photoUpload}
                               style={{marginBottom: '30px'}}/>
                    </form>
                    :
                    null
                }
                <div className="row row-cols-3 g-1">
                    {this.props.photos.map(photo =>
                        <div className="col">
                           <img onClick={() => this.showFullPhoto(photo.image_display, photo.pk)} src={photo.image_thumbnail} alt="Person photo" key={photo.pk.toString()} className="img rounded" />
                        </div>
                    )}
                </div>
                <PhotoFull can_edit={this.props.can_edit} hideCallback={this.hideFullPhotoCallback} src={this.state.fullSrc} pk={this.state.fullPk}/>
            </div> 
        )
    }
}

export default PersonPhotos;
