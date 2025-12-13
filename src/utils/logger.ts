import { formatTime } from './date';
enum LogLevel {
	Info = 'info',
	Warning = 'warning',
	Debug = 'debug',
	Error = 'error',
}

// FIXME: set webpack mode to prod when project will be completed
const onDev = process.env.NODE_ENV === 'development';

function _log(logLevel: LogLevel, message: string, payload: any): string {
	if (!onDev) return '';
	const _payload = payload ?? '';
	const _message = `[${logLevel}] ${formatTime(new Date())} \u{02192} ${message}`; // 02192 - right arrow
	switch (logLevel) {
		case LogLevel.Info:
			console.info(_message, _payload);
			break;
		case LogLevel.Warning:
			console.warn(_message, _payload);
			break;
		case LogLevel.Debug:
			console.debug(_message, _payload);
			break;
		case LogLevel.Error:
			console.error(_message, _payload);
			break;
	}
	return message;
}

export function log(message: string, payload: any = null): string {
	return _log(LogLevel.Info, message, payload);
}
export function warn(message: string, payload: any = null): string {
	return _log(LogLevel.Warning, message, payload);
}
export function error(message: string, payload: any = null): string {
	return _log(LogLevel.Error, message, payload);
}
export function debug(message: string, payload: any = null): string {
	return _log(LogLevel.Debug, message, payload);
}
