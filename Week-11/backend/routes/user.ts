import { Router, type Request, type Response } from "express";
import { SigninSchema, SignupSchema, UpdateUserSchema } from ".";
import { Account, User } from "../db";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { VerifyUser } from "../middleware";


const router = Router()

router.post("/signup", async (req: Request, res: Response) => {
  const parsedData = SignupSchema.safeParse(req.body)

  if (!parsedData.success) {
    return res.status(400).json("invalid input")
  }

  const { username, firstname, lastname, password } = parsedData.data

  const existingUser = await User.findOne({ username })

  if (existingUser) {
    return res.status(400).json("user already exists")
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({
    username,
    firstname,
    lastname,
    password: hashedPassword
  })

  const randomBalance = Math.floor(Math.random() * 10000) + 1;

  const account = await Account.create({
    userId: user._id,
    balance: randomBalance
  })

  const result = await User.findById(user._id).select("-password")

  return res.status(201).json({ message: "user created", result, balance: account.balance })
})

router.post("/signin", async (req: Request, res: Response) => {
  const parsedData = SigninSchema.safeParse(req.body)

  if (!parsedData.success) {
    return res.status(400).json("invalid input")
  }

  const { username, password } = parsedData.data

  const existingUser = await User.findOne({ username })

  if (!existingUser) {
    return res.status(400).json("email or password is wrong")
  }

  const validPassword = await bcrypt.compare(password, existingUser.password)

  if (!validPassword) {
    return res.status(400).json("email or password is wrong")
  }

  const token = jwt.sign({
    id: existingUser._id
  }, "secret")

  return res.status(200).json({ message: "signin done", token })
})

router.put("/", VerifyUser, async (req: Request, res: Response) => {
  const parsedData = UpdateUserSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({ message: "invalid input", errors: parsedData.error.flatten() });
  }

  const updates: Record<string, string> = {};

  if (parsedData.data.firstname) updates.firstname = parsedData.data.firstname;
  if (parsedData.data.lastname) updates.lastname = parsedData.data.lastname;
  if (parsedData.data.password) {
    updates.password = await bcrypt.hash(parsedData.data.password, 10);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.userId,
    { $set: updates },
    { new: true }
  ).select("-password");

  if (!updatedUser) {
    return res.status(404).json({ message: "user not found" });
  }

  return res.status(200).json({ message: "user updated", result: updatedUser });
})


router.get("/bulk", async (req: Request, res: Response) => {
  try {
    //search across multiple users with partial match (for search-as-you-type UI)
    const filter = (req.query.filter as string) || "";

    const users = await User.find({
      $or: [
        {
          firstname: {
            $regex: filter, $options: "i"//case insensitive
          }
        },
        { lastname: { $regex: filter, $options: "i" } },
        { username: { $regex: filter, $options: "i" } },
      ],
    }).select("_id username firstname lastname");

    return res.status(200).json({ message: "users fetched", users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "internal server error" });
  }
})

export default router
