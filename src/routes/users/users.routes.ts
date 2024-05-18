import { Router } from "express";
import { check, query } from "express-validator";
import { validateFields } from "../../middlewares";
import { createUser, deleteUser, login, showUser, showUsers, updateUser } from "../../controllers";

export const router = Router();

router.route('/')
.post(createUser)
.get(showUsers)

router.route('/:email')
.get(showUser)
.put(updateUser)
.delete(deleteUser)