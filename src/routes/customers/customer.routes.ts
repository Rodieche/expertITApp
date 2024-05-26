import { Router } from "express";
import { createCustomer, deleteSingleCustomer, showCustomers, showSingleCustomer, updateSingleCustomer } from "../../controllers";
import { check, query } from "express-validator";
import { IsValidCustomer, customerExist, validateFields } from "../../middlewares";

export const router = Router();

router.route('/')
.post(
    [
        check('name').not().isEmpty().withMessage('Name must not be empty'),
        check('name').trim().isString().withMessage('Name must be a string'),
        validateFields
    ], 
    createCustomer
)
.get(
    [
        query('limit').isInt({ min: 0 }).optional().withMessage('limit query param must be greater than 0'),
        query('skip').isInt({ min: 0 }).optional().withMessage('skip query param must be greater than 0'),
        validateFields
    ],
    showCustomers
)

router.route('/:slug')
.get(
    [
        check('slug').isString().not().optional().withMessage('Slug name must be provided'),
        check('slug').custom(IsValidCustomer).withMessage('The customer is not valid'),
        check('slug').custom(customerExist).withMessage('Customer does not exist'),
        validateFields
    ],
    showSingleCustomer
)
.put(
    [
        check('slug').isMongoId().withMessage('The id is not valid'),
        check('slug').custom(IsValidCustomer).withMessage('The customer is not valid'),
        check('slug').custom(customerExist).withMessage('Customer does not exist'),
        validateFields
    ],
    updateSingleCustomer
)
.delete(
    [
        check('slug').isMongoId().withMessage('The id is not valid'),
        check('slug').custom(IsValidCustomer).withMessage('The customer is not valid'),
        check('slug').custom(customerExist).withMessage('Customer does not exist'),
        validateFields
    ],
    deleteSingleCustomer
)