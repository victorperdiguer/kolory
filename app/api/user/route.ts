import {NextRequest, NextResponse} from "next/server";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  return NextResponse.json({
    message: "get!"
  })
}

export async function POST(req: NextRequest) {
  const {name, email, avatar} = await req.json()
  console.log(req)
  console.log(name, email)
  const db = await connectMongoDB()
  console.log(db)
  await User.create({name, email, avatar})
  return NextResponse.json({
    message: "Registration successful",
    user: name,
    email: email
  }, {status: 201})
}

// WHY IS THIS NOT WORKING? I can't get the fucking body from the NextApiRequest

// import {NextApiRequest, NextApiResponse} from "next";
// import connectMongoDB from "@/lib/mongodb";
// import User from "@/models/User";

// type ResponseData = {
//   message: string,
//   user?: string,
//   email?: string
// }

// export async function GET(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   return res.json({
//     message: "get!"
//   })
// }

// export async function POST(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//     console.log(req, req.body)
//     const {name, email, avatar} = req.body
//     console.log(name, email)
//     const db = await connectMongoDB()
//     console.log(db)
//     await User.create({name, email, avatar})
//     console.log(res)
//     return res.status(201).json({
//       message: "Registration successful",
//       user: name,
//       email: email
//     })
// }