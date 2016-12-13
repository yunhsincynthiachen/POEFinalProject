//declare pin to read the pressure sensor 
int sensorPin = 0;

//variable to store the pressure reading from the pressure sensor 
int pressureReading; 

void setup(){ 
 Serial.begin(9600);
 //declare the pressure sensor as an input 
 pinMode(sensorPin, INPUT);
}

void loop(){
 //read the analog value of the pressure sensor 
 pressureReading = analogRead(sensorPin); 
 
 //print the value of the pressure sensor 
 Serial.println(pressureReading); 
 delay(200); 
}
