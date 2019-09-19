import { Schema } from "mongoose";

const MediaSchema: Schema = new Schema(
    {
        type: {
            type: String,
            enum: ["image", "video"],
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        caption: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

const DateSchema: Schema = new Schema({
    day: {
        type: Number,
    },
    month: {
        type: Number,
    },
    year: {
        type: Number,
    },
});

/**
 * The actual structure of the Memento collection.
 */
export const MementoSchema: Schema = new Schema(
    {
        type: {
            type: String,
            enum: ["event", "object"],
            required: true,
        },
        uploader: {
            // uploader's userId
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        location: {
            type: String,
        },
        media: {
            type: [MediaSchema],
            default: [],
        },
        dates: {
            type: [DateSchema],
            default: [],
        },
        tags: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    },
);
