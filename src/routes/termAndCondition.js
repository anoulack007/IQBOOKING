import express from "express"
import {termAndCondition} from "../controller/termAndCondition.js"
import { Validation } from "../validation/jwtValidate.js"

const authTernAndCondition = express.Router()

authTernAndCondition.post("/policy/create",Validation.jwtValidate,termAndCondition.CreateCondition)

authTernAndCondition.get("/policy/read",Validation.jwtValidate,termAndCondition.ReadManyCondition)

authTernAndCondition.get("/policy/read/:id",Validation.jwtValidate,termAndCondition.ReadCondition)

authTernAndCondition.put("/policy/update/:id",Validation.jwtValidate,termAndCondition.UpdateCondition,)

authTernAndCondition.delete("/policy/delete/:id",Validation.jwtValidate,termAndCondition.deleteCondition)


export default authTernAndCondition