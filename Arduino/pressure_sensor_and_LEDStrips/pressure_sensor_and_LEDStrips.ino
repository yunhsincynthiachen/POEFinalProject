#include <Adafruit_NeoPixel.h>

//setting threshold 
int THRESHOLD = 950;

//set the interval of communication with website 
int SENDINTERVAL = 3000;

//communication time trackers interval 
float previousTimeStamp = 0; 
float currentTimeStamp; 

//INPUTS
//hold left sensor pin and pressure 
int LeftSensorPin = 0;
int UpSensorPin = 1;
int DownSensorPin = 2;
int RightSensorPin = 3;

float LeftPressure, DownPressure, UpPressure, RightPressure; 

//structure to store what comes from web app
int inputArrows[4]; 

//OUTPUT
//this is the Led Strip pin 
int LEDStripPin = 6;

//buttons Pressed should be LEFT, DOWN, UP, RIGHT
int arrowsPressed[] = {0, 0, 0, 0};

//make LED strip object 
Adafruit_NeoPixel strip = Adafruit_NeoPixel(60, LEDStripPin);

//boolean to keep state while reading 
bool inProgress = false;  

void setup(){ 
  Serial.begin(9600); 
  pinMode(LeftSensorPin, INPUT); 
  pinMode(RightSensorPin, INPUT);
  pinMode(UpSensorPin, INPUT);
  pinMode(DownSensorPin, INPUT);

  pinMode(LEDStripPin, OUTPUT);
  
  //necessary to initialize LED strip 
  strip.begin();
  strip.show(); // Initialize all pixels to 'off'
} 

void loop(){
   currentTimeStamp = millis(); 
   if (inProgress){ 
    //code to happen in progress, when the blue light is on or the arrow is moving 
    //record the current time stamp 
    //if more than 5000 miliseconds has passed, then send and read info 
    if ((currentTimeStamp - previousTimeStamp) >= SENDINTERVAL){
      inProgress = false;  
//      //then always send and then read 
      sendInfo(inputArrows, arrowsPressed); 
    }
    //read left pressure and then record if it was pressed 
//    delay(200);
    LeftPressure = analogRead(LeftSensorPin); 

    DownPressure = analogRead(DownSensorPin);
//    delay(200);
    UpPressure = analogRead(UpSensorPin);
//    delay(200);
    RightPressure = analogRead(RightSensorPin);
//    delay(200); 

    if (inputArrows[0] == 1){ 
      determinePadPress(LeftPressure, 0);
    } else if (inputArrows[1] == 1) {
      determinePadPress(DownPressure, 1);
    } else if (inputArrows[2] == 1) {
      determinePadPress(UpPressure, 2);
    } else if (inputArrows[3] == 1) {
      determinePadPress(RightPressure, 3);
    }
  }
 
  if (!inProgress){ 
    //then always send and then read 
//    sendInfo(inputArrows, arrowsPressed); 
    readInfo();
  }  
}

void sendInfo(int* aInput, int* aPressed){ 
    String aPressedString = convertArrayToString(aPressed); 
    Serial.println(aPressedString);
<<<<<<< HEAD
    delay(300);  
=======
    delay(10);  
>>>>>>> 9113ab7a2e78c591e7836426d67ce83af6aad43a
    //if the time frame is over and they did not press the arrow they were supposed to, then make arrow red  
    if (!compareInputToOutput(aInput, aPressed)){
      //make led strip red cause they didn't hit it
      int start = 10; 
      if (inputArrows[0] == 1) {
        turnLightsRed(0, 15);  
      } 
      else if (inputArrows[1] == 1) {
        turnLightsRed(0, 7); 
        turnLightsRed(23, 30);  
      } 
      else if (inputArrows[2] == 1) {
        turnLightsRed(7, 21);  
      } 
      else if (inputArrows[3] == 1) {
        turnLightsRed(15, 30);  
      } 
    } 
    
    //clear arrows pressed
    resetArrowsPressed(); 
    //    int start = mapArrowNumToLEDs(findHigh(inputArrows)); 
    //turn all the lights off 
    turnLightsOff(0, 30);
} 

void readInfo(){ 
  String contentString; 
  int content; 
   if (Serial.available()>0) { 
     contentString = Serial.readString(); 
     inputArrows[0] = (int)(contentString.charAt(1)) - 48; 
     inputArrows[1] = (int)(contentString.charAt(2)) - 48;
     inputArrows[2] = (int)(contentString.charAt(3)) - 48;
     inputArrows[3] = (int)(contentString.charAt(4)) - 48;
     
     
      if (inputArrows[0] == 1) {
        turnLightsBlue(0, 15);  
      } 
      else if (inputArrows[1] == 1) {
        turnLightsBlue(0, 7); 
        turnLightsBlue(23, 30);  
      } 
      else if (inputArrows[2] == 1) {
        turnLightsBlue(7, 21);  
      } 
      else if (inputArrows[3] == 1) {
        turnLightsBlue(15, 30);  
      } 
      
      inProgress = true; 
      //update previous time it was in this sending loop
      previousTimeStamp = currentTimeStamp; 
   }
   
} 

void determinePadPress(float pressure, int arrowNum){
  //if the pressure is greater than the threshold, then the arrow was pressed 
  if (pressure >= THRESHOLD){ 
   //record the press in the arrows pressed array 
   arrowsPressed[arrowNum] = 1; 
   //if the arrow was meant to be pressed, make it green
   //otherwise, if the arrow was not meant to be pressed, make it red? 
 
      if (arrowNum == 1) {
        turnLightsGreen(0, 15);  
      } 
      else if (arrowNum == 1) {
        turnLightsGreen(0, 7); 
        turnLightsGreen(23, 30);  
      } 
      else if (arrowNum == 1) {
        turnLightsGreen(7, 21);  
      } 
      else if (arrowNum == 1) {
        turnLightsGreen(15, 30);  
      }   
  } 
}
 
int compareInputToOutput(int *inputs, int *pressed){
  //check if the input array matches what I pressed 
  //return true if the inputs equal the pressed, otherwise return false 
  for (int i = 0; i <4; i++){ 
    if (inputs[i] != pressed[i]){ 
      return false; 
    }  
  } 
  return true; 
}


int findHigh(int* data){
  //find the only number in the array that is supposed to be pressed or is high  
  //this assumes only one will be high 
  for (int i = 0; i < sizeof(data); i++){ 
   if(data[i] == 1){ 
      return i; 
   } 
  }
  return 5; 
}

String convertArrayToString(int data[]){ 
  //cannot print array apparently, just making integer array into string to print 
  String res = "";
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
 //clear the arrows pressed integer array 
 for (int j = 0; j < 4; j++){ 
  arrowsPressed[j] = 0; 
 } 
}

//LIGHT FUNCTIONS 
void turnLightsGreen(int startLEDs, int endLEDs){ 
   for (int i = startLEDs; i < endLEDs; i++){ 
    strip.setPixelColor(i, 0, 255, 5);
   }  
   strip.show(); 
}

void turnLightsRed(int startLEDs, int endLEDs){ 
   for (int i = startLEDs; i < endLEDs; i++){ 
    strip.setPixelColor(i, 255, 10, 10);
   } 
  strip.show();  
} 

void turnLightsBlue(int startLEDs, int endLEDs){ 
   for (int i = startLEDs; i < endLEDs; i++){ 
    strip.setPixelColor(i, 10, 10, 255);
   } 
  strip.show();   
  
}

void turnLightsOff(int startLEDs, int endLEDs){ 
   for (int i = startLEDs; i < endLEDs; i++){ 
    strip.setPixelColor(i, 0, 0, 0);
   }
   strip.show(); 
}
