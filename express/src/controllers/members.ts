import { Request, Response } from 'express';
import { buildError, buildResult } from '../pkg/buildRespone';
import { z, ZodError } from "zod"
import logger from "../util/logger"

import { PrismaCustomClient } from '../lib/prisma';

const getAllMembersQuerySchema = z.object({
    search: z.string().optional(),
    age: z.enum(['asc', 'desc']).optional()
});

const memberSchema = z.object({
    name: z.string().min(1).max(190),
    lastname: z.string().min(1).max(190),
    birthday: z.coerce.date().refine(date => date <= new Date(), {
        message: "Birthday cannot be in the future"
    }),
    image: z.string().url()
});

type memberSchemaType = z.infer<typeof memberSchema>;

// Create a class to handle member operations
export class MemberController {
    private db: PrismaCustomClient;

    constructor(db: PrismaCustomClient) {
        this.db = db
       
    }

    getAllMembers = async(req: Request, res: Response) => {
        try {

            const { search, age } = getAllMembersQuerySchema.parse(req.query);

            const result = await this.db.member.findMany({
                where: {
                    OR: search
                        ? [
                            { name: { contains: search } },
                            { lastname: { contains: search } },
                        ]
                        : undefined
                },
                orderBy: {
                    birthday: age == 'asc' ? 'desc' : 'asc'
                },

            });

            res.json(buildResult(result));
            return
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map(err => err.message).join(', ');
                res.status(400).json(buildError(errorMessages, 400));
            }
        }
    };

    getMemberById  = async (req: Request, res: Response) => {
        const memberId = parseInt(req.params["memberId"])
        const result = await this.db.member.findFirst({
            where: {
                id: memberId
            }
        });

        if (result == null) {
            res.status(404).json(buildError("Member not found", 404))
            return
        }

        res.json(buildResult(result))
        return
    };

    createNewMember = async (req: Request, res: Response) => {
        let memberData: memberSchemaType;
        try {
            memberData = memberSchema.parse(req.body);
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map(err => err.message).join(', ');
                res.status(400).json(buildError(errorMessages, 400));
            } else {
                res.status(500).json(buildError("Internal Server Error"));
            }
            return
        }

        const result = await this.db.member.create({
            data: {
                name: memberData.name,
                lastname: memberData.lastname,
                birthday: memberData.birthday,
                image: memberData.image,
                updatedAt: new Date(),
            },
        });

        res.status(201).json(buildResult(result,201));
        logger.warn(`created member_id:${result.id}`, result)
        return
    };

    updateMember = async (req: Request, res: Response) => {
        const memberId = parseInt(req.params["memberId"])
        if (await this.db.member.count({ where: { id: memberId } }) == 0) {
            res.status(404).json(buildError("Member not found", 404))
            return
        }

        let memberData: memberSchemaType;
        try {
            memberData = memberSchema.parse(req.body);
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map(err => err.message).join(', ');
                res.status(400).json(buildError(errorMessages, 400));
            } else {
                res.status(500).json(buildError("Internal Server Error"));
            }
            return
        }

        const result = await this.db.member.update({
            where: {
                id: memberId
            },
            data: {
                name: memberData.name,
                lastname: memberData.lastname,
                birthday: memberData.birthday,
                image: memberData.image,
                updatedAt: new Date(),
            },
        });

        res.json(buildResult(result));
        logger.warn(`updated member_id:${result.id}`, result)
        return
    };

    deleteMember = async (req: Request, res: Response) => {
        const memberId = parseInt(req.params["memberId"])
        if (await this.db.member.count({ where: { id: memberId } }) == 0) {
            res.status(404).json(buildError("Member not found", 404))
            return
        }

        await this.db.member.delete({
            where: {
                id: memberId
            }
        })

        res.status(204).json(buildResult(null, 204));
        logger.warn(`deleted member_id:${memberId}`)
        return
    }
}
