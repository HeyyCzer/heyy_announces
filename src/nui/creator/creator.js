$(function () {
	const colorPicker = new iro.ColorPicker("#colorPicker", {
		width: 160,
		handleRadius: 9,
		borderWidth: 1,
		borderColor: "#fff",
	});

	$("#create-announce").click(() => {
		const title = $("#text-title").val();
		const description = $("#text-description").val();
		const hexColor = colorPicker.color.hexString;
		const endTime = new Date($("#announce-time").val()).getTime();
		if (title === "" || description === "" || endTime === NaN) return;
		
		console.log(endTime);

		$.post(`http://${GetParentResourceName()}/createNew`, JSON.stringify({
			title,
			description,
			hexColor,
			endTime,			
		}), (success) => {
			if (success)
				$.post(`http://${GetParentResourceName()}/closeAdminMenu`);
		});
	});
});

function openAdminMenu() {
	$("#admin-menu").fadeIn("fast");
}

function closeAdminMenu() {
	$("#admin-menu").fadeOut("fast");
}