module.exports = {
    bundle: true,
    minify: false,
    sourcemap: true,
    target: 'node18',
    define: {
      'require.resolve': 'null',
    },
    platform: 'node',
    concurrency: 10,
};