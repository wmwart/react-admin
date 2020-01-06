const path = require('path');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

const alias = {
    'ra-core': path.join(__dirname, '..', '..', 'packages', 'ra-core', 'src'),
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
};

module.exports = config => {
    if (process.env.NODE_ENV !== 'development') {
        return config;
    }

    config.module.rules[2].oneOf[1].include = Object.values(alias).concat(
        config.module.rules[2].oneOf[1].include
    );
    config.module.rules[1].include = Object.values(alias).concat(
        config.module.rules[1].include
    );

    config.resolve.plugins = config.resolve.plugins.filter(
        plugin => !(plugin instanceof ModuleScopePlugin)
    );

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
            alias,
        },
    };
};
