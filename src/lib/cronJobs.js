/*import cron from "node-cron";
import { SingleSavings } from "../modules/singleSavings/singleSavingsSchema.js";

cron.schedule("* * * * *", async () => {
    const now = new Date();

    // Step 1: Activate compounding by maturing plans
    const activePlans = await SingleSavings.find({
        status: "active",
        maturityDate: { $lte: now },
    });

    for (const plan of activePlans) {
        plan.status = "matured";
        plan.lastCompoundedAt = now;

        await plan.save();

        console.log(`Plan ${plan._id} matured`);
    }

    // Step 2: Compound matured plans forever
    const maturedPlans = await SingleSavings.find({
        status: "matured",
        amountSaved: { $gte: 100 },
    });

    for (const plan of maturedPlans) {
        if (!plan.lastCompoundedAt) {
            plan.lastCompoundedAt = now;
            await plan.save();
            continue;
        }

        const elapsed =
            now.getTime() -
            plan.lastCompoundedAt.getTime();

        if (elapsed >= 2 * 60 * 1000) {
            const interest =
                (plan.totalPayout * plan.interestRate) / 100;

            plan.totalPayout += interest;
            plan.expectedInterest += interest;

            plan.lastCompoundedAt = now;

            await plan.save();

            console.log(
                `Plan ${plan._id} compounded. New payout: ${plan.totalPayout}`
            );
        }
    }
});*/
import cron from "node-cron";
import { SingleSavings } from "../modules/singleSavings/singleSavingsSchema.js";

cron.schedule("* * * * *", async () => {
    console.log("=================================");
    console.log("Checking for matured savings plans...");
    console.log("Current Time:", new Date());
    console.log("=================================");

    const now = new Date();

    // Step 1: Activate compounding by maturing plans
    const activePlans = await SingleSavings.find({
        status: "active",
        maturityDate: { $lte: now },
    });

    console.log(`Found ${activePlans.length} active plans ready to mature`);

    for (const plan of activePlans) {
        console.log(`Maturing plan: ${plan._id}`);

        plan.status = "matured";
        plan.lastCompoundedAt = now;

        await plan.save();

        console.log(`Plan ${plan._id} matured successfully`);
    }

    // Step 2: Compound matured plans forever
    const maturedPlans = await SingleSavings.find({
        status: "matured",
        amountSaved: { $gte: 100 },
    });

    console.log(`Found ${maturedPlans.length} matured plans`);

    for (const plan of maturedPlans) {
        console.log("---------------------------------");
        console.log("Checking plan:", plan._id);
        console.log("Status:", plan.status);
        console.log("Amount Saved:", plan.amountSaved);
        console.log("Current Payout:", plan.totalPayout);
        console.log("Interest Rate:", plan.interestRate);
        console.log("Last Compounded At:", plan.lastCompoundedAt);

        if (!plan.lastCompoundedAt) {
            console.log(
                `Plan ${plan._id} has no lastCompoundedAt. Initializing...`
            );

            plan.lastCompoundedAt = now;
            await plan.save();

            continue;
        }

        const elapsed =
            now.getTime() -
            plan.lastCompoundedAt.getTime();

        console.log("Elapsed Time (ms):", elapsed);
        console.log(
            "Required Time (ms):",
            2 * 60 * 1000
        );

        if (elapsed >= 2 * 60 * 1000) {
            const interest =
                (plan.totalPayout * plan.interestRate) / 100;

            console.log("Interest to Add:", interest);

            plan.totalPayout += interest;
            plan.expectedInterest += interest;

            plan.lastCompoundedAt = now;

            console.log("New Total Payout:", plan.totalPayout);
            console.log("New Expected Interest:", plan.expectedInterest);

            await plan.save();

            console.log(
                `Plan ${plan._id} compounded successfully`
            );
        } else {
            console.log(
                `Plan ${plan._id} not ready for compounding yet`
            );
        }
    }
});