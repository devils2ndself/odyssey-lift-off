const gql = require("graphql-tag");

const typeDefs = gql`
    type Query {
        " Non-null list of non-null Tracks "
        tracksForHome: [Track!]!
    }

    " Author is the person who posts Tracks "
    type Author {
        id: ID!
        " Author's name "
        name: String!
        " Image URL "
        photo: String
    }

    " A track is a group of Modules that teaches about a specific topic "
    type Track {
        id: ID!
        " Track's title "
        title: String!
        author: Author!
        " Image URL "
        thumbnail: String
        length: Int
        modulesCount: Int
    }   
`;

module.exports = typeDefs;