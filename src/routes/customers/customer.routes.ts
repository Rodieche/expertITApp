import { Router } from "express";
import { createCustomer, deleteSingleCustomer, showCustomers, showSingleCustomer, updateSingleCustomer } from "../../controllers";
import { check, query } from "express-validator";
import { IsValidCustomer, customerExist, validateFields } from "../../middlewares";

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
    [
        check('slug').isString().not().optional(),
        check('slug').custom(IsValidCustomer),
        check('slug').custom(customerExist)
    ],
    showSingleCustomer
)
.put(
    [
        check('slug').isMongoId(),
        check('slug').custom(customerExist),
        check('slug').custom(IsValidCustomer),
    ],
    updateSingleCustomer
)
.delete(
    [
        check('slug').isMongoId(),
        check('slug').custom(customerExist),
        check('slug').custom(IsValidCustomer),
    ],
    deleteSingleCustomer
)