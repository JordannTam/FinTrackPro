import { NextResponse } from "next/server";

export const clerkMiddleware = () => (req, res, next) => {
  req.auth = { userId: 'test-user-id' }; // Mock user ID
  next();
};