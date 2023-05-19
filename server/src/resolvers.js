/* Explanation of each resolver's parameter
const exampleResolvers = {
    Query: {
        // returns an array of Tracks that will be used to populate
        // the homepage grid of our web client
        tracksForHome: (
            // parent is the returned value of the resolver for this field's parent 
            // This will be useful when dealing with resolver chains.
            parent, 

            // args is an object that contains all GraphQL arguments that were provided for the field by the GraphQL operation.
            
            // When querying for a specific item (such as a specific track instead of all tracks), 
            // in client-side we'll make a query with an `id` argument that will be accessible via this `args` parameter in server-side.
            args, 

            // contextValue is an object shared across all resolvers that are executing for a particular operation
            // The resolver needs this argument to share state, like authentication information, a database connection, or in our case the RESTDataSource
            contextValue, 

            // info contains information about the operation's execution state, including the field name, the path to the field from the root, and more.
            // It's not used as frequently as the others, but it can be useful for more advanced actions like setting cache policies at the resolver level.
            info
        ) => {
            // process here
        },
    }
};
*/

const resolvers = {
    Query: {
        // We don't need the first two parameters, so as a convention, we'll name them with underscores: 
        // one underscore for the first (parent) and two underscores for the second (args).
        
        // For the contextValue, we'll destructure it to access its child object dataSources.

        // And we can omit the fourth parameter, info, as we won't use it.
        tracksForHome: (_, __, { dataSources }) => {
            // From our dataSources object, we'll gain access to our trackAPI (lowercase here as it's the instance of our TrackAPI class) 
            // and its getTracksforHome method that we built earlier.

            // Our tracksForHome resolver will return the results from that TrackAPI method.
            return dataSources.trackAPI.getTracksForHome();
        },

        track: (_, { id }, { dataSources }) => {
            return dataSources.trackAPI.getTrack(id);
        },

        module: (_, { id }, { dataSources }) => {
            return dataSources.trackAPI.getModule(id);
        }
    },

    Mutation: {
        incrementTrackViews: async (_, { id }, { dataSources }) => {
            try {
                const track = await dataSources.trackAPI.incrementTrackViews(id);

                return {
                    code: 200,
                    success: true,
                    message: `Successfully incremented number of views for track ${id}`,
                    track
                };
            } catch (err) {
                return {
                    code: err.extensions.response.status,
                    success: false,
                    message: err.extensions.response.body,
                    track: null
                }
            }
        },
    },

    // Track resolver for each infividual track (for getting author)
    Track: {
        // decoupling authorId from `parent` track
        author: ({ authorId }, _, { dataSources }) => {
            return dataSources.trackAPI.getAuthor(authorId);
        },

        modules: ({ id }, _, { dataSources }) => {
            return dataSources.trackAPI.getTrackModules(id);
        }
    },
}

module.exports = resolvers;