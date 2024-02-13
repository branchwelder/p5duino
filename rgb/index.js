let port, connectBtn, circleDiameter;

const BAUD_RATE = 9600;

function setup() {
  createCanvas(windowWidth, windowHeight); // Create a canvas that is the size of our browser window
  background("gray"); // Set the background to gray initially

  port = createSerial();

  // in setup, we can open ports we have used previously without user interaction
  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], BAUD_RATE);
  }

  circleDiameter = min(windowWidth, windowHeight) * 0.5;

  // Font settings
  textFont("system-ui", 50);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);

  blendMode(ADD);

  // any other ports can be opened via a dialog after
  // user interaction (see onConnectButtonClicked below)
  connectBtn = createButton("Connect to Arduino");
  connectBtn.position(5, 5);
  connectBtn.mouseClicked(onConnectButtonClicked);
}

function draw() {
  // First, we check if the port is open
  if (!port.opened()) {
    // If it is not, change button text
    connectBtn.html("Connect to Arduino");
    // Set background to gray
    background("gray");
    // And return (to not read anything from the port)
    return;
  } else {
    // Otherwise we are connected
    connectBtn.html("Disconnect");
  }

  let str = port.readUntil("\n"); // Read from the port until the newline
  if (str.length == 0) return; // If we didn't read anything, return

  let rgbArray = str.split(",");

  let red = Number(rgbArray[0]);
  let green = Number(rgbArray[1]);
  let blue = Number(rgbArray[2]);

  clear();

  background(0); // black background
  translate(windowWidth / 2, windowHeight / 2); // move the origin to the center

  // Text on top
  fill(255);
  stroke(0);
  strokeWeight(4);
  text(`${red}, ${green}, ${blue}`, 0, -circleDiameter * 0.75);

  // Red circle
  fill(red, 0, 0);
  circle(0, circleDiameter / 4, circleDiameter);

  // Green circle
  rotate((2 * PI) / 3);
  fill(0, green, 0);
  circle(0, circleDiameter / 4, circleDiameter);

  // Blue circle
  rotate((2 * PI) / 3);
  fill(0, 0, blue);
  circle(0, circleDiameter / 4, circleDiameter);
}

function onConnectButtonClicked() {
  // When the connect button is clicked
  if (!port.opened()) {
    // If the port is not opened, we open it
    port.open(BAUD_RATE);
  } else {
    // Otherwise, we close it!
    port.close();
  }
}
