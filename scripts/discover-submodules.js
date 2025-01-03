const { execSync } = require('child_process');
let json = [];

try {
    const submodules = execSync('git submodule').toString().split('\n').filter(Boolean);

    submodules.forEach((line) => {
        const [, , name] = line.split(' ');
        const url = execSync(`git config --get submodule.${name}.url`).toString().trim();

        const owner = url.replace(/https:\/\/github.com\/([^\/]+)\/.*/, '$1');
        const repo = url.replace(/https:\/\/github.com\/[^\/]+\/([^\/]+).*/, '$1').replace(/\.git$/, '');

        json.push(`${owner}/${repo}`);
    });
} 
catch (error) {
    console.error('Error processing submodules:', error);
}

console.log(JSON.stringify(json));
