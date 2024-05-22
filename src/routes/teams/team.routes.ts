import { Router } from "express";
import { check, query } from "express-validator";
import { validateFields } from "../../middlewares";
import { createTeam, deleteTeam, showTeam, showTeams, updateTeam } from "../../controllers";

export const router = Router();

router.route('/')
.post(
    [
    ], 
    createTeam
)
.get(
    [
    ],
    showTeams
)

router.route('/:id')
.get(
    [
    ],
    showTeam
)
.put(
    [

    ],
    updateTeam
)
.delete(
    [
    ],
    deleteTeam
)