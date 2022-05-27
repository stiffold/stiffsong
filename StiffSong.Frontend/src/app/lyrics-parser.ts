export class LyricsParser {

  static splitLyricsText(lyrics: string): { segments: Array<string>, maxLineLenght: number } {
    let result = [];
    let arrayOfLines = lyrics.match(/[^\r\n]+/g);

    let maxLineLenght = null;
    for (let i = 0; i < arrayOfLines.length; i++) {
      if (maxLineLenght === null || maxLineLenght < arrayOfLines[i].length) {
        maxLineLenght = arrayOfLines[i].length;
      }
    }

    let segment = '';
    for (let line of arrayOfLines) {
      let index = arrayOfLines.indexOf(line);
      if (line.startsWith('[') && !line.startsWith('[:') && !line.startsWith('[ :')) {
        if (index !== 0) {
          result.push(segment);
          segment = '';
        }
      } else {
        if (line && line.trim() != '' && line != '\n') {
          if (segment === '') {
            segment = line;
          } else {
            segment = `${segment} \n ${line}`;
          }
        }
      }
    }

    result.push(segment);
    return {segments: result, maxLineLenght: maxLineLenght};
  }
}
