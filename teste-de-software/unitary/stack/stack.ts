export class Stack {
    private items: number[] = []

    size(): number {
        return this.items.length
    }

    isEmpty(): boolean {
        return this.items.length === 0
    }

    push(item: number): void {
        this.items.push(item)
    }

    pop(): number {
        if(this.isEmpty()) {
            throw new Error('Stack is empty')
        }

        return this.items.pop() as number
    }
}