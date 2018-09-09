module.exports = {
  "parser": "typescript-eslint-parser",
  "parserOptions": { "sourceType": "module" },
  "plugins": [ "fp", "tslint", "typescript" ],
  "extends": [ "plugin:fp/recommended" ],
  "rules": {
    "tslint/config": ["error", {
      "rules": Object.assign({},
        require('tslint/lib/configs/recommended').rules,
        require('typestrict/tslint').rules,
        { "max-line-length": { options: [ 80 ]}}
      ),
      "rulesDirectory": [ "node_modules/tslint/lib/rules" ].concat(
        require('typestrict/tslint').rulesDirectory
      ),
    }]
  }
}
