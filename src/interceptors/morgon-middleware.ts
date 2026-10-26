import * as morgan from 'morgan';
import { Request, Response } from 'express';
import { createWriteStream } from 'fs';
import { join } from 'path';

const logStream = createWriteStream(join(__dirname, '../../logs/access.log'), {
  flags: 'a', // append mode
});

export const morganMiddleware = morgan('combined', {
  stream: logStream,
  //   skip: (req: Request, res: Response) => res.statusCode < 100, // log only errors (optional)
});
