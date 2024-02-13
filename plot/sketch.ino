const int pin = A0;

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  int value = map(analogRead(pin), 512, 1023, 0, 100);

  Serial.println(value);
  delay(50);
}