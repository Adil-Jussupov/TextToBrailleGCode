// Function to create a circle at the top-left corner
function createCircleAtTopLeft() {
    var doc = app.documents.add(DocumentColorSpace.RGB, 612, 792, 1);
    var circle = doc.pathItems.ellipse(50, 150, 20, 20);
    
    // Optional: Set circle's stroke and fill
    circle.stroked = true;
    circle.strokeWidth = 1;
    var redColor = new RGBColor();
    redColor.red = 255;
    redColor.green = 0;
    redColor.blue = 0;
    circle.strokeColor = redColor;

    circle.filled = true;
    circle.fillColor = redColor;

    alert("Circle created at the top-left corner of the document.");
}

// Function to mirror the document vertically
function mirrorDocumentVertically() {
    var doc = app.activeDocument;

    // Select all items in the document
    doc.selectObjectsOnActiveArtboard();

    // Define the reflection transformation matrix (scaling by -1 on the Y-axis)
    var reflectionMatrix = app.getScaleMatrix(0, 200,100, 100); // 100% on X-axis, -100% on Y-axis

    // Apply the reflection to all selected objects
    doc.selection[0].transform(reflectionMatrix);

    alert("Document mirrored vertically.");
}

// Main function to create a circle and then mirror the document
function createAndMirror() {
    createCircleAtTopLeft();
    mirrorDocumentVertically();
}

// Run the main function
createAndMirror();
