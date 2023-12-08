import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.printf((info) => `${info.message}`),
  ),
  defaultMeta: {},
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "info.log" }),
  ],
});

const log = (...messages: any[]): void => {
  logger.info(
    messages
      .map((msg) => (typeof msg === "string" ? msg : JSON.stringify(msg)))
      .join(" "),
  );
};

export default log;
