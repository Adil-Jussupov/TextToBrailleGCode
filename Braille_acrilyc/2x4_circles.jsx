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

// Create a new document
var doc = app.documents.add();
// Define the properties of the grid and circles
var numRows = 4;
var numCols = 2;
var circleRadius = 20; // Adjust the radius of the circles
var spacingX = 70; // Horizontal spacing between the circles
var spacingY = 150; // Vertical spacing between the circles
var marginX = 100;  // Margin from the left side
var marginY = 100;  // Margin from the top

// Set the circle's fill color based on the word in the text file
var fillColor = new RGBColor();

if (selectedColor === "red") {
    fillColor.red = 255;
    fillColor.green = 0;
    fillColor.blue = 0;
} else {
    fillColor.red = 0;
    fillColor.green = 0;
    fillColor.blue = 255;
}

// Loop to create the 2x4 grid of circles
for (var row = 0; row < numRows; row++) {
    for (var col = 0; col < numCols; col++) {
        // Calculate the position for each circle
        var centerX = marginX + col * spacingX;
        var centerY = marginY + row * spacingY;
        
        // Create the circle (oval) in the specified grid position
        var circle = doc.pathItems.ellipse(centerY + circleRadius, centerX - circleRadius, circleRadius * 2, circleRadius * 2);
        
        // Set the circle's color
        circle.filled = true;
        circle.fillColor = fillColor;

        // Set the stroke color to none
        circle.stroked = false;
    }
}

alert("8 circles created in a 2x4 grid with " + selectedColor + " color!");