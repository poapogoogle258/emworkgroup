import { Request, Response } from 'express';
import { MemberController } from './members';
import { prismaMock } from "../lib/singleton"
import { buildError, buildResult } from '../pkg/buildRespone';

describe('MemberController', () => {
    let memberController: MemberController;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        memberController = new MemberController(prismaMock);
        req = {
            query: {},
            params: {},
            body: {}
        };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    describe('getAllMembers', () => {
        it('should return all members', async () => {
            const members = [{ id: 1, name: 'John', lastname: 'Doe', birthday: new Date(), image: 'http://example.com/image.jpg', updatedAt: new Date(), age: 30 }];
            prismaMock.member.findMany.mockResolvedValue(members);
            req.query = {};

            await memberController.getAllMembers(req as Request, res as Response);

            expect(res.json).toHaveBeenCalledWith(buildResult(members));
        });

        it('should handle validation errors', async () => {
            req.query = { age: 'invalid' };

            await memberController.getAllMembers(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(String) }));
        });
    });

    describe('getMemberById', () => {
        it('should return a member by id', async () => {
            const member = { id: 1, name: 'John', lastname: 'Doe', birthday: new Date(), image: 'http://example.com/image.jpg', updatedAt: new Date(), age: 1 };
            prismaMock.member.findFirst.mockResolvedValue(member);
            req.params = { memberId: '1' };

            await memberController.getMemberById(req as Request, res as Response);

            expect(res.json).toHaveBeenCalledWith(buildResult(member));
        });

        it('should return 404 if member not found', async () => {
            prismaMock.member.findFirst.mockResolvedValue(null);
            req.params = { memberId: '1' };

            await memberController.getMemberById(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith(buildError("Member not found", 404));
        });
    });

    describe('createNewMember', () => {
        it('should create a new member', async () => {
            const memberData = { name: 'John', lastname: 'Doe', birthday: new Date(), image: 'http://example.com/image.jpg' };
            const createdMember = { ...memberData, id: 1, age: 1, updatedAt: new Date() };
            prismaMock.member.create.mockResolvedValue(createdMember);
            req.body = memberData;

            await memberController.createNewMember(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(buildResult(createdMember,201));
        });

        it('should handle validation errors', async () => {
            req.body = { name: '', lastname: 'Doe', birthday: 'invalid', image: 'invalid-url' };

            await memberController.createNewMember(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(String) }));
        });
    });

    describe('updateMember', () => {
        it('should update a member', async () => {
            const memberData = { name: 'John', lastname: 'Doe', birthday: new Date(), image: 'http://example.com/image.jpg' };
            const updatedMember = { ...memberData, id: 1, updatedAt: new Date(), age: 1 };
            prismaMock.member.count.mockResolvedValue(1);
            prismaMock.member.update.mockResolvedValue(updatedMember);
            req.params = { memberId: '1' };
            req.body = memberData;

            await memberController.updateMember(req as Request, res as Response);

            expect(res.json).toHaveBeenCalledWith(buildResult(updatedMember));
        });

        it('should return 404 if member not found', async () => {
            prismaMock.member.count.mockResolvedValue(0);
            req.params = { memberId: '1' };

            await memberController.updateMember(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith(buildError("Member not found", 404));
        });

        it('should handle validation errors', async () => {
            prismaMock.member.count.mockResolvedValue(1);
            req.params = { memberId: '1' };
            req.body = { name: '', lastname: 'Doe', birthday: 'invalid', image: 'invalid-url' };

            await memberController.updateMember(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(String) }));
        });
    });

    describe('deleteMember', () => {
        it('should delete a member', async () => {
            prismaMock.member.count.mockResolvedValue(1);
            req.params = { memberId: '1' };

            await memberController.deleteMember(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.json).toHaveBeenCalledWith(buildResult(null, 204));
        });

        it('should return 404 if member not found', async () => {
            prismaMock.member.count.mockResolvedValue(0);
            req.params = { memberId: '1' };

            await memberController.deleteMember(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith(buildError("Member not found", 404));
        });
    });
});