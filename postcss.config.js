const prefix = '.etl-tailwind-scope';

module.exports = {
  plugins: [
    require('postcss-nested'),
    require('@tailwindcss/postcss')(),
    require('autoprefixer'),
    require('cssnano')({ preset: 'default' }),
    require('postcss-prefix-selector')({
      prefix: prefix,
      includeFiles: [/\.css$/],
      transform(prefix, selector, prefixedSelector, filePath, rule) {
        if (selector.startsWith('html') || selector.startsWith('body')) {
          return prefix;
        }

        // if start with :root, :host, return selector
        if (selector.startsWith(':root') || selector.startsWith(':host')) {
          return prefix;
        }

        // if start with .etl-tailwind-scope--reset-all, return selector
        if (selector.startsWith('.etl-tailwind-scope--reset-all')) {
          return selector;
        }

        // if start with .font-space-mono, return selector
        if (selector.startsWith('.font-space-mono') || selector.startsWith('.font-arial')) {
          return selector;
        }

        return prefixedSelector;
      }
    }),
  ],
};
