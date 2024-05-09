export function shortenParagraph(paragraph, maxLength) {
  if (paragraph.length <= maxLength) {
    return paragraph;
  } else {
    return paragraph.substring(0, maxLength - 3) + "...";
  }
}
