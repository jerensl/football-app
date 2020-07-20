const { merge } = require("webpack-merge");

const applMerge = (env) => {
  const { presets } = env;
  const mergedPresets = [].concat(...[presets]);
  const mergedConfig = mergedPresets.map((presetsName) =>
    require(`./presets/webpack.${presetsName}`)(env)
  );

  return merge({}, ...mergedConfig);
};

module.exports = applMerge;
