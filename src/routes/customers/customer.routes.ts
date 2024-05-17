import { Router } from "express";
import { createCustomer, showCustomers, showSingleCustomer } from "../../controllers";
import { check, query } from "express-validator";
import { validateFields } from "../../middlewares";

export const router = Router();

router.route('/')
.post(
    [
        check('name').trim().isString().not().isEmpty(),
        validateFields
    ], 
    createCustomer
)
.get(
    [
        query('limit').isInt({ min: 0 }).optional(),
        query('skip').isInt({ min: 0 }).optional(),
        validateFields
    ],
    showCustomers
)

router.route('/:slug')
.get(
    showSingleCustomer
)