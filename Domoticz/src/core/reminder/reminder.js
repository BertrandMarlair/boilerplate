import {CronJob} from "cron"
//////////// RUN EVERY FRIDAY AT 10:00

export const summary = () => {
    const summaryCronJob = new CronJob('00 00 10 * * 5', async () => {
        console.log("RUN EVERY FRIDAY AT 10:00")
    }, null, true, "Europe/Brussels");

    summaryCronJob.start();
}
