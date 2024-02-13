import express from "express"
import {policy} from "../controller/policy.js"
import { Validation } from "../validation/jwtValidate.js"

const authPolicy = express.Router()

authPolicy.post("/policy/create",Validation.jwtValidate,policy.CreatePolicy)

authPolicy.get("/policy/read",Validation.jwtValidate,policy.ReadManyPolicy)

authPolicy.get("/policy/read/:id",Validation.jwtValidate,policy.ReadPolicy)

authPolicy.put("/policy/update/:id",Validation.jwtValidate,policy.UpdatePolicy,)

authPolicy.delete("/policy/delete/:id",Validation.jwtValidate,policy.deletePolicy)


export default authPolicy