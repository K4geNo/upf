export class CommandCoverage {
    command(x: number, y: number) {
        if (x > 0) {
            x = 2 * x
            if (y > 0) {
                y = 2 * y
            }
        }

        return [x, y]
    }
}