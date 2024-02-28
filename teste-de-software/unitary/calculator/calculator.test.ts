import { beforeEach, describe, expect, it } from "vitest";

import { Calculator } from "./calculator";

describe('Calculator', () => {
    let calculator: Calculator

    beforeEach(() => {
        calculator = new Calculator()
    })

    it('should add 2 numbers', () => {
        expect(calculator.sum(1, 2)).toBe(3)
    })

    it('should subtract 2 numbers', () => {
        expect(calculator.subtract(5, 2)).toBe(3)
    })

    it('should multiply 2 numbers', () => {
        expect(calculator.multiply(2, 3)).toBe(6)
    })

    it('should divide 2 numbers', () => {
        expect(calculator.divide(10, 2)).toBe(5)
    })

    it('should not be possible to divide by zero', () => {
        expect(() => calculator.divide(0, 0)).toThrowError('Division by zero')
    })
});