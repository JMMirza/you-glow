module.exports = {
  apps: [
    {
      name: 'compodoc',
      script: 'npx',
      args: '@compodoc/compodoc -p tsconfig.json -s',
      watch: false,
      exec_mode: 'fork',
    },
  ],
};
