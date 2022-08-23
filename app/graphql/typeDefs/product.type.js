const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const { AuthorType } = require("./public.type");
const { CategoryType } = require("./category.type")

const FeaturesType = new GraphQLObjectType({
    name: "FeaturesType",
    fields: {
        length: { type: GraphQLString },
        height: { type: GraphQLString },
        width: { type: GraphQLString },
        weight: { type: GraphQLString },
        colors: { type: new GraphQLList(GraphQLString) },
        madein: { type: GraphQLString }
    }
})


const ProductType = new GraphQLObjectType({
    name: "ProductType",
    fields: {
        title: { type: GraphQLString },
        short_text: { type: GraphQLString },
        text: { type: GraphQLString },
        ImagesURL: { type: new GraphQLList(GraphQLString) },
        tags: { type: new GraphQLList(GraphQLString) },
        category: { type: new GraphQLList(CategoryType) },
        price: { type: GraphQLInt },
        discount: { type: GraphQLInt },
        count: { type: GraphQLInt },
        price: { type: GraphQLInt },
        type: { type: GraphQLString },
        format: { type: GraphQLString },
        supplier: { type: AuthorType },
        features: { type: FeaturesType }
    }
})

module.exports = {
    ProductType
}
