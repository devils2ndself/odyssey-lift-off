const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const typeDefs = require("./schema");

const resolvers = require("./resolvers");
const TrackAPI = require("./datasources/track-api");

async function startApolloServer() {
    const server = new ApolloServer({
        // variable (const) names are the same as expected object fields.
        // same as `typeDefs: typeDefs,`
        typeDefs,
        resolvers,
     });

    const { url } = await startStandaloneServer(server, {
        context: async () => {
            const { cache } = server;

            // this object becomes our resolver's contextValue, the third positional argument
            return {
                // naming has to be the same as resolvers
                dataSources: {
                    trackAPI: new TrackAPI({ cache }),
                }
            };
        },
    });

    console.log(`Server is running at: ${url}`);
}

startApolloServer();