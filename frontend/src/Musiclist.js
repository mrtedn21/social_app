import React from 'react';
import Container from "./Container";
import { customFetchGet } from "./utils/customFetch";


class MusicList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            music: undefined,
            filters: {
                year_gte: undefined,
                year_lte: undefined,
                album: undefined,
                artist: undefined,
                title: undefined,
            },
        }

        this.clearFilters = this.clearFilters.bind(this)
        this.inputFilterHandle = this.inputFilterHandle.bind(this)
        this.supplyFilters = this.supplyFilters.bind(this)
    }

    inputFilterHandle(event) {
        let oldState = {}
        Object.assign(oldState, this.state)
        oldState.filters[event.target.name] = event.target.value
        this.setState(oldState)
    }


    async componentDidMount() {
        await customFetchGet({
            url: 'http://localhost:8000/api/common_music/',
            callback_with_data: (data) => this.setState({music: data.results})
        })
    }

    async supplyFilters() {
        let filters = this.state.filters
        // remove filter values with undefined, they are incorrect
        filters = Object.fromEntries(Object.entries(filters).filter(([filter_name, filter_value]) => filter_value !== undefined));

        await customFetchGet({
            url: 'http://localhost:8000/api/common_music/?' + new URLSearchParams(filters),
            callback_with_data: data => this.setState({music: data.results}),
        })
    }

    clearFilters(event) {
        window.location.reload()
    }

    render() {
        console.log('i am in begin render')
        if (this.state.music === undefined) {
            return null;
        }
        console.log('i go next in render')

        const music = this.state.music.map(song =>
            <div>
                <p style={{float: 'left', marginBottom: 0, marginTop: '5px'}}>{song.artist.name} {song.title}</p>
                <audio controls={true} src={song.file} key={song.pk.toString()} style={{width: '500px'}}/>
            </div>
        )
        console.log('music')
        console.log(music)
        console.log('state')
        console.log(this.state)

        return (
            <Container>
                <div className="row" style={{marginTop: '15px'}}>
                    <div className="col-3"></div>
                    <div className="col-5" style={{paddingTop: '16px'}}>
                        {music}
                    </div>
                    <div className="col-2" style={{marginTop: '15px'}}>

                        <div className="mb-3">
                            <label htmlFor="country_filter" className="form-label">Title</label>
                            <input type="input" name="title" onInput={this.inputFilterHandle} className="form-control" id="country_filter"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="city_filter" className="form-label">Artist</label>
                            <input type="input" name="artist" onInput={this.inputFilterHandle} className="form-control" id="city_filter"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="city_filterwer" className="form-label">Album</label>
                            <input type="input" name="album" onInput={this.inputFilterHandle} className="form-control" id="city_filterwer"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="age_gt_filter" className="form-label">Year greater than</label>
                            <input type="input" name="year_gte" onInput={this.inputFilterHandle} className="form-control" id="age_gt_filter"/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="age_lt_filter" className="form-label">Year lower than</label>
                            <input type="input" name="year_lte" onInput={this.inputFilterHandle} className="form-control" id="age_lt_filter"/>
                        </div>

                        <input type="button" className="btn btn-outline-primary" value="Supply filters" style={{marginTop: '10px'}} onClick={this.supplyFilters}/>
                        <input type="button" className="btn btn-outline-danger" value="Clear filters" style={{marginTop: '10px'}} onClick={this.clearFilters}/>
                    </div>
                    <div className="col-2"></div>
                </div>
            </Container>
        )
    }
}

export default MusicList;
