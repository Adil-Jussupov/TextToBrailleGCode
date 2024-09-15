// Function to create a triangle
function createTriangle() {
    var doc = app.activeDocument;

    // Define the triangle points (a simple equilateral triangle)
    var triangle = doc.pathItems.add();
    
    var topPoint = [150, 500];    // Top vertex
    var leftPoint = [100, 400];   // Bottom left vertex
    var rightPoint = [200, 400];  // Bottom right vertex

    // Define the points for the triangle
    triangle.setEntirePath([topPoint, leftPoint, rightPoint, topPoint]);

    // Set the stroke properties for the triangle
    triangle.stroked = true;
    triangle.strokeWidth = 1;
    var redColor = new RGBColor();
    redColor.red = 255;
    redColor.green = 0;
    redColor.blue = 0;
    triangle.strokeColor = redColor;

    // No fill
    triangle.filled = false;

    return triangle; // Return the created triangle
}

// Function to create a square
function createSquare() {
    var doc = app.activeDocument;

    // Define the square's properties
    var squareSize = 100; // 100 points square
    var squareX = 300; // X position
    var squareY = 500; // Y position

    // Create the square
    var square = doc.pathItems.rectangle(squareY, squareX, squareSize, squareSize);

    // Set stroke properties for the square
    square.stroked = true;
    square.strokeWidth = 1;
    var redColor = new RGBColor();
    redColor.red = 255;
    redColor.green = 0;
    redColor.blue = 0;
    square.strokeColor = redColor;

    // No fill
    square.filled = false;

    return square; // Return the created square
}

// Function to reflect an object or group vertically at a specific distance
function reflectObjectVertically(object, distance) {
    // Create a transformation matrix for vertical reflection (-100% on Y-axis)
    var reflectionMatrix = app.getScaleMatrix(-100, 100);

    // Reflect the object vertically
    object.transform(reflectionMatrix);

    // Move the reflected object down by the specified distance
    //object.translate(0, -distance);
}

// Main function to create and reflect shapes
function createAndReflectShapes() {
    var doc = app.documents.add(); // Create a new document

    // Create a triangle
    var triangle = createTriangle();

    // Create a square
    var square = createSquare();

    // Group the triangle and square before reflecting
    var group = doc.groupItems.add(); // Create a new group
    triangle.moveToBeginning(group);  // Move the triangle into the group
    square.moveToBeginning(group);    // Move the square into the group

    // Define the reflection distance (how far below the original objects the reflected shapes will appear)
    var reflectionDistance = 200; // Distance in points (adjust as needed)

    // Reflect the entire group vertically
    reflectObjectVertically(group, reflectionDistance);

    alert("Triangle and square created, grouped, and reflected vertically.");
}

// Run the main function
createAndReflectShapes();
