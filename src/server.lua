local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
local vRP = Proxy.getInterface("vRP")
local vRPclient = Tunnel.getInterface("vRP")

local src = {}
Tunnel.bindInterface(GetCurrentResourceName(), src)
local vCLIENT = Tunnel.getInterface(GetCurrentResourceName())


vRP.prepare("heyy_announce/getMessages", "SELECT * FROM heyy_announces ORDER BY endDate")

function src.getCurrentAnnouncements()
	local messages = vRP.query("heyy_announce/getMessages")
	
	return
end