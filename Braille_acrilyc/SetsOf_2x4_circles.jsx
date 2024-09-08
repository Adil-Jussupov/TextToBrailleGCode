// Function to check if the word "red" is in the text file
function readColorFromFile(filePath) {
    var file = new File(filePath);
    var color = "blue"; // Default color

    if (file.exists) {
        file.open('r'); // Open file for reading
        var contents = file.read();
        file.close();

        // Check if the word "red" exists in the file content
        if (contents.toLowerCase().indexOf("red") !== -1) {
            color = "red";
        }
    }

    return color;
}

// Path to the text file (Change this to the location of your file)
var textFilePath = "~/Desktop/TextToBrailleGCode/Braille_acrilyc/color.txt"; // Example: File on Desktop named 'color.txt'

// Read the color from the file
var selectedColor = readColorFromFile(textFilePath);

var binText = "101010";
// Create a new document
var doc = app.documents.add();

// Define circle properties
var circleDiameter = 1; // 1 mm
var circleRadius = circleDiameter / 2; // Radius = Diameter / 2

// Define spacing properties in millimeters
var spacingX = 2.5; // 4 mm between columns
var spacingY = 2.5; // 2.5 mm between rows
var setSpacingX = 6; // 10 mm between sets
var setSpacingY = 10; // 10 mm between sets

// Convert mm to points (Illustrator uses points, 1 mm ≈ 2.83465 points)
var mmToPt = 2.83465;
spacingX *= mmToPt;
spacingY *= mmToPt;
setSpacingX *= mmToPt;
setSpacingY *= mmToPt;
circleDiameter *= mmToPt;
circleRadius *= mmToPt;

// Number of characters in the row and columns
var charX = 32;
var charY = 20;

// Number of rows and columns in each set
var numRows = 3;
var numCols = 2;

// Define margins from the edges of the document
var marginX = 50;
var marginY = 50;

// Set the stroke color and stroke weight
var strokeColor = new RGBColor();
if (selectedColor === "red") {
    strokeColor.red = 255;
    strokeColor.green = 0;
    strokeColor.blue = 0;
} else {
    strokeColor.red = 0;
    strokeColor.green = 0;
    strokeColor.blue = 255;
}

// Loop through to create 3 sets of 8 circles in a 2x4 grid
for (var setY = 0; setY < charY; setY++) {
    for (var setX = 0; setX < charX; setX++) {
        var flag = 0;
        for (var row = 0; row < numRows; row++) {
            for (var col = 0; col < numCols; col++) {
                // Calculate the position for each circle
                var centerX = marginX + col * spacingX + setX * setSpacingX;
                var centerY = marginY + row * spacingY + setY * setSpacingY;

                // Create the circle (oval) in the specified grid position
                if (Math.floor(Math.random() * 2) === 0) {
                    var circle = doc.pathItems.ellipse(centerY + circleRadius, centerX - circleRadius, circleDiameter, circleDiameter);

                    // Set the circle's stroke and stroke weight
                    circle.stroked = true;
                    circle.strokeColor = strokeColor;
                    circle.strokeWidth = 0.072; // Stroke weight set to 0.072 pt

                    // Set the circle's fill to none
                    circle.filled = false;
                }
                flag++;
            }
        }
    }
}
alert("3 sets of 8 circles created with stroke color " + selectedColor + "!");