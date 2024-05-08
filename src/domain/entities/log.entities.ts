export enum LogSeverityLEvel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export class LogEntity {
    public level:  LogSeverityLEvel;
    public message: string;
    public createdAt: Date;

    constructor(message: string, level: LogSeverityLEvel){
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }
}