import { LogEntity, LogSeverityLEvel } from "../entities/log.entities";

export abstract class LogDatasource {
    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLogs( severityLevel: LogSeverityLEvel ): Promise<LogEntity[]>;
}
