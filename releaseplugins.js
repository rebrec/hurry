const Path = require('path');
const targz = require('targz');
 
const src = Path.join(__dirname, 'plugins-dist'),
const dest = Path.join(__dirname, 'plugins-src', 'plugins.tar.gz'),
// compress files into tar.gz archive
targz.compress({
    src: src,
    dest: dest,
    tar: {
        dmode: 700,
        fmode: 600
    }
}, function(err){
    if(err) {
        console.log(err);
    } else {
        console.log("Done!");
        console.log('Filename ' + dest + ' has been created !');
    }
});
 