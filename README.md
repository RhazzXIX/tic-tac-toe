# project-template
template for all projects

Add ESlint
https://www.digitalocean.com/community/tutorials/linting-and-formatting-with-eslint-in-vs-code
 1.) npm init --yes
 2.) npm install eslint --save-dev
 3.) ./node_modules/.bin/eslint --init
 4.) formatting on save Preferences: Open Workspace Settings (JSON)
			{
					"editor.codeActionsOnSave": {
							"source.fixAll.eslint": true
					},
					"eslint.validate": ["javascript"]
			}

Add Prettier
https://prettier.io/docs/en/install.html
	1.)	npm install --save-dev --save-exact prettier
	2.) echo {}> .prettierrc.json

Using Command Palette (CMD/CTRL + Shift + P)
1. CMD + Shift + P -> Format Document
OR
1. Select the text you want to Prettify
2. CMD + Shift + P -> Format Selection

ESLINT-CONFIG-PRETTIER for synchronization
https://github.com/prettier/eslint-config-prettier#installation
	1.) npm install --save-dev eslint-config-prettier
	2.) Then, add "prettier" to the "extends" array in your .eslintrc.* file. Make 
			sure to put it last, so it gets the chance to override other configs.
				{
					"extends": [
						"some-other-config-you-use",
						"prettier"
					]
				}