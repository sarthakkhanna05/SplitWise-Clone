import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import authRoutes from "./Routes/auth.js"
import userRoutes from "./Routes/user.js"
import groupRoutes from "./Routes/group.js"
import dashboardRoutes from "./Routes/dashboard.js"
import transactionRoutes from "./Routes/transaction.js"
import noteRoutes from "./Routes/note.js"
import cookieParser from "cookie-parser";
import session from "express-session";
import {
    graphqlHTTP
} from 'express-graphql'
import graphqlSchema from "./GraphQl/Schema/index.js";
import graphqlResolvers from "./GraphQl/Resolvers/index.js";



import {
    kafka
}
from "./Kafka/kafka/index.js";
import modules from "./Kafka/modules.js";
import passport from "passport";
// import passportLocal from "passport-local"

const dot = dotenv.config();


let callAndWait = () => {
    console.log('Kafka client has not connected yet, message will be lost');
};

(async () => {
    try {

        if (process.env.MOCK_KAFKA === 'false') {
            const k = await kafka();
            callAndWait = k.callAndWait;
        } else {
            callAndWait = async (fn, ...params) => modules[fn](...params);
            console.log('Connected to dev kafka');
        }
    } catch (error) {
        console.log(error)
    }
})();


const app = express();



app.use(cors())
app.use(
    "/graphql",
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolvers,
        graphiql: true,
    })
)
app.use(session({
    secret: process.env.TOKEN_SECRET,
    resave: true,
    saveUninitialized: true
}))

app.use(cookieParser(process.env.TOKEN_SECRET))

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/group', groupRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/note', noteRoutes);
app.use('/api/transaction', transactionRoutes);

app.use(express.urlencoded({
    extended: true
}));


// app.post('/sum', async (req, res) => {
//     const sum = await callAndWait('sum', req.body.a, req.body.b);
//     res.json({
//         sum
//     });
// })

// app.post('/sub', async (req, res) => {
//     const sub = await callAndWait('sub', req.body.a, req.body.b);
//     res.json({
//         sub
//     });
// })

app.get('/', (req, res) => {
    res.send("You are on home")
    //console.log("You are on home")
});

mongoose.connect(process.env.DB_CONNECTION_SPLITWISE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log(`User Hanish connected to ${process.env.DB} DB`));


app.listen(process.env.PORT, () => console.log(`server started on port ${process.env.PORT}`));

export {
    callAndWait
}