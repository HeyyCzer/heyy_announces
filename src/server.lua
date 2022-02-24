local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
local vRP = Proxy.getInterface("vRP")
local vRPclient = Tunnel.getInterface("vRP")

local src = {}
Tunnel.bindInterface(GetCurrentResourceName(), src)
local vCLIENT = Tunnel.getInterface(GetCurrentResourceName())


vRP.prepare("heyy_announce/getMessages", "SELECT * FROM heyy_announces ORDER BY endTime")
vRP.prepare("heyy_announce/createNew", "INSERT INTO heyy_announces (title, description, hexColor, endTime) VALUES (@title, @description, @hexColor, @endTime)")
vRP.prepare("heyy_announce/removeOld", "DELETE FROM heyy_announces WHERE endTime < @endTime")

function src.getCurrentAnnouncements()
	local messages = vRP.query("heyy_announce/getMessages")
	return messages
end

function src.checkPermission()
	local source = source
	local user_id = vRP.getUserId(source)
	return vRP.hasPermission(user_id, "manager.permissao")
end

function src.addNewAnnounce(announce)
	local source = source
	local user_id = vRP.getUserId(source)
	if not vRP.hasPermission(user_id, "manager.permissao") then
		TriggerClientEvent("Notify",source,"negado","Você não tem permissão para isto.")
		return false
	end

	vRP.execute("heyy_announce/createNew", announce)
	TriggerClientEvent("Notify", source, "sucesso", "Anúncio criado com sucesso!")

	SetTimeout(5000, function()
		vCLIENT.renderAnnouncements(-1)
	end)
	return true
end

Citizen.CreateThread(function()
	while true do
		vRP.execute("heyy_announce/removeOld", { endTime = os.time() * 1000 })
		Citizen.Wait(30000)
	end
end)