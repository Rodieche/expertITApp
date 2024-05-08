import { LogEntity, LogSeverityLEvel } from "../entities/log.entities";

export abstract class LogRepository {
    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLogs( severityLevel: LogSeverityLEvel ): Promise<LogEntity[]>;
}