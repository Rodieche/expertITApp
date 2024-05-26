import { Router } from "express";
import { check, query } from "express-validator";
import { IsValidTeam, TeamExist, validateFields } from "../../middlewares";
import { createTeam, deleteTeam, showTeam, showTeams, updateTeam } from "../../controllers";

export const router = Router();

router.route('/')
.post(
    [
        check('name').isString().withMessage('The Team name must be an string'),
        check('name').not().isEmpty().withMessage('A name is required to create a Team'),
        validateFields
    ], 
    createTeam
)
.get(
    [
        query('limit').isInt({ min: 0 }).optional().withMessage('limit query param must be greater than 0'),
        query('skip').isInt({ min: 0 }).optional().withMessage('skip query param must be greater than 0'),
        validateFields
    ],
    showTeams
)

router.route('/:id')
.get(
    [
        check('id').isMongoId().withMessage('The id is not valid'),
        validateFields
    ],
    showTeam
)
.put(
    [
        check('id').isMongoId().withMessage('The id is not valid'),
        check('id').custom(TeamExist).withMessage('The Team does not exist'),
        check('id').custom(IsValidTeam).withMessage('The Team is not valid'),
        validateFields
    ],
    updateTeam
)
.delete(
    [
        check('id').isMongoId().withMessage('The id is not valid'),
        check('id').custom(TeamExist).withMessage('The Team does not exist'),
        check('id').custom(IsValidTeam).withMessage('The Team is not valid'),
        validateFields
    ],
    deleteTeam
)