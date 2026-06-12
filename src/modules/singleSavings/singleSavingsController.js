import { asyncHandler } from "../../lib/util.js";
import * as singleSavingsService from "./singleSavingsService.js";
import { SingleSavings } from "./singleSavingsSchema.js";
import { SingleSavingsWithdrawal } from "./singleSavingsSchema.js";


export const createSingleSavingsPlan = asyncHandler(async (req, res) => {
    const userId = req.user?.id || req.user?._id;



    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

    const { amount } = req.body;

    if (!amount) {
        return res.status(400).json({
            success: false,
            message: "Amount is required",
        });
    }

    if (amount < 100) {
        return res.status(400).json({
            success: false,
            message: "Minimum savings amount is 100",
        });
    }

    const savingsPlan =
        await singleSavingsService.createSingleSavingsPlan(
            userId,
            Number(amount)
        );

    res.status(201).json({
        success: true,
        message: "Single savings plan created successfully",
        data: savingsPlan,
    });
});


/*export const getTotalYield = asyncHandler(async (req, res) => {
    const { planId } = req.params;

    const payout = await singleSavingsService.getSavingsPayout(planId);

    res.status(200).json({
        success: true,
        data: payout,
    });
});*/

export const getTotalYield = asyncHandler(async (req, res) => {
    const { planId } = req.params;

    const userId = req.user?.id || req.user?._id;

    const plan = await SingleSavings.findOne({
        _id: planId,
        user: userId,
    });

    if (!plan) {
        return res.status(404).json({
            success: false,
            message: "Plan not found or you are not authorized to access it",
        });
    }

    const now = new Date();

    // If maturity date has passed, update status and payout
    if (plan.status === "active" && now >= plan.maturityDate) {
        plan.status = "matured";
        plan.expectedInterest =
            (plan.amountSaved * plan.interestRate) / 100;

        plan.totalPayout =
            plan.amountSaved + plan.expectedInterest;

        plan.lastCompoundedAt = plan.maturityDate;

        await plan.save();
    }

    if (plan.status !== "matured") {
        return res.status(200).json({
            success: true,
            data: {
                message: "Plan has not matured yet",
                total: plan.amountSaved,
            },
        });
    }

    return res.status(200).json({
        success: true,
        data: {
            message: "Plan matured successfully",
            total: plan.totalPayout,
        },
    });
});

export const getMySavingsHistory = asyncHandler(async (req, res) => {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }

    const savingsHistory = await SingleSavings.find({
        user: userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: savingsHistory.length,
        data: savingsHistory,
    });
});

/*export const withdrawSingleSavings = asyncHandler(async (req, res) => {
    const { planId } = req.params;
    const { amount } = req.body;

    const userId = req.user?.id || req.user?._id;


    const plan = await SingleSavings.findOne({
        _id: planId,
        user: userId,
    });

    if (!plan) {
        return res.status(404).json({
            success: false,
            message: "Savings plan not found",
        });
    }

    if (!amount || amount <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid withdrawal amount",
        });
    }

    // Not matured yet
    if (plan.status !== "matured") {
        if (amount > plan.amountSaved) {
            return res.status(400).json({
                success: false,
                message:
                    "Withdrawal amount cannot exceed amount saved",
            });
        }

        plan.amountSaved -= amount;

        // Recalculate interest and payout
        plan.expectedInterest =
            (plan.amountSaved * plan.interestRate) / 100;

        plan.totalPayout =
            plan.amountSaved + plan.expectedInterest;

        await plan.save();

        return res.status(200).json({
            success: true,
            message: "Withdrawal successful",
            withdrawn: amount,
            remainingBalance: plan.amountSaved,
        });
    }

    // Matured
    if (amount > plan.totalPayout) {
        return res.status(400).json({
            success: false,
            message:
                "Withdrawal amount cannot exceed available payout",
        });
    }

    plan.totalPayout -= amount;

    await plan.save();

    if (plan.totalPayout <= 0) {
        plan.status = "withdrawn";
        await plan.save();
    }

    return res.status(200).json({
        success: true,
        message: "Withdrawal successful",
        withdrawn: amount,
        remainingBalance: plan.totalPayout,
    });
});*/

export const withdrawSingleSavings = asyncHandler(async (req, res) => {
    const { planId } = req.params;
    const { amount } = req.body;

    const userId = req.user?.id || req.user?._id;

    const plan = await SingleSavings.findOne({
        _id: planId,
        user: userId,
    });

    if (!plan) {
        return res.status(404).json({
            success: false,
            message: "Savings plan not found",
        });
    }

    if (!amount || amount <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid withdrawal amount",
        });
    }

    // NOT MATURED
    if (plan.status !== "matured") {
        if (amount > plan.amountSaved) {
            return res.status(400).json({
                success: false,
                message: "Withdrawal amount cannot exceed amount saved",
            });
        }

        plan.amountSaved -= amount;

        plan.expectedInterest =
            (plan.amountSaved * plan.interestRate) / 100;

        plan.totalPayout =
            plan.amountSaved + plan.expectedInterest;

        await plan.save();

        // Save withdrawal history
        await SingleSavingsWithdrawal.create({
            user: userId,
            savingsPlan: plan._id,
            amount,
        });

        return res.status(200).json({
            success: true,
            message: "Withdrawal successful",
            withdrawn: amount,
            remainingBalance: plan.amountSaved,
        });
    }

    // MATURED
    if (amount > plan.totalPayout) {
        return res.status(400).json({
            success: false,
            message: "Withdrawal amount cannot exceed available payout",
        });
    }

    plan.totalPayout -= amount;

    if (plan.totalPayout <= 0) {
        plan.status = "withdrawn";
    }

    await plan.save();

    // Save withdrawal history
    await SingleSavingsWithdrawal.create({
        user: userId,
        savingsPlan: plan._id,
        amount,
    });

    return res.status(200).json({
        success: true,
        message: "Withdrawal successful",
        withdrawn: amount,
        remainingBalance: plan.totalPayout,
    });
});

export const getSingleSavingsWithdrawalHistory = asyncHandler(async (req, res) => {
    const userId = req.user?.id || req.user?._id;

    const withdrawals = await SingleSavingsWithdrawal.find({
        user: userId,
    })
        .populate(
            "savingsPlan",
            "amountSaved totalPayout status"
        )
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: withdrawals.length,
        data: withdrawals,
    });
});