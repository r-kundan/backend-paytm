import express  from 'express'
const router = express.Router()
import zod from 'zod'
import jwt from 'jsonwebtoken'
import User from '../models/users.model.js'
import authMiddleware from '../middlewares/middlewares.js'
import JWT_SECRET from "../config.js"

//signin and signup routes

const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

router.post("/signup",async (req,res)=>{
    // const body = req.body
    //make sure schema is valid
    const {success} = signupBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message:"Email already taken /Incorrect input"
        })
    }
//checking user exist
const existingUser = await User.findOne({
    username: req.body.username
})
//if user exist then stop it here
if (existingUser) {
    return res.status(411).json({
        message: "Email already taken/Incorrect inputs"
    })
}
// create a new user
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
//get the id
    const userId = user._id;

     await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
// create jwt token
    const token = jwt.sign({
        userId
    }, JWT_SECRET);
// give the response
    res.json({
        message: "User created successfully",
        token: token
    })
}
)



const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
       return res.status(411).json({
            message: "Error while updating information"
        })
    }
    // await User.findByIdAndUpdate(req.userId, req.body);
    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    //only retrun this to user / frontend

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
export default router