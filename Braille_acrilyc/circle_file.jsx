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

// Define the circle's properties
var centerX = doc.width / 2;
var centerY = doc.height / 2;
var radius = 100;

// Create the circle (oval) in the center of the document
var circle = doc.pathItems.ellipse(centerY + radius, centerX - radius, radius * 2, radius * 2);

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

circle.filled = true;
circle.fillColor = fillColor;

// Set the stroke color to none
circle.stroked = false;

alert("Circle created with " + selectedColor + " color!");
