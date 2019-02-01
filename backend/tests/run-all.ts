import * as Fs from 'fs-extra';

for (const fileName of Fs.readdirSync(__dirname)) {
    if (fileName !== __filename) {
        require(`./${fileName}`);
    }
}
