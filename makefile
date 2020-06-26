postcss = node_modules/postcss-cli/bin/postcss
postcssargs = src/**/*.postcss -d dist/ \
	--ext "css" \
	--base src \
	-u postcss-easy-import \
	-u precss \
	-u autoprefixer

webpack = node_modules/webpack-cli/bin/cli.js --config src/webpack.config.js

watch:
	@echo "WATCHING"
	$(postcss) --watch $(postcssargs) & \
	$(webpack) --mode=development --watch --devtool inline-cheap-source-map

build-js:
	$(webpack) --mode=production

build-css:
	$(postcss) --no-map $(postcssargs) -u cssnano