import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String
  }
}, { timestamps: true, versionKey: false })

const AccountSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  balance: {
    type: Number
  }
}, { timestamps: true, versionKey: false })

export const User = mongoose.model("User", UserSchema)

export const Account = mongoose.model("Account", AccountSchema)
