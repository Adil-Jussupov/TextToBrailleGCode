// Create a new document
var doc = app.documents.add();

// Define the circle's properties
var centerX = doc.width / 2;
var centerY = doc.height / 2;
var radius = 100;

// Create the circle (oval) in the center of the document
var circle = doc.pathItems.ellipse(centerY + radius, centerX - radius, radius * 2, radius * 2);

// Set the fill color to blue
var fillColor = new RGBColor();
fillColor.red = 0;
fillColor.green = 0;
fillColor.blue = 255;
circle.filled = true;
circle.fillColor = fillColor;

// Set the stroke color to none
circle.stroked = false;

alert("Circle created in the middle of the canvas!");
