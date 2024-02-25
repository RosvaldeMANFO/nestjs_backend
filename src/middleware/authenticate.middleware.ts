import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

export default class AuthenticateMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.query.payload = decoded;
      next();
    } catch (error) {
      res.status(403).json({ message: 'Invalid token' });
    }
  }
}