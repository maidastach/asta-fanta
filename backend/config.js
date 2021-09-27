import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT || 4201,
    MONGODB_URL: process.env.MONGODB_URL,
    MONGODB_CONFIG: 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        },
    SESSION_OPTIONS: 
        {
            cookie:
                {
                    maxAge: 2 * 24 * 60 * 60 * 1000,
                    secure: false,
                    httpOnly: true,
                },
            saveUninitialized: false,
            secret: 'secretTemporary',
            store: MongoStore.create( { mongoUrl: process.env.MONGODB_URL } ),
            resave: false,
        }
};