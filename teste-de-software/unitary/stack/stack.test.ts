import { beforeEach, describe, expect, it } from 'vitest';

import { Stack } from './stack';

describe('Stack', () => {
    let stack: Stack

    beforeEach(() => {
        stack = new Stack();
    })

    it('deve estar vazio', () => {
        expect(stack.isEmpty()).toBe(true);
    })

    it('não deve estar vazio', () => {
        stack.push(1);
        expect(stack.isEmpty()).toBe(false);
    })

    it('deve ser possível ter 3 elementos dentro do array', () => {
        stack.push(1);
        stack.push(2);
        stack.push(3);
        expect(stack.size()).toBe(3);
    })

    it('stack com exceção de stack vazia ao desempilhar', () => {
        stack.push(10);
        stack.pop();
        expect(() => stack.pop()).toThrowError('Stack é vazia');
    })
})

