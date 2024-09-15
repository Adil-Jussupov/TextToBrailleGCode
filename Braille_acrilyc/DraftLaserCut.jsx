// Define the Braille mapping (binary representation of each character)
var brailleMap = {
    'a': "000001",
    'b': "000011",
    'c': "001001",
    'd': "011001",
    'e': "010001",
    'f': "001011",
    'g': "001111",
    'h': "010011",
    'i': "001100",
    'j': "011010",
    'k': "000101",
    'l': "010011",
    'm': "000111",
    'n': "001101",
    'o': "010101",
    'p': "001111",
    'q': "011111",
    'r': "010111",
    's': "001110",
    't': "011110",
    'u': "100101",
    'v': "100111",
    'w': "111010",
    'x': "101101",
    'y': "111001",
    'z': "110101",
    ' ': "000000"
};

// Braille page dimentions:
// 11.5 in * 11 in
// start position:
// 1.4 in * 0.6 in
// 35 mm * 15 mm
// 40 chars in 25 lines

// braille cell dims:
// dot dim = 1.5 mm
// dot to dot distance = 2.5 mm
// cell to next cell = 6.1 mm
// cell to cell below = 10 mm
// cell hight = 0.6 mm



function mmToPoints(mm) {
    return mm * 2.834645;
}

function inToPoints(inch) {
    return inch * 72;
}

// Function to read text from a file and convert it to lowercase
function readTextFromFile(filePath) {
    var file = new File(filePath);
    if (file.exists) {
        file.open('r');
        var text = file.read();
        file.close();
        return text.toLowerCase(); // Convert text to lowercase
    } else {
        alert("File not found!");
        return "";
    }
}

// Function to generate circles for a Braille character
function drawBrailleCharacter(brailleBinary, startX, startY) {

    var doc = app.activeDocument;
    var circleDiameter = mmToPoints(0.6); // 1.5 mm  but for my lasercutter is 0.6 mm
    var circleSpacing = mmToPoints(2.5);  // 2.5 mm between circles
    var circleRadius = circleDiameter / 2;

    // Define the color for the circles
    var redColor = new RGBColor();
    redColor.red = 255;
    redColor.green = 0;
    redColor.blue = 0;

    // Loop over the 6 positions in the Braille binary code (2x3 grid)
    for (var i = 0; i < 6; i++) {
        var row = Math.floor(i / 2); // 3 rows
        var col = i % 2; // 2 columns

        var xPos = startX + col * circleSpacing; // Calculate x position
        var yPos = startY - row * circleSpacing; // Calculate y position

        // If binary value is '1', draw a circle; if '0', skip
        if (brailleBinary[i] === '1') {
            var circle = doc.pathItems.ellipse(yPos + circleRadius, xPos - circleRadius, circleDiameter, circleDiameter);
            circle.stroked = true;
            circle.strokeWidth = 0.072; // 0.072 pt stroke
            circle.strokeColor = redColor; // Set stroke color to red
            circle.filled = false;
            // circle.filled = true;
            // circle.fillColor = redColor; // Set fill color to red
        }
    }
}

// Main function to read text and generate Braille representation
function generateBrailleFromText(filePath) {
    // Read the text from the file and convert it to lowercase
    var text = readTextFromFile(filePath);

    if (text === "") {
        return; // If no text is found, exit the function
    }

    // Get the current document
    var doc = app.documents.add(DocumentColorSpace.RGB, inToPoints(12), inToPoints(12), 1);

    // 35 mm * 15 mm
    // Initial position for the first character
    var startX = mmToPoints(35) + inToPoints(0.25);  // Starting X position
    var startY = mmToPoints(12.5 + 250) + inToPoints(0.5); // Starting Y position

    // Distance between each character's 2x3 grid
    var characterSpacing = mmToPoints(6.1); // 6.1 mm between characters
    var characterVertSpacing = mmToPoints(10); // 10 mm between characters in next rows


    // Loop through each character in the text
    for (var i = 0; i < text.length; i++) {
        // Check if the line is ended and move to the next line
        var myChar = text[i];
        if (myChar === '\n') {
            //alert("i = " + i + "; startX = " + characterSpacing + "; startY = " + startY);
            startX -= (40 * characterSpacing);
            startY -= characterVertSpacing;
        }
        // Check if the character has a Braille representation (skip spaces, punctuation, etc.)
        if (brailleMap[myChar]) {
            var brailleBinary = brailleMap[myChar];

            // Draw the Braille character (2x3 circles)
            drawBrailleCharacter(brailleBinary, startX, startY);

            // Move the starting position to the right for the next character
            startX += characterSpacing;
        }
    }

    // alert("Braille pattern generation completed!");
}

// Function to create a vertical line through the entire document
function createVerticalLine() {
    var doc = app.activeDocument;

    // Get the width and height of the document
    var docWidth = doc.width;
    var docHeight = doc.height;

    // Calculate the X position (center of the document)
    //var xPos = mmToPoints(35 + ((40 * 6.1)/2)); // Since Illustrator's coordinate system is centered at (0, 0), use x = 0 for center
    var xPos = docWidth / 2;
    // Define the Y positions (top and bottom of the document)
    var topY = docHeight;  // Top position
    var bottomY = 0;  // Bottom position

    // Create the vertical line (path from top to bottom)
    var line = doc.pathItems.add();
    line.setEntirePath([[xPos, topY], [xPos, bottomY]]);  // Path from top to bottom
}

// Function to create a rectangle of size 100x200
function createRectangle() {
    var doc = app.activeDocument;

    // Define the rectangle's properties
    var rectWidth = inToPoints(11.5);  // Width of the rectangle (100 points)
    var rectHeight = inToPoints(11); // Height of the rectangle (200 points)

    // Define the position (top-left corner) where the rectangle will be placed
    var rectX = inToPoints(0.25); // X position (horizontal placement)
    var rectY = inToPoints(11.5); // Y position (vertical placement)

    // Create the rectangle
    var rectangle = doc.pathItems.rectangle(rectY, rectX, rectWidth, rectHeight);

    // Set stroke properties for the rectangle
    rectangle.stroked = true;
    rectangle.strokeWidth = 0.072;
    var redColor = new RGBColor();
    redColor.red = 255;
    redColor.green = 0;
    redColor.blue = 0;
    rectangle.strokeColor = redColor;

    // No fill for the rectangle
    rectangle.filled = false;

    // alert("Rectangle of size 100x200 created.");
}

// Run the function to create the rectangle
function createAlignHoles(diam) {
    var doc = app.activeDocument;

    var blueColor = new RGBColor();
    blueColor.red = 0;
    blueColor.green = 0;
    blueColor.blue = 255;
    
    var circle1 = doc.pathItems.ellipse(inToPoints(0.25) + mmToPoints(diam / 2), inToPoints(0.25) - mmToPoints(diam / 2), mmToPoints(diam), mmToPoints(diam));
    circle1.stroked = true;
    circle1.strokeWidth = 0.072; // 0.072 pt stroke
    circle1.strokeColor = blueColor; // Set stroke color to blue
    circle1.filled = false;
    // circle1.filled = true;
    // circle1.fillColor = blueColor; // Set fill color to blue

    var circle2 = doc.pathItems.ellipse(inToPoints(11.75) + mmToPoints(diam / 2), inToPoints(0.25) - mmToPoints(diam / 2), mmToPoints(diam), mmToPoints(diam));
    circle2.stroked = true;
    circle2.strokeWidth = 0.072; // 0.072 pt stroke
    circle2.strokeColor = blueColor; // Set stroke color to blue
    circle2.filled = false;
    // circle2.filled = true;
    // circle2.fillColor = blueColor; // Set fill color to blue

    var circle3 = doc.pathItems.ellipse(inToPoints(0.25) + mmToPoints(diam / 2), inToPoints(11.75) - mmToPoints(diam / 2), mmToPoints(diam), mmToPoints(diam));
    circle3.stroked = true;
    circle3.strokeWidth = 0.072; // 0.072 pt stroke
    circle3.strokeColor = blueColor; // Set stroke color to blue
    circle3.filled = false;
    // circle3.filled = true;
    // circle3.fillColor = blueColor; // Set fill color to blue

    var circle4 = doc.pathItems.ellipse(inToPoints(11.75) + mmToPoints(diam / 2), inToPoints(11.75) - mmToPoints(diam / 2), mmToPoints(diam), mmToPoints(diam));
    circle4.stroked = true;
    circle4.strokeWidth = 0.072; // 0.072 pt stroke
    circle4.strokeColor = blueColor; // Set stroke color to blue
    circle1.filled = false;
    // circle4.filled = true;
    // circle4.fillColor = blueColor; // Set fill color to blue
}




// Call the main function and provide the path to the text file
var filePath = "~/Desktop/TextToBrailleGCode/Braille_acrilyc/sample.txt";  // Update this to the location of your text file

generateBrailleFromText(filePath);
createVerticalLine();
createRectangle();
createAlignHoles(3); // diameter of the holes in mm