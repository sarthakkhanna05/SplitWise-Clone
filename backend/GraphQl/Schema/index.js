import {
    buildSchema
} from "graphql";

const graphqlSchema = buildSchema(`
 type User {
     _id:ID!
     first_name:String
     last_name:String
     email:String
     password:String
     profile_picture:String
     phone_number:String
     time_zone:String
     language:String
     currency:String
     groups:[String]
     invitations:[ID]
 }

 type Message{
     message:String!
 }

 type Group {
    _id:ID!
    name:String
    members:[String]
    picture:String
    transactions:[String]
    balances:String
}

 type Transaction {
    _id:ID!
    settle_up:Boolean
    payer:String
    members_involved:String
    group_id:ID
    description:String
    amount:String
    timestamp:String
}

 
 type Query {
     users:[User]
     user(userId: ID!):User
     transactions(groupId:ID!):[Transaction]
     userTransaction(userId:ID!):[Transaction]
     transaction(transactionId:ID!):Transaction
     groups:[Group]
     group(groupId:ID!):Group
 }

 type Mutation {
    loginUser(email: String!, password: String!): User
    addUser(name: String, email: String!, password: String!): User
    updateUser(_id:String!, name: String, email: String, password: String, time_zone:String, language:String, currency:String, phone:String): User
    getInvitations(userId:ID!): User
    acceptInvitation(userId:ID!, invitationId:ID!): Message
    addTransaction(groupId:ID!, userId:ID!, description: String, amount: String): Transaction
    addSettleTransaction(groupId:ID!, userId:ID!, description: String, amount: String): Transaction
    addGroup(emails: [String!]!, creator:ID!, name:String!):Group
}
 
 schema {
    query: Query
    mutation: Mutation
  }

 `)


export default graphqlSchema