const userModel = require("../config");
const { ApolloServer } = require("apollo-server");
const typeDefs = `
type Query{
users:[User!],
user(id:ID!):User
}

type Mutation{
    addUser(name:String!,role:String!):User,
    updateUser(id:ID!,name:String,role:String):User,
    deleteUser(id:ID!):User
}
type User{
    id:ID!,
    name:String!,
    role:String!
}
`;

const resolvers = {
  Query: {
    users: async () => {
      try {
        let storedUsers = await userModel.find();

        return storedUsers;
      } catch {
        (err) => console.log("Something wrong in the DB", err);
      }
    },
    user: async (parent, args) => {
      try {
        let storedUsers = await userModel.findById(args.id);

        return storedUsers;
      } catch {
        (err) => console.log("Something wrong in the DB", err);
      }
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = {
        name: args.name,
        role: args.role,
      };
      try {
        let createdUser = await userModel.create(user);

        return {
          id: createdUser._id,
          name: createdUser.name,
          role: createdUser.role,
        };
      } catch {
        (err) => console.log("Something wrong in the DB", err);
      }
    },
    updateUser: async (parent, args) => {
      const user = {
        name: args.name,
        role: args.role,
      };
      try {
        let updatedUser = await userModel.findByIdAndUpdate(args.id, user);

        return updatedUser;
      } catch {
        (err) => console.log("Something wrong in the DB", err);
      }
    },
    deleteUser: async (parent, args) => {
      try {
        let deletedUser = await userModel.findByIdAndDelete(args.id);

        return deletedUser;
      } catch {
        (err) => console.log("Something wrong in the DB", err);
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen()
  .then(({ url }) => console.log("Server Started at the port", url));
