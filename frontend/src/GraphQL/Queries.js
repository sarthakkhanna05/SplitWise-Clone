import {
    gql
} from "@apollo/client"

export const GET_USERS = gql `
query user($userId: ID!){
    user(userId:$userId {
        _id
        first_name
        last_name
        email
        password
        phone_number
        time_zone
        language
        currency
        invitations
        groups
    }
 }
`

export const GET_ALL_USERS = gql `
    query{
        users {
         _id
        first_name
        last_name
        email
        password
        phone_number
        time_zone
        language
        currency
        invitations
        groups
    }
  }
`

export const GET_TRANSACTIONS = gql `
query transactions($groupId: ID!){
    transactions(groupId:$groupId {
        _id
        settle_up
        payer
        members_involved
        group_id
        description
        amount
        timestamp
    }
 }
`

export const GET_USER_TRANSACTIONS = gql `
query userTransactions($userId: ID!){
    userTransactions(userId:$userId {
        _id
        settle_up
        payer
        members_involved
        group_id
        description
        amount
        timestamp
    }
 }
`

export const GET_TRANSACTION = gql `
query transaction($transactionId: ID!){
    transaction(transactionId:$transactionId {
        _id
        settle_up
        payer
        members_involved
        group_id
        description
        amount
        timestamp
    }
 }
`

export const GET_GROUP = gql `
query group($groupId: ID!){
    group(groupId:$groupId {
        _id
        name
        picture
        members
        transactions
        balances
    }
 }
`

export const GET_GROUPS = gql `
query{
    groups {
        _id
        name
        picture
        members
        transactions
        balances    
    }
}
`