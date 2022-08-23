const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { CategoriesResolver } = require("./queries/category.resolver");
const { ProductResolver } = require("./queries/product.resolver");

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        blogs: BlogResolver,
        products: ProductResolver,
        // categories : CategoriesResolver,
    }
})

const RootMutations = new GraphQLObjectType({
    name: "RootMutations",
    fields: {

    }
})

const graphqlSchema = new GraphQLSchema({
    query: RootQuery,
    // mutation: RootMutations,
})

module.exports = {
    graphqlSchema,
}
