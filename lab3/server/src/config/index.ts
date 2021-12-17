import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT!;
export const NODE_ENV = process.env.NODE_ENV!;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
export const REFRESH_TOKEN_NAME = process.env.REFRESH_TOKEN_NAME!;
