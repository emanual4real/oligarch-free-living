import { compare, hash } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { config } from "../config";

const saltRounds = 10;

export const hashPassword = async (password: string) => {
  return await hash(password, saltRounds);
};

export const comparePassword = async (
  plainTextPassword: string,
  hashedPassword: string
) => {
  return await compare(plainTextPassword, hashedPassword);
};

export const decodeToken = (req: Request) => {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, config.authSecret);

    return decodedToken;
  } else {
    return null;
  }
};

export const authenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const decodedToken = decodeToken(req);

  if (decodedToken === null) {
    res.status(403).send();
  } else {
    next();
  }
};
