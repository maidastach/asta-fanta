import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema
(
  {
    user: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    teams: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Teams' } ],
    leagues: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Leagues' } ], //ref
    isAdminHere: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Leagues' } ], //ref
  },
  {
    timestamps: true,
  }
)


export const User = mongoose.model("Users", userSchema);
