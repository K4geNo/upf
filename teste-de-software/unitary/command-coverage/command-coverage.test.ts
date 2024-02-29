import { beforeEach, describe, expect, it } from 'vitest';

import { CommandCoverage } from './command-coverage';

describe('CommandCoverage', () => {
    let commandCoverage: CommandCoverage;

    beforeEach(() => {
        commandCoverage = new CommandCoverage();
    });

    it('deve retornar a soma de x e y', () => {
        const result = commandCoverage.command(2, 3);
        expect(result).toBe(10);
    });

    it('não deve multiplicar y por 2', () => {
        const result = commandCoverage.command(2, 0);
        expect(result).toBe(4);
    });

    it('não deve multiplicar x por 2', () => {
        const result = commandCoverage.command(0, 3);
        expect(result).toBe(3);
    });
});