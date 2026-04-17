import express from 'express';
import authRouter from './routes/auth.route.js';
import usersRouter from './routes/users.route.js';
import authenicateMiddleware from './middlewares/authenticate.middleware.js';
import notFoundMiddleware from './middlewares/notFound.middleware.js';
import errorMidddleware from './middlewares/error.middleware.js';
import postsRouter from './routes/posts.route.js';
import artistsRouter from './routes/artist.route.js';
import eventsRouter from './routes/events.route.js';
import adminRouter from './routes/admin.route.js';
import chatRouter from './routes/chat.route.js';
import cors from 'cors';

const app = express()

app.use(cors({
    origin: true,
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials:true
}))

app.use(express.json())

app.use('/auth',authRouter)

app.use('/chats', authenicateMiddleware, chatRouter)

app.use('/users',authenicateMiddleware,usersRouter)

app.use('/admin',adminRouter)

app.use('/posts',authenicateMiddleware,postsRouter)

app.use('/artists',artistsRouter)

app.use('/events',eventsRouter)

//not found
app.use(notFoundMiddleware)

//error middleware
app.use(errorMidddleware)

export default app