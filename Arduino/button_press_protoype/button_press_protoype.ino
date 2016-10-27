int buttonPin = 13; 
int LEDout = A0; 

int prevState = HIGH; 
int currentState; 
unsigned long firstTime; 

void setup(){ 
  Serial.begin(9600); 
  pinMode(buttonPin, INPUT); 
  pinMode(LEDout, OUTPUT); 
} 

void loop(){
 //when button is pressed, it completes the circuit of and "pulls down" 
  int buttonOpen = digitalRead(buttonPin); 
  currentState = buttonOpen; 
  
//  if (!buttonOpen){ 
//    Serial.write(10);
//    digitalWrite(LEDout, HIGH);
//    delay(400);
//    digitalWrite(LEDout, LOW); 
//    Serial.write(11);  
//  }
  
  //if it is recently pressed, then set the time as the "first time" aka the zeroth millisecond 
  //this will help compare how long button has been pressed
  if ((currentState == LOW) && (prevState == HIGH)){
//    Serial.println("PRESSED");
    Serial.write(10);
    firstTime = millis(); 
    prevState = LOW;
   
    digitalWrite(LEDout, HIGH);
    delay(200);
    digitalWrite(LEDout, LOW);  
    delay(200);
    
  }
  
  //calculate how long the button has been held 
  long timeHeld = millis() - firstTime; 
//  Serial.println("first time pressed"); 
//  Serial.println(firstTime); 
//  Serial.println(timeHeld); 
   
  //if the button has been held longer than some time (for noise purposes), 
  if((timeHeld > 20) && (firstTime !=0)){ 
//    Serial.println("IN here"); 
//    Serial.println("modulo");
//    Serial.println(timeHeld%1000); 
//    delay(100);
    
    if(currentState == LOW){ 
      if ((timeHeld%1000 >=0) && (timeHeld%1000 <=50)){ 
//        Serial.println("one second has passed");
        digitalWrite(LEDout, HIGH);
        delay(200);
        digitalWrite(LEDout, LOW);
        delay(200); 
      }
    }    
    if((currentState == HIGH) && (prevState == LOW)){
       digitalWrite(LEDout, LOW);  
//       Serial.println("unpress"); 
       Serial.write(11);  
       prevState = currentState; 
       firstTime = 0; 
    }
  }
  
}
