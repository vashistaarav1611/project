var status = "";
var img = "";
obj = [];

function preload() {
	//	img = loadImage("dog_cat.jpg")
}

function setup() {
	canvas = createCanvas(680, 680);
	canvas.center();
	ml5class = ml5.objectDetector("cocossd", modelcoco);
	document.getElementById("status").innerHTML = "Status: detecting objects";
	video = createCapture(VIDEO);
	video.hide();

}

function modelcoco() {
	console.log("cocossd fired");
	status = true;
}

function gotres(error, res) {
	if (error) {
		console.error("cocossd error")
	} else {
		console.log(res);
		obj = res;
	}
}

function draw() {
	image(video, 0, 0, 680, 680);
	if (status != "") {
		ml5class.detect(video, gotres);
		for (i = 0; i < obj.length; i++) {
			r = random(255);
			b = random(255);
			g = random(255);
			document.getElementById("status").innerHTML = "Status: Objects Detected";
			fill(r, b, g);
			percent = floor(obj[i].confidence * 100);
			console.log(percent);
			textSize(28);
			text(obj[i].label + " " + percent + "%", obj[i].x + 15, obj[i].y + 20);
			noFill();
			stroke(r, b, g);
			strokeWeight(4)
			rect(obj[i].x, obj[i].y, obj[i].width, obj[i].height);
			document.getElementById("obj-dect").innerHTML = "object number: " + obj.length + "(" + obj[i].label + ")";
		}
	}
}
