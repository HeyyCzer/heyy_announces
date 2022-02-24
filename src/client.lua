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
		src.renderAnnouncements()
		Citizen.Wait(idle)
	end
end)

function src.renderAnnouncements()
	local announcements = vSERVER.getCurrentAnnouncements()
	SendNUIMessage({ action = "showAnnounce", announces = announcements })
end

RegisterCommand("divulgar", function()
	print("Sistema desenvolvido por HeyyCzer#5755")
	if vSERVER.checkPermission() then
		TransitionToBlurred(1000)
		SetNuiFocus(true, true)
		SendNUIMessage({ action = "openAdminMenu" })
	end
end)

RegisterNUICallback("createNew", function(data, callback)
	callback(vSERVER.addNewAnnounce(data))
end)

RegisterNUICallback("closeAdminMenu", function(data, callback)
	SetNuiFocus(false, false)
	TransitionFromBlurred(1000)
	SendNUIMessage({ action = "closeAdminMenu" })
end)