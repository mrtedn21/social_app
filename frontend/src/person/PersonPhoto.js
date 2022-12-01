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
                            <img src={photo.image_thumbnail} alt="Person photo" key={photo.pk.toString()} className="img rounded"/>
                        </div>
                    )}
                </div>
            </div> 
        )
    }
}

export default PersonPhoto;
