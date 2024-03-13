import { beforeEach, describe, expect, test } from 'vitest';

import { ArrayList } from './JUnit';

describe('ArrayList', () => {
  let s: ArrayList<number>;

  beforeEach(() => {
    s = new ArrayList<number>();
  });

  // teste 1
  test('deve estar vazio quando criado', () => {
    expect(s.isEmpty()).toBe(true);
  });

  // teste 2
  test('não deve estar vazio após adicionar um elemento', () => {
    s.add(1);
    expect(s.isEmpty()).toBe(false);
  });

  // teste 3
  test('deve ter o tamanho correto e os elementos corretos após adicionar elementos', () => {
    s.add(1);
    s.add(2);
    s.add(3);
    expect(s.size()).toBe(3);
    expect(s.get(0)).toBe(1);
    expect(s.get(1)).toBe(2);
    expect(s.get(2)).toBe(3);
  });

  // teste 4
  test('deve remover o elemento correto e atualizar o tamanho', () => {
    s.add(1);
    s.add(2);
    s.add(3);
    const elem = s.remove(2);
    expect(elem).toBe(3);
    expect(s.get(0)).toBe(1);
    expect(s.get(1)).toBe(2);
  });

  // teste 5
  test('deve estar vazio após adicionar e remover um elemento', () => {
    s.add(1);
    s.remove(0);
    expect(s.size()).toBe(0);
    expect(s.isEmpty()).toBe(true);
  });

  // teste 6
  test('deve lançar um erro ao tentar remover um elemento de um índice que não existe', () => {
    s.add(1);
    s.add(2);
    expect(() => s.remove(2)).toThrow('Erro ao remover elemento de índice inválido');
  });
});