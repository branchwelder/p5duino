const int X_PIN = A0;
const int Y_PIN = A1;
const int DIAM_PIN = A2;

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  Serial.print(analogRead(X_PIN));
  Serial.print(",");
  Serial.print(analogRead(Y_PIN));
  Serial.print(",");
  Serial.println(analogRead(DIAM_PIN));
  delay(50);
}