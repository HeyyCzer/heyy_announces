const announceMaxTime = 20000;

$(document).ready(function () {
	window.addEventListener("message", function (event) {
		let item = event.data;
		switch (item.action) {
			case "openAdminMenu":
				openAdminMenu();
				break;

			case "closeAdminMenu":
				closeAdminMenu();
				break;
			
			case "showAnnounce":
				processAnnouncements(item.announces);
				break;
		}
	});

	document.onkeyup = function (data) {
		if (data.key == "Escape") {
			$.post(`http://${GetParentResourceName()}/closeAdminMenu`);
		}
	};
});

const clocks = [
	"🕐",
	"🕑",
	"🕒",
	"🕓",
	"🕔",
	"🕕",
	"🕖",
	"🕗",
	"🕘",
	"🕙",
	"🕚",
	"🕛",
]
function processAnnouncements(data) {
	if (data.length > 0) {
		$("#announce-wrapper").fadeIn("fast", () => {
			let time = 0;
			data.forEach(announce => {
				setTimeout(() => showAnnounce(announce), time);
				time += announceMaxTime;
			});
	
			setTimeout(() =>
				$("#announce-wrapper").fadeOut(),
				time
			);
		});
	}
}

function showAnnounce(announce) {
	$("#announce-wrapper").html(`
		<div class="announcement">
			<div class="announce-title" style="color: ${announce.hexColor}">
				${announce.title}
			</div>
			<div class="announce-desc">
				${announce.description.replaceAll("<b>", `<b style="color: ${announce.hexColor}">`)}
			</div>
			<div class="announce-timeout">
			<span class="animated-clock">🕐</span> Por tempo indeterminado!
			</div>
		</div>
	`);

	let currentClock = updateInformation(announce, 0);
	const updateTask = setInterval(() => {
		currentClock = updateInformation(announce, currentClock);
	}, announceMaxTime / (clocks.length * 10));

	setTimeout(() => {
		clearInterval(updateTask);
	}, announceMaxTime);
}

function updateInformation(announce, currentClock) {
	if (announce.endTime)
		$(".announce-timeout").html(`Restam só <span class="animated-clock">🕐</span> <b>${timeFormatter(announce.endTime)}</b>!`);

	if (currentClock < clocks.length - 1)
		currentClock++;

	else
		currentClock = 0;
	$(".animated-clock").html(`${clocks[currentClock]}`);
	return currentClock;
}

function timeFormatter(time) {
	const currentTime = new Date()
	const timeLeft = (time - currentTime) / 1000;
	
	let t = timeLeft;
	t /= 60;
	const minutes = parseInt(t % 60);
	t /= 60;
	const hours = parseInt(t % 24);
	t /= 24;
	const days = parseInt(t);

	if (days > 0)
		return `${days} ${days > 1 ? "dias" : "dia"}`;
	else if (hours > 0)
		return `${hours} ${hours > 1 ? "horas" : "hora"} e ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
	else if (minutes > 0)
		return `${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
	else
		return `${timeLeft > 0 ? parseInt(timeLeft) : 0} ${parseInt(timeLeft) === 1 ? "segundo" : "segundos"}`;
}