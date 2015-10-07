npm run clean
npm run copyHtml
set -o pipefail NODE_ENV=production browserify js/index.js -t babelify -t envify > dist/js/bundle.js
