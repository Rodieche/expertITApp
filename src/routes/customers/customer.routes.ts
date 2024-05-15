import { Router } from "express";
import { createCustomer, showSingleCustomer } from "../../controllers";
import { check } from "express-validator";
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

router.route('/:slug')
.get(
    showSingleCustomer
)