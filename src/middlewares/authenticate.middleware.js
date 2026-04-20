import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { getUserby } from "../service.js/auth.service.js";

export default async function authenicateMiddleware(req, res, next) {
  const authorization = req.headers.authorization;

  // บรรทัดนี้ช่วยเช็คใน Terminal ว่า Frontend ส่งมาจริงไหม
  console.log("--- Checking Header ---");
  console.log("Auth Value:", authorization);

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(
      createHttpError[401]("Unauthorized 1: No Token or Wrong Format")
    );
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return next(createHttpError[401]("Unauthorized 2: Token is missing"));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const foundUser = await getUserby("id", payload.id);

    if (!foundUser) {
      return next(createHttpError[401]("Unauthorized 3: User not found"));
    }

    const { createdAt, updatedAt, ...userInfo } = foundUser;

    req.user = userInfo;
    next();
  } catch (err) {
    return next(createHttpError[401]("Unauthorized: Invalid Token"));
  }
}
