#include <Adafruit_NeoPixel.h>

//setting threshold 
int THRESHOLD = 400;

//set the interval of communication with website 
int SENDINTERVAL = 5000;

//communication time trackers interval 
float previousTimeStamp = 0; 
float currentTimeStamp; 

//INPUTS
//hold left sensor pin and pressure 
int LeftSensorPin = 0;
float LeftPressure; 

//int DownSensorPin = 1;
//float DownPressure; 

//structure to store what comes from web app
int inputArrows[4] = {1,0,0,0}; 

//OUTPUT
//this is the Led Strip pin 
int LEDStripPin = 6;

//buttons Pressed should be LEFT, DOWN, UP, RIGHT
int arrowsPressed[] = {0, 0, 0, 0};

//make LED strip object 
Adafruit_NeoPixel strip = Adafruit_NeoPixel(60, LEDStripPin);

void setup(){ 
  Serial.begin(9600); 
  pinMode(LeftSensorPin, INPUT); 
  pinMode(LEDStripPin, OUTPUT);
  
  //necessary to initialize LED strip 
  strip.begin();
  strip.show(); // Initialize all pixels to 'off'
} 

void loop(){
  //record the current time stamp 
  currentTimeStamp = millis(); 
  //if more than 5000 miliseconds has passed, then send and read info 
  if ((currentTimeStamp - previousTimeStamp) >= SENDINTERVAL){ 
    //need to read info for the very first time 
    if (previousTimeStamp = 0){ 
      readInfo(); 
    }
    //then always send and then read 
    sendInfo(inputArrows, arrowsPressed); 
    readInfo(); 
  }
  
  //read left pressure and then record if it was pressed 
  LeftPressure = analogRead(LeftSensorPin); 
  if (inputArrows[0] == 1){ 
    determinePadPress(LeftPressure, 0);
  } 

  //read right pressure and then record if it was pressed 
//  DownPressure = analogRead(DownSensorPin);
//  determinePadPress(DownPressure, 1);  
}
void sendInfo(int* aInput, int* aPressed){ 
    String aPressedString = convertArrayToString(aPressed); 
    Serial.println(aPressedString); 
    //if the time frame is over and they did not press the arrow they were supposed to, then make arrow red  
    if (!compareInputToOutput(aInput, aPressed)){
      //make led strip red cause they didn't hit it
      int start = mapArrowNumToLEDs(findHigh(inputArrows)); 
      turnLightsRed(start, start + 10);  
      delay(300);  
    } 
    
    //update previous time it was in this sending loop
    previousTimeStamp = currentTimeStamp; 
    
    //clear arrows pressed
    resetArrowsPressed(); 
//    int start = mapArrowNumToLEDs(findHigh(inputArrows)); 
    //turn all the lights off 
    turnLightsOff(0, 20);
} 

void readInfo(){ 
  //TO DO: figure out how to get information? 
  //fake input is placeholder for getting information later 
  String contentString; 
  int content; 
//   if (Serial.available()>0) {
//     content = Serial.parseInt(); 
//     contentString = String(content); 
//     inputArrows[0] = contentString.charAt(0); 
//     inputArrows[1] = contentString.charAt(1);
//     inputArrows[2] = contentString.charAt(2);
//     inputArrows[3] = contentString.charAt(3);
//   }
//   
//  Serial.println(content);  
  //make arrows blue if they need to be pressed 
  int start = mapArrowNumToLEDs(findHigh(inputArrows)); 
  if (inputArrows[0] ==1) { 
      turnLightsBlue(start, start + 10);  
  }
} 

void determinePadPress(float pressure, int arrowNum){
  //if the pressure is greater than the threshold, then the arrow was pressed 
  if (pressure >= THRESHOLD){ 
   //record the press in the arrows pressed array 
   arrowsPressed[arrowNum] = 1; 
   //if the arrow was meant to be pressed, make it green
   //otherwise, if the arrow was not meant to be pressed, make it red? 
   int start = mapArrowNumToLEDs(arrowNum); 
   if (findHigh(inputArrows) == arrowNum){
        //turn led strip on because you got it correct 
     turnLightsGreen(start, start + 10); 
   }
   else{ 
     //Q: what happens if you hit the wrong pad?
     turnLightsRed(start, start + 10); 
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
  for (int i = 0; i < sizeof(data); i ++){ 
   if(data[i] == 1){ 
      return i; 
   } 
  }
  return 5; 
}

int mapArrowNumToLEDs(int arrowNum){
  //map the arrow number to where the LED strip should start to turn on 
  //if left pad press turn on LEDs 0 -10 
  //if down pad press, turn on LEDs 10 - 20 
   switch(arrowNum){ 
    case 0: 
      return 0; 
      break; 
    case 1: 
      return 10;
      break; 
   } 
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
    strip.setPixelColor(i, 10, 255, 5);
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
