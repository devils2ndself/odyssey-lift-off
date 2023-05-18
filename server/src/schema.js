const gql = require("graphql-tag");

const typeDefs = gql`
    type Query {
        " Non-null list of non-null Tracks "
        tracksForHome: [Track!]!
    }

    type Author {
        id: ID!
        name: String!
        photo: String
    }

    " A track is a group of Modules that teaches about a specific topic "
    type Track {
        id: ID!
        title: String!
        author: Author!
        thumbnail: String
        length: Int
        modulesCount: Int
    }   
`;

module.exports = typeDefs;