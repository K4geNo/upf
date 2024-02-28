import { beforeEach, describe, expect, it } from 'vitest';

import { Stack } from './stack';

describe('Stack', () => {
    let stack: Stack

    beforeEach(() => {
        stack = new Stack();
    })

    it('should is empty', () => {
        expect(stack.isEmpty()).toBe(true);
    })

    it('should is not empty', () => {
        stack.push(1);
        expect(stack.isEmpty()).toBe(false);
    })

    it('should be possible to have 3 elements in the array', () => {
        stack.push(1);
        stack.push(2);
        stack.push(3);
        expect(stack.size()).toBe(3);
    })

    it('should stack except empty stack when popping', () => {
        stack.push(10);
        stack.pop();
        expect(() => stack.pop()).toThrowError('Stack is empty');
    })
})

