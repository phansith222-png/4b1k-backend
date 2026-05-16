import express from "express";
import helmet from "helmet";
import passport from "./oauthConfig/passport.js";
import authRouter from "./routes/auth.route.js";
import usersRouter from "./routes/users.route.js";
import authenicateMiddleware from "./middlewares/authenticate.middleware.js";
import notFoundMiddleware from "./middlewares/notFound.middleware.js";
import errorMidddleware from "./middlewares/error.middleware.js";
import postsRouter from "./routes/posts.route.js";
import artistsRouter from "./routes/artist.route.js";
import eventsRouter from "./routes/events.route.js";
import adminRouter from "./routes/admin.route.js";
import chatRouter from "./routes/chat.route.js";
import cors from "cors"
import { apiLimiter } from "./middlewares/rateLimiter.middleware.js";

const app = express()

app.use(helmet())

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173']

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) cb(null, true)
    else cb(new Error('Not allowed by CORS'))
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}))

app.use(apiLimiter)
app.use(express.json({ limit: "10mb" }));

app.use("/uploads", express.static("public/uploads"));

app.use(passport.initialize()); // เอาไว้ใช้กับ Oauth ในการล็อคอินด้วย Google, Facebook, X

app.use("/auth", authRouter);

app.use("/chats", authenicateMiddleware, chatRouter);

app.use("/users", authenicateMiddleware, usersRouter);

app.use("/admin", adminRouter);

app.use("/posts", authenicateMiddleware, postsRouter);

app.use("/artists", artistsRouter);

app.use("/events", eventsRouter);

//not found
app.use(notFoundMiddleware);

//error middleware
app.use(errorMidddleware);

export default app;
