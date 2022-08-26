const { GraphQLList } = require("graphql");
const { CategoryModel } = require("../../models/categories.model");
const { CategoryType } = require("../typeDefs/category.type");

const CategoriesResolver = {
    type: new GraphQLList(CategoryType),
    resolve : async () => {
        const categories = await CategoryModel.find({parent : undefined})
        return categories
    }
}

module.exports = {
    CategoriesResolver
}
