import express from "express"
import {termAndCondition} from "../controller/termAndCondition.js"
import { Validation } from "../validation/jwtValidate.js"

const authTernAndCondition = express.Router()

authTernAndCondition.post("/api/policy/create",Validation.jwtValidate,termAndCondition.CreateCondition)

authTernAndCondition.get("/api/policy/read",Validation.jwtValidate,termAndCondition.ReadManyCondition)

authTernAndCondition.get("/api/policy/read/:id",Validation.jwtValidate,termAndCondition.ReadCondition)

authTernAndCondition.put("/api/policy/update/:id",Validation.jwtValidate,termAndCondition.UpdateCondition,)

authTernAndCondition.delete("/api/policy/delete/:id",Validation.jwtValidate,termAndCondition.deleteCondition)


export default authTernAndCondition