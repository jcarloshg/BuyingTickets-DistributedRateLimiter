import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export function zodValidate(schema: ZodSchema<any>, property: 'body' | 'query' = 'body') {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[property]);
    if (!result.success) {
      return res.status(400).json({ error: result.error.flatten() });
    }
    req[property] = result.data;
    next();
  };
}
