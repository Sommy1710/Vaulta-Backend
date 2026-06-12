import {Schema, model} from "mongoose";

const SingleSavingsSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        planType: {
            type: String,
            enum: ["single"],
            default: "single",
        },
        amountSaved: {
            type: Number,
            required: true,
            //min: 100,
        },
        interestRate: {
            type: Number,
            default: 10,
        },

        expectedInterest: {
            type: Number,
            required: true,
        },
        totalPayout: {
            type: Number,
            required: true,
        },
        startDate: {
            type: Date,
            default: Date.now,
        },
        maturityDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "active", "matured", "withdrawn"],
            default: "pending",
        },
        lastCompoundedAt: {type: Date},
    },
    {timestamps: true}
);

export const SingleSavings = model("SingleSavings", SingleSavingsSchema);


const SingleSavingsWithdrawalSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        savingsPlan: {
            type: Schema.Types.ObjectId,
            ref: "SingleSavings",
            required: true,
        },

        amount: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: ["successful"],
            default: "successful",
        },
    },
    {
        timestamps: true,
    }
);

export const SingleSavingsWithdrawal = model(
    "Withdrawal",
    SingleSavingsWithdrawalSchema
);