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
				showAnnounce(item.announces);
				break;
		}
	});

	document.onkeyup = function (data) {
		if (data.key == "Escape") {
			$.post(`http://${GetParentResourceName()}/closeAdminMenu`);
		}
	};
});

function openAdminMenu() {
	$("#admin-menu").fadeIn("fast");
}

function closeAdminMenu() {
	$("#admin-menu").fadeOut("fast");
}

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
				time += 15000;
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
			<div class="announce-title">
				${announce.title}
			</div>
			<div class="announce-desc">
				${announce.description}
			</div>
			<div class="announce-timeout">
				Restam só <span class="animated-clock">🕐</span> <b>3 dias</b>!
			</div>
		</div>
	`);

	let currentClock = 0;
	const clockAnimation = setInterval(() => {
		if (currentClock < clocks.length - 1)
			currentClock++;
		else
			currentClock = 0;
		$(".animated-clock").html(`${clocks[currentClock]}`);
	}, 100);

	setTimeout(() => {
		clearInterval(clockAnimation);
	}, 15000);
}

function timeFormatter() {
	
}