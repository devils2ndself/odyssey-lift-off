const { RESTDataSource } = require("@apollo/datasource-rest");

class TrackAPI extends RESTDataSource {
    // It is important to keep '/' at the end of the baseURL for easier query
    baseURL = "https://odyssey-lift-off-rest-api.herokuapp.com/";

    getTracksForHome() {
        return this.get('tracks')
    }

    getTrack(trackId) {
        return this.get(`track/${trackId}`)
    }

    getAuthor(authorId) {
        return this.get(`author/${authorId}`)
    }

    getTrackModules(trackId) {
        return this.get(`track/${trackId}/modules`)
    }
}

module.exports = TrackAPI