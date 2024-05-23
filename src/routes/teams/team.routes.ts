import { Router } from "express";
import { check, query } from "express-validator";
import { TeamExist, validateFields } from "../../middlewares";
import { createTeam, deleteTeam, showTeam, showTeams, updateTeam } from "../../controllers";

export const router = Router();

router.route('/')
.post(
    [
        check('name').isString().not().optional(),
        validateFields
    ], 
    createTeam
)
.get(
    showTeams
)

router.route('/:id')
.get(
    [
        check('id').isMongoId(),
        validateFields
    ],
    showTeam
)
.put(
    [
        check('id').isMongoId(),
        check('id').custom(TeamExist),
        validateFields
    ],
    updateTeam
)
.delete(
    [
        check('id').isMongoId(),
        check('id').custom(TeamExist),
        validateFields
    ],
    deleteTeam
)