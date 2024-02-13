let port, connectBtn;

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

  // Font settings
  textFont("system-ui", 50);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);

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

  // trim the whitespace (the newline) and convert the string to a number
  let buttonState = Number(str.trim());

  if (buttonState === 0) {
    // If the button is not pressed, make the background green
    background("darkcyan");
    fill("coral");
    text("not pressed", windowWidth / 2, windowHeight / 2);
  } else if (buttonState === 1) {
    // Else if the button is pressed, make the background yellow
    background("lightskyblue");
    fill("yellow");
    text("pressed!", windowWidth / 2, windowHeight / 2);
  }
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
