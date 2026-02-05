export const typeDefs = `
  type Query {
    getUsers: [User]
    getUserById(id: ID!): User
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      age: Int
      isActive: Int
    ): User

    updateUser(
      id: ID!
      input: UpdateUserInput!
    ): User

    deleteUser(id: ID!): Boolean
  }

  type User {
    id: ID
    name: String
    email: String
    age: Int
    isActive: Int
  }

  input UpdateUserInput {
    name: String
    email: String
    age: Int
    isActive: Int
  }
`;
