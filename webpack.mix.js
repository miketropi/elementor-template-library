const mix = require('laravel-mix');

mix
  .js('src/main.js', 'dist/elementor-template-library.build.js')
  .react()
  .setPublicPath('./dist')
