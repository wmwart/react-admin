const path = require('path');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = config => {
    if (process.env.NODE_ENV !== 'development') {
        return config;
    }

    config.resolve.plugins = config.resolve.plugins.filter(
        plugin => !(plugin instanceof ModuleScopePlugin)
    );

    config.module.rules[2].oneOf.unshift({
        test: /packages\/(.*?)\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
    });

    config.module.rules[2].oneOf.unshift({
        test: /packages\/(.*?)\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
    });

    config.module.rules.unshift({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
    });

    return {
        ...config,
        resolve: {
            ...config.resolve,
            extensions: ['.ts', '.js', '.tsx', '.json'],
            alias: {
                'ra-core': path.join(
                    __dirname,
                    '..',
                    '..',
                    'packages',
                    'ra-core',
                    'src'
                ),
                'ra-ui-materialui': path.join(
                    __dirname,
                    '..',
                    '..',
                    'packages',
                    'ra-ui-materialui',
                    'src'
                ),
                'react-admin': path.join(
                    __dirname,
                    '..',
                    '..',
                    'packages',
                    'react-admin',
                    'src'
                ),
                'ra-data-fakerest': path.join(
                    __dirname,
                    '..',
                    '..',
                    'packages',
                    'ra-data-fakerest',
                    'src'
                ),
                'ra-i18n-polyglot': path.join(
                    __dirname,
                    '..',
                    '..',
                    'packages',
                    'ra-i18n-polyglot',
                    'src'
                ),
                'ra-input-rich-text': path.join(
                    __dirname,
                    '..',
                    '..',
                    'packages',
                    'ra-input-rich-text',
                    'src'
                ),
            },
        },
    };
};
