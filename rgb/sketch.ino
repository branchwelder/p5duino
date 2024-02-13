const int RED = A0;
const int GREEN = A1;
const int BLUE = A2;

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  int r = map(analogRead(RED), 512, 1023, 0, 255);
  int g = map(analogRead(GREEN), 512, 1023, 0, 255);
  int b = map(analogRead(BLUE), 512, 1023, 0, 255);

  Serial.print(r);
  Serial.print(",");
  Serial.print(g);
  Serial.print(",");
  Serial.println(b);
  delay(50);
}