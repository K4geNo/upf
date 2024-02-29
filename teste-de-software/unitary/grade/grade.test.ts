import { beforeEach, describe, expect, it } from 'vitest';

import { Grade } from './grade';

describe('Grade', () => {
  let grade: Grade;

  beforeEach(() => {
    grade = new Grade();
  });

  it('deve retorna true se a nota for igual ou maior que 90', () => {
    const result = grade.isConceitoA(90);
    expect(result).toBe(true);
  });

  it('deve retornar false se a nota for menor que 90', () => {
    const result = grade.isConceitoA(80);
    expect(result).toBe(false);
  });
});