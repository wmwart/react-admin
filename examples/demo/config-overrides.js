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

const additionalInclude = Object.values(alias);

const augmentInclude = ({ include, ...rest }) => {
    if (!include) {
        return rest;
    }
    return {
        ...rest,
        include: additionalInclude.concat(include),
    };
};

// Augment webpack rule so that packages files are compiled too
const augmentRule = ({ oneOf, include, ...rest }) => {
    if (!oneOf && !include) {
        return rest;
    }
    return {
        ...rest,
        include: include ? additionalInclude.concat(include) : undefined,
        oneOf: oneOf ? oneOf.map(augmentInclude) : undefined,
    };
};

module.exports = config => {
    if (process.env.NODE_ENV !== 'development') {
        return config;
    }

    // Remove restriction for external packages
    config.resolve.plugins = config.resolve.plugins.filter(
        plugin => !(plugin instanceof ModuleScopePlugin)
    );
    config.resolve.plugins.push(
        new ModuleScopePlugin(__dirname, additionalInclude)
    );

    config.module.rules = config.module.rules.map(augmentRule);

    // prevent error with graphql
    // see https://github.com/graphql/graphql-js/issues/1272#issuecomment-393903706
    // TODO remove once graphql updated in ra-data-graphql-simple
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
