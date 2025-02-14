import fs from 'fs';
import path from 'path';

// ✅ Create logs directory if it doesn’t exist
const logsDir = path.join(__dirname, '../../logs'); // Adjust path if needed
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// ✅ Generate a unique log file for each run (date + time)
const timestamp = new Date().toISOString().replace(/T/, '_').replace(/:/g, '-').split('.')[0]; 
const logFilePath = path.join(logsDir, `rss_log_${timestamp}.txt`);

// ✅ Function to log informational messages
export function logInfo(message: string) {
    const formattedMessage = `[INFO] ${new Date().toISOString()} - ${message}`;
    console.log(formattedMessage);
    fs.appendFileSync(logFilePath, formattedMessage + '\n', 'utf8');
}

// ✅ Function to log error messages
export function logError(message: string) {
    const formattedMessage = `[ERROR] ${new Date().toISOString()} - ${message}`;
    console.error(formattedMessage);
    fs.appendFileSync(logFilePath, formattedMessage + '\n', 'utf8');
}
