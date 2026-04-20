import express from "express";
import session from "express-session";
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

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, //1 วัน
    },
  })
);

app.use(passport.initialize()); // เอาไว้ใช้กับ Oauth ในการล็อคอินด้วย Google, Facebook, X

app.use("/chats", authenicateMiddleware, chatRouter);

app.use("/users", authenicateMiddleware, usersRouter);

app.use("/auth", authRouter);

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
