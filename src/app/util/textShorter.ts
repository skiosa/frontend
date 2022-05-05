/**
 * @author Amos Gross
 * @summary shortens text to 80 chars
 * @description shortens a given string down and adds '...' if needed
 * @param {string} text - string to shorten
 * @returns {string} shortened text
 */
export function shortenedText(text: string): string {
	if (text.length <= 80) {
		return text;
	} else {
		let trimLen = 77;
		while (text.charAt(trimLen) !== ' ' || trimLen === 0) {
			trimLen--;
		}

		return text.substring(0, trimLen) + '...';
	}
}
