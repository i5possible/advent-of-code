import { readLines } from '../../fileUtils';

const lines = readLines('./input.txt');

let sum = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i].split('');
    for (let j = 0; j < line.length; j++) {
        const first = parseInt(line[j]);
        if (first >= 0 && first <= 9) {
            sum += first * 10;
            // console.log(first);
            break;
        }
    }
    for (let j = line.length - 1; j >= 0; j--) {
        const second = parseInt(line[j]);
        if (second >= 0 && second <= 9) {
            sum += second;
            // console.log(second);
            break;
        }
    }
}

console.log(sum);
