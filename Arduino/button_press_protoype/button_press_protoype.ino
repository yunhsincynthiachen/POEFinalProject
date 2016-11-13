const int THRESHOLD = 400;
const int SENDINTERVAL = 5; 

int LeftSensorPin = 0;
float LeftPressure; 
int LeftLED = 9; 
int DownSensorPin = 1;
float DownPressure; 
int DownLED = 10; 

int LEDPins[] = {LeftLED, DownLED};
float brightness;
//buttons Pressed should be LEFT, DOWN, UP, RIGHT
int arrowsPressed[] = {0, 0, 0, 0};
float previousTimeStamp = 0; 
float currentTimeStamp; 
String arrowsString; 

int numericArrowString; 

void setup(){ 
  Serial.begin(9600); 
  pinMode(LeftSensorPin, INPUT); 
  pinMode(DownSensorPin, INPUT); 
  pinMode(LeftLED, OUTPUT);
  pinMode(DownLED, OUTPUT);  
} 

void loop(){
  currentTimeStamp = millis(); 
  if ((currentTimeStamp - previousTimeStamp) >= SENDINTERVAL){ 
    arrowsString = convertArrayToString(arrowsPressed);
//    numericArrowString = arrowsString.toInt();  
//    Serial.println(isdigit(numericArrowString)); 
    Serial.println(arrowsString);
//    delay(200); 
    
    //update previous
    previousTimeStamp = currentTimeStamp; 
    
    //clear buttons pressed
    resetArrowsPressed(); 
  }
  
  LeftPressure = analogRead(LeftSensorPin);  
  DownPressure = analogRead(DownSensorPin);
  recordPadPress(LeftPressure, 0);
  recordPadPress(DownPressure, 1);  
}

 String convertArrayToString(int data[]){ 
  String res = "1";
  for (int i = 0; i < 4; i++){ 
    if (i == 3){ 
      res = res + String(data[i]); 
    }
    else{ 
      res = res + String(data[i]); 
    }
  } 
  return res; 
}

void resetArrowsPressed(){ 
 for (int j = 0; j < 4; j++){ 
  arrowsPressed[j] = 0; 
 } 
}
 
 void recordPadPress(float pressure, int arrowNum){
   if (pressure >= THRESHOLD){ 
    //left button was pressed
    arrowsPressed[arrowNum] = 1; 
    brightness = map(pressure, 0, 1023, 0, 255);  
    analogWrite(LEDPins[arrowNum], brightness); 
    delay(100); 
  } 
  else{ 
    analogWrite(LEDPins[arrowNum], LOW); 
    delay(100); 
  } 
   
 } 
