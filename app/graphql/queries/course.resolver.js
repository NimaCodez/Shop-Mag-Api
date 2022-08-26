const { GraphQLList } = require("graphql")
const { CourseModel } = require("../../models/course.model")
const { CourseType } = require("../typeDefs/course.type")

const CourseResolver = {
    type: new GraphQLList(CourseType),
    resolve: async () => {
        return await CourseModel.find({}).populate([{ path: "teacher" }, { path: "category" }])
    }
}

module.exports = {
    CourseResolver
}