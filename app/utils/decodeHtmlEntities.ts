// app/utils/decodeHtmlEntities.ts

export function decodeHtmlEntities(text: string): string {
    const element = document.createElement('textarea');
    element.innerHTML = text;
    return element.value;
  }
  