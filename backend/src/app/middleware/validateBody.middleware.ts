import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

/**
 * Middleware to validate request body using passed Zod schema.
 * The middleware throws 400 (Bad Request) response if body isn't valid.
 *
 * @template T - Type of the expected request body
 * @param {ZodSchema<T>} schema - The Zod schema to validate the request body against
 * @returns {(req: Request, res: Response, next: NextFunction) => void} Middleware function
 *
 * @example
 * app.post("/users", validateBody(createUserSchema), (req, res) => {
 *   const { email, password } = req.body;
 *   res.json({ user });
 * });
 */
export function validateBody<T>(
  schema: z.ZodSchema<T>
): (req: Request, res: Response, next: NextFunction) => void {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      // validate req.body using passed schema
      const parsed = schema.parse(req.body);

      // add validated body to the request
      req.body = parsed;

      next();
    } catch (err) {
      // throw 400 Bad Request response if req.body isn't valid
      if (err instanceof z.ZodError) {
        return res.status(400).json({ validationErrors: err.issues });
      }
      next(err);
    }
  };
}
