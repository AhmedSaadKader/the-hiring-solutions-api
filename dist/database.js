"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_TEST_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST_PROD, POSTGRES_PROD_USER, POSTGRES_PROD_DB, POSTGRES_PROD_PASSWORD, ENV } = process.env;
console.log('ENV', ENV);
let client = new pg_1.Pool({
    host: '',
    database: '',
    user: '',
    password: ''
});
if (ENV == 'dev') {
    console.log('Connecting to dev database:');
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}
if (ENV == 'test') {
    console.log('Connecting to test database');
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}
if (ENV == 'production') {
    console.log('Connecting to production database');
    client = new pg_1.Pool({
        host: POSTGRES_HOST_PROD,
        database: POSTGRES_PROD_DB,
        user: POSTGRES_PROD_USER,
        password: POSTGRES_PROD_PASSWORD,
        ssl: {
            rejectUnauthorized: false
        }
    });
}
exports.default = client;
