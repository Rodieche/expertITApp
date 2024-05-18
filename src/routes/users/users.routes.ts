import { Router } from "express";
import { check, query } from "express-validator";
import { IsValidUser, UserExist, validateFields } from "../../middlewares";
import { createUser, deleteUser, showUser, showUsers, updateUser } from "../../controllers";

export const router = Router();

router.route('/')
.post(
    [
        check('email').isEmail().not().optional(),
        check('name').isString().not().optional(),
    ],
    createUser
)
.get(
    [
        query('limit').isInt({ min: 0 }).optional(),
        query('skip').isInt({ min: 0 }).optional(),
        validateFields
    ],
    showUsers
)

router.route('/:email')
.get(
    [
        check('email').isEmail().not().optional(),
        check('email').custom(UserExist),
        check('email').custom(IsValidUser)
    ],
    showUser
)
.put(
    [
        check('email').isMongoId(),
        check('email').custom(UserExist),
        check('email').custom(IsValidUser)
    ],
    updateUser
)
.delete(
    [
        check('email').isMongoId(),
        check('email').custom(UserExist),
        check('email').custom(IsValidUser)
    ],
    deleteUser
)