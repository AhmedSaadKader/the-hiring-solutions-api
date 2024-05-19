"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Company_1 = require("../models/Company");
const company = new Company_1.CompanyModel();
describe('Company Model', () => {
    let company_id;
    it('should have an index method', () => {
        expect(company.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(company.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(company.create).toBeDefined();
    });
    it('should have a update method', () => {
        expect(company.update).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(company.delete).toBeDefined();
    });
    it('create method should add a new company', async () => {
        const result = await company.create({
            name: 'first_test_company',
            industry: 'first_test_industry',
            description: 'first_company_description',
            email: 'company@email.com',
            password: 'company_password'
        });
        company_id = result.id;
        expect(result).toEqual({
            id: company_id,
            name: 'first_test_company',
            industry: 'first_test_industry',
            description: 'first_company_description',
            email: 'company@email.com',
            password: 'company_password'
        });
    });
    it('index method should return a list of companys', async () => {
        const result = await company.index();
        expect(result).toEqual([
            {
                id: company_id,
                name: 'first_test_company',
                industry: 'first_test_industry',
                description: 'first_company_description',
                email: 'company@email.com',
                password: 'company_password'
            }
        ]);
    });
    it('show method should return the correct list', async () => {
        const result = await company.show(company_id);
        expect(result).toEqual({
            id: company_id,
            name: 'first_test_company',
            industry: 'first_test_industry',
            description: 'first_company_description',
            email: 'company@email.com',
            password: 'company_password'
        });
    });
    it('update method should update specific company', async () => {
        const result = await company.update(company_id, 'updated_test_company', 'first_test_industry', 'first_company_description', 'company@email.com', 'company_password');
        expect(result).toEqual({
            id: company_id,
            name: 'updated_test_company',
            industry: 'first_test_industry',
            description: 'first_company_description',
            email: 'company@email.com',
            password: 'company_password'
        });
    });
    it('delete method should remove the correct company', async () => {
        const result = await company.delete(company_id);
        expect(result).toEqual(undefined);
    });
});
