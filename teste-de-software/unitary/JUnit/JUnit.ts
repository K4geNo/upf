export class ArrayList<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  add(item: T): void {
    this.items.push(item);
  }

  remove(index: number): T {
    if (index < 0 || index >= this.items.length) {
      throw new Error('Erro ao remover elemento de índice inválido');
    }
    return this.items.splice(index, 1)[0];
  }

  get(index: number): T {
    if (index < 0 || index >= this.items.length) {
      throw new Error('Índice inválido');
    }
    return this.items[index];
  }

  size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}