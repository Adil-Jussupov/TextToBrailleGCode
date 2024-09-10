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
    'z': "110101"
};

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
    var circleDiameter = 1.2; // 1.2 mm
    var circleSpacing = 2.5;  // 2.5 mm between circles
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
    var doc = app.documents.add(DocumentColorSpace.RGB, 612, 792, 1);
    //var doc = app.activeDocument;

    // Initial position for the first character
    var startX = 50;  // Starting X position
    var startY = 500; // Starting Y position

    // Distance between each character's 2x3 grid
    var characterSpacing = 6; // 6 mm between characters

    // Loop through each character in the text
    for (var i = 0; i < text.length; i++) {
        var myChar = text[i];

        // Check if the character has a Braille representation (skip spaces, punctuation, etc.)
        if (brailleMap[myChar]) {
            var brailleBinary = brailleMap[myChar];

            // Draw the Braille character (2x3 circles)
            drawBrailleCharacter(brailleBinary, startX, startY);

            // Move the starting position to the right for the next character
            startX += characterSpacing;
        }
    }

    alert("Braille pattern generation completed!");
}

// Call the main function and provide the path to the text file
var filePath = "~/Desktop/TextToBrailleGCode/Braille_acrilyc/sample.txt";  // Update this to the location of your text file
generateBrailleFromText(filePath);
