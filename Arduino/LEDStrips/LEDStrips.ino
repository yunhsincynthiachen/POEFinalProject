#include <Adafruit_NeoPixel.h>

int StripPin = 6; 
 
// Parameter 1 = number of pixels in strip
// Parameter 2 = pin number (most are valid)
// Parameter 3 = pixel type flags, add together as needed:
//   NEO_KHZ800  800 KHz bitstream (most NeoPixel products w/WS2812 LEDs)
//   NEO_KHZ400  400 KHz (classic 'v1' (not v2) FLORA pixels, WS2811 drivers)
//   NEO_GRB     Pixels are wired for GRB bitstream (most NeoPixel products)
//   NEO_RGB     Pixels are wired for RGB bitstream (v1 FLORA pixels, not v2)
//Adafruit_NeoPixel strip = Adafruit_NeoPixel(60, PIN, NEO_GRB + NEO_KHZ800);

Adafruit_NeoPixel strip = Adafruit_NeoPixel(30, StripPin);

void setup(){ 
  Serial.begin(9600); 
  pinMode(StripPin, OUTPUT); 
  strip.begin();
  strip.setBrightness(20); 
  strip.show(); // Initialize all pixels to 'off'
  
//  strip.setPixelColor(0, 255, 0, 255);
//  strip.setPixelColor(1, 255, 0, 255);
//  strip.show(); 
//    
} 

void loop(){ 
  strip.setPixelColor(2, 100, 200, 0); 
  for (int i = 0; i < 30; i++){ 
    strip.setPixelColor(i, 255, 0, 0); 
    strip.show();
    delay(200);  
  }
}

