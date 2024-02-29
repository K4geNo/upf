import { beforeEach, describe, expect, it } from 'vitest';

import { CommandCoverage } from './command-coverage';

describe('CommandCoverage', () => {
    let commandCoverage: CommandCoverage;

    beforeEach(() => {
        commandCoverage = new CommandCoverage();
    });

    it('deve retornar [2, 2] quando x = 1 e y = 1', () => {
        expect(commandCoverage.command(1, 1)).toEqual([2, 2]);
    });

    it('deve retornar [2, 0] quando x = 1 e y = 0', () => {
        expect(commandCoverage.command(1, 0)).toEqual([2, 0]);
    });

    it('deve retornar [0, 1] quando x = 0 e y = 1', () => {
        expect(commandCoverage.command(0, 1)).toEqual([0, 1]);
    });

    it('deve retornar [0, 0] quando x = 0 e y = 0', () => {
        expect(commandCoverage.command(0, 0)).toEqual([0, 0]);
    });
});