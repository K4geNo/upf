import { beforeEach, describe, expect, it } from "vitest";

import { Calculator } from "./calculator";

describe('Calculator', () => {
    let calculator: Calculator

    beforeEach(() => {
        calculator = new Calculator()
    })

    it('deve somar dois números', () => {
        expect(calculator.sum(1, 2)).toBe(3)
    })

    it('deve subtrair dois números', () => {
        expect(calculator.subtract(5, 2)).toBe(3)
    })

    it('deve multiplar dois números', () => {
        expect(calculator.multiply(2, 3)).toBe(6)
    })

    it('deve dividir dois números', () => {
        expect(calculator.divide(10, 2)).toBe(5)
    })

    it('não deve ser possível dividir por zero', () => {
        expect(() => calculator.divide(0, 0)).toThrowError('Divisão por zero')
    })
});