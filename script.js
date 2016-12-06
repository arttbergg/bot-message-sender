(function(){
	document.getElementById("token").value = localStorage.getItem("token");
	document.getElementById("chatId").value = localStorage.getItem("chatId");
	document.getElementById("message").value = localStorage.getItem("message");
})()
		
function getAndSent() {
	var token, chatId, message, chatIdSplit, xhr;
	token = document.getElementById("token").value;
	chatId = document.getElementById("chatId").value;
	message = document.getElementById("message").value;
	console.log("Message: " + message);

	// record data to localStorage
	localStorage.setItem("token", token);
	localStorage.setItem("chatId", chatId);
	localStorage.setItem("message", message);

	// fix newline
	message = message.replace(/(?:\r\n|\r|\n)/g, '%0A');
	// split list of chatId to array
	chatIdSplit = chatId.split("\n");

	// sending data to recipients
	for (i = 0; i < chatIdSplit.length; i++) {
		var url = "https://api.telegram.org/bot" + token + "/sendmessage?chat_id=" + chatIdSplit[i] + "&parse_mode=Markdown" + "&text=" + message;
		xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.send();
	}
	
	// check inputs
	if (token.length < 1 || chatId.length < 1 || message.length < 1 ) {
		document.getElementById("result").innerHTML = "<p class='red'>Please, fill the all fields below!<p>";
	} else {
		document.getElementById("result").innerHTML = "<p class='green'>Done!<p>";
	}
}

// event listener on send button
document.getElementById("send").addEventListener("click", getAndSent);