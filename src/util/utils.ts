export function toStyles(input: any): string {
    return Object.entries(input)
        .map(([key, value]) => `--${key}:${value}`)
        .join(';')
}

export function getRandom(max: number): number {
    const result: number = Math.random() * max;
    return Math.floor(result);
}

export function getRandomListOfNumber(max: number, num: number): number[] {
    let added = new Map<number, boolean>();

    let count = 0;
    while (count < num) {
        const item: number = getRandom(max);
        const exist: boolean = added.get(item);
        if (!exist) {
            added.set(item, true);
            count++;
        }
    }

    let result: number[] = [];
    for (const [current, exist] of added) {
        result.push(current);
    }
    return result;
}

export function getRandomItem<T>(list: T[]): T {
    const randomIndex: number = getRandom(list.length);
    return list[randomIndex];
}

export function getRandomListOfItem<T>(list: T[], num: number): T[] {
    const totalNumber: number = list.length;
    const randomIndexList: number[] = getRandomListOfNumber(totalNumber, num);
    let output: T[] = [];
    for (let i = 0; i < randomIndexList.length; i++) {
        output.push(list[randomIndexList[i]]);
    }
    return output;
}