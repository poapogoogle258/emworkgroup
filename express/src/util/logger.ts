import winston from 'winston';
import { TransformableInfo } from 'logform';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';

const logDir = path.join(__dirname, '..', '..',"..", 'logs');

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.json(),
  winston.format.prettyPrint(),
  winston.format.printf((info) => {
    return JSON.stringify(info);
  })
); 

const logger = winston.createLogger({
  format: logFormat,
  transports: [
    new DailyRotateFile({
        filename: path.join(logDir, 'error-%DATE%.log'),
        level: 'error',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '30d',
      }),
      new DailyRotateFile({
        filename: path.join(logDir, 'warn-%DATE%.log'),
        datePattern: 'YYYY-MM-DD',
        level : "warn",
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '30d',
      }),
      new DailyRotateFile({
        filename: path.join(logDir, 'info-%DATE%.log'),
        datePattern: 'YYYY-MM-DD',
        maxFiles: '30d',
        level: 'info',
      }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf((info: TransformableInfo) => {
          return `${info.timestamp} ${info.level}: ${info.message}`;
        })
      ),
    }),
  ],
});


export default logger;

