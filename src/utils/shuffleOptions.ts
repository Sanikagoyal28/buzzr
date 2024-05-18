function stringToSeed(s: string): number {
    let seed = 0;
    for (let i = 0; i < s.length; i++) {
        seed = (seed * 31 + s.charCodeAt(i)) % (2 ** 32);
    }
    return seed;
}

function deterministicRandom(seed: number): () => number {
    return function() {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };
}

/**
 * Generate a shuffled version of the input array using the given game seed and player identifier.
 * Each player will get a unique shuffling for each game and each question.
 * 
 * @param arr The input array to be shuffled.
 * @param gameSeed The seed representing the current game or question.
 * @returns A shuffled version of the input array.
 */
export function shuffle(arr: any[], gameSeed: string): any[] {
    const seed = stringToSeed(gameSeed);
    const random = deterministicRandom(seed);
    const shuffledArray = arr.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}
