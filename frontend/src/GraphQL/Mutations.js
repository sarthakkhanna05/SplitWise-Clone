import {
  gql
} from "@apollo/client"

export const LOGIN_USER = gql `
    mutation loginUser($email: String!, $password: String!){
        loginUser(email:$email,password:$password) {
         _id
         first_name
         last_name
    }
  }
`
export const UPDATE_USER = gql `
    mutation updateUser($_id:String, !$name:String!, $email: String!, $password: String!, $time_zone:String, $language:String, $currency:String, $phone:String){
        updateUser(_id:$_id, name: $name, email:$email, password:$password, time_zone:$time_zone, language:$language, currency:$currency, phone:$phone) {
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

export const ADD_USER = gql `
    mutation addUser($name:String!, $email: String!, $password: String!){
        addUser(name: $name, email:$email,password:$password) {
         _id
         first_name
         last_name
         email
    }
  }
`


export const GET_INVITATIONS = gql `
    mutation getInvitations($userId:ID!){
        getInvitations(userId:$userId) {
            invitations
    }
  }
`
export const ACCEPT_INVITATION = gql `
    mutation acceptInvitation($userId:ID!, $invitationId:ID!){
        acceptInvitation(userId:$userId, invitationId:$invitationId) {
            message
    }
  }
`

export const ADD_TRANSACTION = gql `
    mutation addTransaction($groupId:ID!, $userId:ID!, $description:String, $amount:String){
        addTransaction(groupId:$groupId, userId: $userId, description:$description, amount:$amount) {
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

export const ADD_SETTLE_TRANSACTION = gql `
    mutation addSettleTransaction($groupId:ID!, $userId:ID!, $description:String, $amount:String){
        addSettleTransaction(groupId:$groupId, userId: $userId, description:$description, amount:$amount) {
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
export const ADD_GROUP = gql `
    mutation addGroup($emails:[String!]!, $creator:ID!, $name:String){
        addGroup(emails:$emails, creator: $creator, name:$name) {
            _id
        name
        picture
        members
        transactions
        balances
    
    }
  }
`