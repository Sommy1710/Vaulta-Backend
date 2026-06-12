import { SingleSavings } from "./singleSavingsSchema.js";
import { User } from "../auth/user.schema.js";

export const createSingleSavingsPlan = async (
    userId,
    amount
) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const interestRate = 10;
    const expectedInterest = (amount * interestRate) / 100;
    const totalPayout = amount + expectedInterest;

    const maturityDate = new Date();
    maturityDate.setMinutes(maturityDate.getMinutes() + 2);


    return await SingleSavings.create({
        user: userId,

        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,

        amountSaved: amount,
        interestRate,
        expectedInterest,
        totalPayout,
        maturityDate,
    });
};

/*export const getSavingsPayout = async (planId) => {
    const plan = await SingleSavings.findById(planId);
    if (!plan) throw new Error("Plan not found");

    const now = new Date();

    // If maturity date has passed, update status and payout
    if (plan.status === "active" && now >= plan.maturityDate) {
        plan.status = "matured";
        plan.expectedInterest = (plan.amountSaved * plan.interestRate) / 100;
        plan.totalPayout = plan.amountSaved + plan.expectedInterest;
        plan.lastCompoundedAt = plan.maturityDate;
        await plan.save();
    }

    if (plan.status !== "matured") {
        return {
            message: "Plan has not matured yet",
            total: plan.amountSaved,
        };
    }

    return {
        message: "Plan matured successfully",
        total: plan.totalPayout,
    };
};*/

