import express from "express"
import {policy} from "../controller/policy.js"
import { Validation } from "../validation/jwtValidate.js"

const authPolicy = express.Router()

authPolicy.post("/api/policy/create",Validation.jwtValidate,policy.CreatePolicy)

authPolicy.get("/api/policy/read",Validation.jwtValidate,policy.ReadManyPolicy)

authPolicy.get("/api/policy/read/:id",Validation.jwtValidate,policy.ReadPolicy)

authPolicy.put("/api/policy/update/:id",Validation.jwtValidate,policy.UpdatePolicy,)

authPolicy.delete("/api/policy/delete/:id",Validation.jwtValidate,policy.deletePolicy)


export default authPolicy