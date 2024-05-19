"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
describe("GET API '/'", () => {
    it('should return "Hello World!"', async () => {
        const res = await (0, supertest_1.default)(index_1.default).get('/').send('Hello World!');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Hello world!');
    });
});
