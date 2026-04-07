const fs = require('fs');
const path = require('path');

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        if (fs.statSync(file).isDirectory()) {
            results = results.concat(walkDir(file));
        } else {
            if (file.endsWith('.jsx')) results.push(file);
        }
    });
    return results;
}

const files = walkDir('c:/Users/vijay/CampusMate/frontend/src/pages');
let count = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const regex = /<div\s+className=[\"']back-nav[\s\S]*?Back to Dashboard[\s\S]*?<\/div>[\r\n\s]*/g;
    if (regex.test(content)) {
        content = content.replace(regex, '');
        fs.writeFileSync(file, content, 'utf8');
        count++;
        console.log('Modified', file);
    }
});
console.log('Total files modified: ' + count);
