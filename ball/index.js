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

  // any other ports can be opened via a dialog after
  // user interaction (see connectBtnClick below)
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

  let x = Number(rgbArray[0]);
  let y = Number(rgbArray[1]);
  let diameter = Number(rgbArray[2]);

  let xPos = map(x, 512, 1023, 0, windowWidth);
  let yPos = map(y, 512, 1023, 0, windowHeight);
  let circleDiam = map(diameter, 512, 1023, 10, 40);

  circle(xPos, yPos, circleDiam);
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
