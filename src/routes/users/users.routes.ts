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
        validateFields
    ],
    createUser
)
.get(
    [
        query('limit').isInt({ min: 0 }).optional().withMessage('limit query param must be greater than 0'),
        query('skip').isInt({ min: 0 }).optional().withMessage('skip query param must be greater than 0'),
        validateFields
    ],
    showUsers
)

router.route('/:email')
.get(
    [
        check('email').isEmail().not().optional(),
        check('email').custom(UserExist),
        check('email').custom(IsValidUser),
        validateFields
    ],
    showUser
)
.put(
    [
        check('email').isMongoId(),
        check('email').custom(UserExist),
        check('email').custom(IsValidUser),
        validateFields
    ],
    updateUser
)
.delete(
    [
        check('email').isMongoId(),
        check('email').custom(UserExist),
        check('email').custom(IsValidUser),
        validateFields
    ],
    deleteUser
)