'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');
const globby = require('globby');
// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(inputPath, needsSlash) {
  const hasSlash = inputPath.endsWith('/');
  if (hasSlash && !needsSlash) {
    return inputPath.substr(0, inputPath.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${inputPath}/`;
  } else {
    return inputPath;
  }
}

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};


function getDirs(mypath){

    const items = fs.readdirSync(mypath);

    let result = [];



    // ????????????????????????????????????????????????

    items.map(item => {

        let temp = path.join(mypath, item);



        // ????????????????????????

        if( fs.statSync(temp).isDirectory() ){

            result.push( item ); // ??????????????????????????????

        }

    });

    return result;

}   //??????????????????????????????
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};  //????????????????????????1
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};  //????????????????????????2

const htmlArray = globby.sync([path.posix.join(resolveApp('src')+'/*/index.html').replace(/\\/g,'/')]); //?????????????????????html?????????
const jsArray = globby.sync([path.posix.join(resolveApp('src'),'/*/index.js').replace(/\\/g,'/')]); //?????????????????????index.js?????????

  /* globby([path.posix.join(resolveApp('src'),'/!*!/index.js').replace(/\\/g,'/')]).then(function (res) {
       console.log(res);
   });*/



/*const commonImgArray = getDirs(resolveApp('src/common/images'));    //??????common??????????????????images??????
const imgArray = getDirs(resolveApp('src'));    //??????src???????????????????????????????????????images????????????
imgArray.remove('common');  //??????common??????image????????????common??????image????????????*/
jsArray.remove(resolveApp('src/common/index.js').replace(/\\/g,'/')); //??????????????????index.js???????????????common????????????common???index.js?????????????????????



// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  /*appPublic: resolveApp('public'),*/
  appHtml: resolveApp('src/index/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index/index'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
  htmlArray,
  jsArray,
/*  commonImgArray,
  imgArray*/
};



module.exports.moduleFileExtensions = moduleFileExtensions;
