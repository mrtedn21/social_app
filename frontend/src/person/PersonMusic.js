import React from 'react';


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


class PersonMusic extends React.Component {

    async musicUpload(event) {
        const request_url = 'http://localhost:8000/api/music/'
        const regExp = /token=(\w{40})/g;
        const token = regExp.exec(document.cookie)[1]
        const requestData = {
            file: await toBase64(event.target.files[0]),
        }

        await fetch(request_url, {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
            },
        })
            .then(response => response.json())
            .then(data => console.log(data))
    }

    render() {
        return (
            <div>
                <div className="person-photo-form">
                    <input type="file" name="music" onChange={this.musicUpload} className="person-photo-input"/>
                </div>
            </div>
        )
    }
}

export default PersonMusic;
