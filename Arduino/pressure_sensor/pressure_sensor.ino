#include <Adafruit_NeoPixel.h>

//setting threshold 
int THRESHOLD = 950;

//INPUTS
//hold left sensor pin and pressure 
int leftSensorPin = 0;
int upSensorPin = 1;
int downSensorPin = 2;
int rightSensorPin = 3;

//pressureUp, pressureDown, pressureLeft, 
float pressureRight, pressureDown, pressureLeft, pressureUp;

void setup(){ 
  Serial.begin(9600); 
  pinMode(leftSensorPin, INPUT); 
  pinMode(upSensorPin, INPUT); 
  pinMode(downSensorPin, INPUT); 
  pinMode(rightSensorPin, INPUT); 
  
//  pinMode(LEDPin, OUTPUT);
} 

void loop(){
  delay(100);
  pressureUp = analogRead(upSensorPin); 
  delay(100);
  pressureUp = analogRead(upSensorPin); 
  delay(100);
  pressureDown = analogRead(downSensorPin);
  delay(100);
  pressureDown = analogRead(downSensorPin);
  delay(100);
  pressureRight = analogRead(rightSensorPin); 
  delay(100);  
  pressureRight = analogRead(rightSensorPin); 
  delay(100);  
  pressureLeft = analogRead(leftSensorPin); 
  delay(100);  
  pressureLeft = analogRead(leftSensorPin); 

  //LEDbrightness = map(LeftPressure, 0, 1023, 0, 255);
  //analogWrite(LEDpin, LEDbrightness);
  //delay(100);

  if ((pressureLeft > THRESHOLD)){ 
    Serial.print("LEFT ");
    Serial.println(pressureLeft);
  } else if ((pressureRight > THRESHOLD)){
    Serial.print("RIGHT ");
    Serial.println(pressureRight);
  } else if ((pressureDown > THRESHOLD)) {
    Serial.print("DOWN ");
    Serial.println(pressureDown);
  } else if (pressureUp > THRESHOLD) {
    Serial.print("UP ");
    Serial.println(pressureUp);
  }
}
