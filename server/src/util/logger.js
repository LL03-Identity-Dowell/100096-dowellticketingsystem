import util from 'util';
import 'winston-mongodb';
import { createLogger, format, transports } from 'winston';
import config from '../config/config.js';
import { EApplicationEnvironment } from '../constant/application.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { red, blue, yellow, green, magenta } from 'colorette';
import * as sourceMapSupport from 'source-map-support';
import fs from 'fs';

// Linking Trace Support
sourceMapSupport.install();

// Correctly derive __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to colorize log levels
const colorizeLevel = (level) => {
    switch (level) {
        case 'ERROR':
            return red(level);
        case 'INFO':
            return blue(level);
        case 'WARN':
            return yellow(level);
        default:
            return level;
    }
};

// Console log format for development
const consoleLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info;

    const customLevel = colorizeLevel(level.toUpperCase());
    const customTimestamp = green(timestamp);
    const customMessage = message;
    const customMeta = util.inspect(meta, {
        showHidden: false,
        depth: null,
        colors: true,
    });

    return `${customLevel} [${customTimestamp}] ${customMessage}\n${magenta('META')} ${customMeta}\n`;
});

// Console transport for development environment
const consoleTransport = () => {
    if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
        return [
            new transports.Console({
                level: 'info',
                format: format.combine(format.timestamp(), consoleLogFormat),
            }),
        ];
    }
    return [];
};

// File log format for file transport
const fileLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info;
    const logMeta = {};

    for (const [key, value] of Object.entries(meta)) {
        if (value instanceof Error) {
            logMeta[key] = {
                name: value.name,
                message: value.message,
                trace: value.stack || '',
            };
        } else {
            logMeta[key] = value;
        }
    }

    const logData = {
        level: level.toUpperCase(),
        message,
        timestamp,
        meta: logMeta,
    };

    return JSON.stringify(logData, null, 4);
});

// Define the logs directory using path.resolve
const logDir = path.resolve(__dirname, '../../logs');

// Ensure the logs directory exists
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

// File transport for saving logs to a file
const fileTransport = () => {
    return [
        new transports.File({
            filename: path.join(logDir, `${config.ENV}.log`),
            level: 'info',
            format: format.combine(format.timestamp(), fileLogFormat),
        }),
    ];
};

// MongoDB transport for saving logs to MongoDB
const mongodbTransport = () => {
    return [
        new transports.MongoDB({
            level: 'info',
            db: config.DATABASE_URL,
            metaKey: 'meta',
            expireAfterSeconds: 3600 * 24 * 30,
            options: {
                useUnifiedTopology: true,
            },
            collection: 'application-logs',
        }),
    ];
};

// Create and export the logger
export default createLogger({
    defaultMeta: {
        meta: {},
    },
    transports: [...fileTransport(), ...mongodbTransport(), ...consoleTransport()],
});
