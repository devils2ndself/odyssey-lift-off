const gql = require("graphql-tag");

const typeDefs = gql`
    type Query {
        "Non-null list of non-null Tracks"
        tracksForHome: [Track!]!
        "Fetch a specific track, provided a track's ID"
        track(id: ID!): Track
        "Fetch a module, provided module's ID"
        module(id: ID!): Module!
    }

    type Mutation {
        "Increment the number of views by 1 each time a card is clicked"
        incrementTrackViews(id: ID!): IncrementTrackViewsResponse!
    }

    type IncrementTrackViewsResponse {
        "Similar to HTTP status code, represents the status of the mutation"
        code: Int!
        "Indicates whether the mutation was successful"
        success: Boolean!
        "Human-readable message for the UI"
        message: String!
        "Newly updated track after a successful mutation"
        track: Track
    }

    "Author is the person who posts Tracks"
    type Author {
        id: ID!
        "Author's name"
        name: String!
        "Image URL"
        photo: String
    }

    "A track is a group of Modules that teaches about a specific topic"
    type Track {
        id: ID!
        "Track's title"
        title: String!
        author: Author!
        "Image URL"
        thumbnail: String
        length: Int
        modulesCount: Int
        "The track's complete description, can be in Markdown format"
        description: String
        "The number of times a track has been viewed"
        numberOfViews: Int
        "The track's complete array of Modules"
        modules: [Module!]!
    }

    "A Module is a single unit of teaching. Multiple Modules compose a Track"
    type Module {
        id: ID!
        "The Module's title"
        title: String!
        "The Module's length in minutes"
        length: Int
        "Video to be played in iframe"
        videoUrl: String
        "Text content"
        content: String
    }
`;

module.exports = typeDefs;