import express from 'express';
import authRouter from './routes/auth.route.js';
import usersRouter from './routes/users.route.js';
import authenicateMiddleware from './middlewares/authenticate.middleware.js';
import notFoundMiddleware from './middlewares/notFound.middleware.js';
import errorMidddleware from './middlewares/error.middleware.js';

const app = express()

app.use(express.json())

app.use('/auth',authRouter)

app.use('/users',authenicateMiddleware,usersRouter)

//not found
app.use(notFoundMiddleware)

//error middleware
app.use(errorMidddleware)

export default app