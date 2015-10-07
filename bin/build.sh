npm run clean
npm run copyStatic
npm run build-scss
NODE_ENV=production browserify js/index.js -t babelify -t envify | uglifyjs -cm -warnings=false --screw-ie8 > dist/js/bundle.js
