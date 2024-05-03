import { Router } from "express";
import { createCustomer } from "../../controllers";

export const router = Router();

router.route('/')
.post(createCustomer)
