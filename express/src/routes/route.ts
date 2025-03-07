import { Router } from "express";
import { MemberController } from "../controllers/members"
import prisma from "../lib/prisma";

import logger from "../util/logger"

const router = Router();
const memberController = new MemberController(prisma);

import { Request, Response, NextFunction } from 'express';
import { buildError } from '../pkg/buildRespone';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json(buildError('Something broke!', 500));
};

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.path}`);
    next()
};

router.use(requestLogger);
router.use(errorHandler);

router.get('/members', memberController.getAllMembers)
router.post('/members', memberController.createNewMember)
router.get('/members/:memberId', memberController.getMemberById)
router.put('/members/:memberId', memberController.updateMember)
router.delete('/members/:memberId', memberController.deleteMember)

export default router;