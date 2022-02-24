local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
local vRP = Proxy.getInterface("vRP")

local src = {}
Tunnel.bindInterface(GetCurrentResourceName(), src)
local vSERVER = Tunnel.getInterface(GetCurrentResourceName())

Citizen.CreateThread(function()
	Wait(10000)
	while true do
		local idle = 15 * 60 * 1000
	

		Citizen.Wait(idle)
	end
end)


RegisterCommand("divulgar", function()
	print("Sistema desenvolvido por HeyyCzer#5755")
	if vSERVER.checkPermission() then
		SendNUIMessage({ openMenu = true })
	end
end)