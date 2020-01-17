import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import typescriptCompiler from "typescript"

export default {
  input: './src/index.ts',
  output: [
    {
      file: './dist/index.cjs.js',
      format: 'cjs',
    },
    {
      file: './dist/index.esm.js',
      format: 'esm',
    },
  ],
  plugins: [
    resolve({
      extensions: ['.tsx', '.ts'],
    }),
    typescript({ typescript: typescriptCompiler }),
    babel(
      { 
        include: ['src/**/*.*'],
        runtimeHelpers: true,
        plugins: ['@babel/plugin-transform-runtime'],
        extensions: ['.tsx', '.ts'],
      }),
  ],
};
