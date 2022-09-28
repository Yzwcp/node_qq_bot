const schedule = require('node-schedule');

class ScheduleCron{
    self
    // 6个占位符从左到右分别代表：秒、分、时、日、月、周几 '30 * * * * *'
    constructor(cron,cb) {
       this.self = schedule.scheduleJob(cron,cb);
    }
    cancel(){
        this.self.cancel()
    }
}
module.exports= {
    scheduleCron: (cron, cb) => new ScheduleCron(cron, cb)
}

