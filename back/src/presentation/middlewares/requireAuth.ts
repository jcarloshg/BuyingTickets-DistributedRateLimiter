import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme-this-is-insecure';

/**
 * Express middleware to validate JWT from the Authorization header.
 * If valid: adds user payload to req.user.
 * If missing or invalid: responds with 401 Unauthorized.
 */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  // Get Authorization: Bearer <token>
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header.' });
  }

  const token = authHeader.slice('Bearer '.length);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Attach user info to request for controllers/handlers
    (req as any).user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
}
