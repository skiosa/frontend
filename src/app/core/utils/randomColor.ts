export const DEFAULT_PASTEL_COLOR: string = 'var(--pastel-a-color)';
/**
* @author Amos Gross
* @summary fetches color for article
* @description preliminary solution for generating colored articles
* @returns {string} css color 
*/
export function generateRandomColor(colorSeed: number): string {
    console.log('hello', colorSeed)
    switch (colorSeed % 4) {
      case 0:
        return 'var(--pastel-a-color)';
      case 1:
        return 'var(--pastel-b-color)';
      case 2:
        return 'var(--pastel-c-color)';
      case 3:
        return 'var(--pastel-d-color)';
      default:
        return DEFAULT_PASTEL_COLOR;
    }
  }

