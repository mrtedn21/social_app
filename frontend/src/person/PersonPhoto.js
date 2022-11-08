import React from 'react';


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


class PersonPhoto extends React.Component {
    constructor(props) {
        super(props);

        this.state = {description: undefined, image: undefined}
        this.inputHandle = this.inputHandle.bind(this)
        this.photoUpload = this.photoUpload.bind(this)
        this.changeImage = this.changeImage.bind(this)
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
        const request_url = 'http://localhost:8000/api/photos/'
        const regExp = /token=(\w{40})/g;
        const token = regExp.exec(document.cookie)[1]
        const requestData = {
            image: await toBase64(this.state.image),
            description: this.state.description,
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

    render() {
        return (
            <div>
                <div className="person-photo-form">
                    <input type="file" name="image" onChange={this.changeImage} className="person-photo-input"/>
                    <input type="text" name="description" placeholder="Photo description" className="person-photo-input" onChange={this.inputHandle}/>
                    <input type="button" value="Add photo" className="person-photo-button" onClick={this.photoUpload}/>
                </div>
                <div className="person-photo-gallery">
                    {this.props.photos.map(photo =>
                        <img src={photo.image_thumbnail} alt="Person photo" key={photo.pk.toString()} className="person-photo-image"/>
                    )}
                </div>
            </div> 
        )
    }
}

export default PersonPhoto;
