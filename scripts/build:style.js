const sass = require("node-sass");
const glob = require("glob");
const path = require("path");
const fs = require("fs");

let srcdir = "../src/style";
let distdir = "../dist/style";

srcdir = path.join(__dirname, srcdir);
distdir = path.join(__dirname, distdir);

if (!fs.existsSync(distdir)) {
    fs.mkdirSync(distdir);
}

glob(path.join(srcdir, "*.s[ac]ss"), (err, files) => {
    if (err) {
        throw err;
    }

    files.forEach((file) => {
        sass.render({
            file: file,
            outputStyle: "compressed",
        }, (err, result) => {
            if (err) {
                throw err;
            }
            result.stats.dist = path.join(distdir, path.basename(file, path.extname(file))+".css");
            console.log(result.stats);
            fs.writeFile(result.stats.dist+"", result.css, (err) => {
                if (err) {
                    throw err;
                }
            });
        });
    });
});

glob(path.join(srcdir, "*.css"), (err, files) => {
    if (err) {
        throw err;
    }

    files.forEach((file) => {
        fs.copyFile(file, path.join(distdir, path.basename(file)), () => {});
    });
});