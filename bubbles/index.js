let port, connectBtn, rotation;

const BAUD_RATE = 9600;

function setup() {
  createCanvas(windowWidth, windowHeight); // Create a canvas that is the size of our browser window
  background("gray"); // Set the background to gray initially

  port = createSerial();
  rotation = 0;
  blendMode(SCREEN);
  colorMode(HSB, 100);

  // in setup, we can open ports we have used previously without user interaction
  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], BAUD_RATE);
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

  let [a0, a1, a2, distance, button] = str.split(",");

  let numCircles = floor(map(Number(a0), 512, 1023, 0, 50));
  let r1 = map(Number(a1), 512, 1023, 0, 50);
  let r2 = map(Number(a2), 512, 1023, 100, 300);

  // let diameter = constrain(map(Number(distance), 0, 300, 300, 20), 20, 300);
  let diameter = map(Number(a1), 512, 1023, 5, 100);

  noStroke();

  if (Number(button) === 0) {
    clear();
    background(0);
  }

  translate(width / 2, height / 2);
  rotate(rotation);

  let angle = (2 * PI) / numCircles;

  for (let i = 0; i < numCircles; i++) {
    rotate(angle);
    fill(map(i * angle, 0, 2 * PI, 0, 100), 70, 70);
    circle(0, r1, diameter);
    circle(0, r2, diameter);
  }

  // reverse rotation if button is pressed
  if (Number(button) === 0) {
    rotation += 0.01;
  } else {
    rotation -= 0.01;
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
