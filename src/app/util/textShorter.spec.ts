import { shortenedText } from "./textShorter";

describe('TextShorter', () => {
    it('should not trim short strings', () => {
        const text = 'abc';
        const res = shortenedText(text);
        expect(res).toEqual(text);
    });

    it('should trim long strings', () => {
        const text =
            'abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcde abcdeabcde';
        const expected =
            'abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcdeabcde...';
        const res = shortenedText(text);
        expect(res).toEqual(expected);
    });
});