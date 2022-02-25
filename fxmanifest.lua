fx_version 'adamant'
game 'gta5'

files {
	'src/nui/**',
}

ui_page 'src/nui/index.html'

client_scripts {
	'@vrp/lib/utils.lua',
	'config.lua',
	'src/client.lua'
}

server_scripts {
	'@vrp/lib/utils.lua',
	'config.lua',
	'src/server.lua',
}