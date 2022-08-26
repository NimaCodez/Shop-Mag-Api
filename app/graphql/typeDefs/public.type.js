const { GraphQLObjectType, GraphQLString, GraphQLScalarType } = require("graphql");
const { toObject, parseLiteral } = require("../utils");


const AnyType = new GraphQLScalarType({
    name: "anyType",
    parseValue : toObject,
    serialize : toObject,
    parseLiteral : parseLiteral,
})

const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: {
        _id: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString }
    }
})

const PublicCategoryType = new GraphQLObjectType({
    name: "PublicCategoryType",
    fields: {
        _id : {type : GraphQLString},
        title : {type : GraphQLString},
    }
})

module.exports = {
    UserType,
    AnyType,
    PublicCategoryType
}
