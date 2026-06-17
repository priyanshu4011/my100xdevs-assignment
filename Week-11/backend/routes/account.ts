import { Router, type Request, type Response } from "express";
import { Account } from "../db";
import mongoose from "mongoose";
import { TransferSchema } from ".";

const router = Router()

router.get("/balance", async (req: Request, res: Response) => {
  const account = await Account.findOne({ userId: req.userId });

  if (!account) {
    return res.status(404).json({ message: "account not found" });
  }

  return res.status(200).json({
    message: "balance fetched",
    balance: account.balance,
  });
})

router.post("/transfer", async (req: Request, res: Response) => {

  // Start a MongoDB session for atomic transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const parsedData = TransferSchema.safeParse(req.body);

    if (!parsedData.success) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "invalid input", errors: parsedData.error.flatten() });
    }

    const { to, amount } = parsedData.data;

    // Prevent self-transfer
    if (to === req.userId?.toString()) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "cannot transfer to yourself" });
    }

    // Fetch sender's account (locked within session)
    const senderAccount = await Account.findOne({ userId: req.userId }).session(session);

    if (!senderAccount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "sender account not found" });
    }

    if (senderAccount.balance < amount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "insufficient balance" });
    }

    // Fetch recipient's account
    const recipientAccount = await Account.findOne({ userId: to }).session(session);

    if (!recipientAccount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "recipient account not found" });
    }
    // Perform the transfer atomically
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } },
      { session }
    );

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      message: "transfer successful",
      newBalance: senderAccount.balance - amount,
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error(err);
    return res.status(500).json({ message: "internal server error" });
  }
})

export default router
