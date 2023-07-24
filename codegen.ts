import { CodegenConfig } from '@graphql-codegen/cli';
import { GraphqlConfig } from './src/renderer/constants/graphql';

const config: CodegenConfig = {
  schema: GraphqlConfig.url,
  documents: ['src/renderer/**/*.tsx', 'src/renderer/**/*.ts'],
  ignoreNoDocuments: true,
  generates: {
    './src/renderer/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
