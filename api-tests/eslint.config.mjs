import pluginCypress from 'eslint-plugin-cypress/flat';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
    pluginCypress.configs.recommended,
    {
        rules: {
            'cypress/no-unnecessary-waiting': 'off',
        },
    },
    eslintConfigPrettier,
];
