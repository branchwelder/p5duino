let port, connectBtn, barX;

const BAUD_RATE = 9600;
const barWidth = 5;

function setup() {
  createCanvas(windowWidth, windowHeight); // Create a canvas that is the size of our browser window
  background("gray"); // Set the background to gray initially

  port = createSerial();
  barX = 0;

  // in setup, we can open ports we have used previously without user interaction
  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], BAUD_RATE);
    background("purple");
  }

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

  let reading = Number(str.trim());

  // map the range of the input to the window height:
  let barHeight = map(reading, 0, 100, 0, windowHeight);

  noStroke();
  // Full-height purple bar to erase previous bar
  fill("purple");
  rect(barX * barWidth, 0, barWidth, windowHeight);

  // Coral-colored bar where reading is mapped to height
  fill("coral");
  rect(barX * barWidth, windowHeight - barHeight, barWidth, barHeight);

  // Blue tracker line which will get erased on the next loop
  fill("aqua");
  rect((barX + 1) * barWidth, 0, barWidth, windowHeight);

  barX++;
  // at the edge of the screen, go back to the beginning:
  if (barX * barWidth >= windowWidth) {
    barX = 0;
  }
}

function onConnectButtonClicked() {
  // When the connect button is clicked
  if (!port.opened()) {
    // If the port is not opened, we open it
    port.open(BAUD_RATE);
    background("purple");
  } else {
    // Otherwise, we close it!
    port.close();
    background("gray");
  }
}
