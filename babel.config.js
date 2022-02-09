module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    //'transform-remove-console',
    '@babel/plugin-proposal-export-namespace-from',
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@shared': './app/shared',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
