import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';

export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.cli(),
        format.timestamp(),
        format.printf((info) => {
          return `${info.timestamp} ${info.level}: ${info.message}`;
        }),
      ),
    }),
  ],
});
