let point1XSlider, point1YSlider, point2XSlider, point2YSlider, showQuadrilateral;
let point1 = { x: -4, y: -2 };
let point2 = { x: 3, y: 4 };
let distance, gradient, midpoint, equation;
let canvas;

// New variables for quadratic function
let aSlider, bSlider, cSlider;
let a = 1, b = 0, c = 0;

function setup() {
    const containerWidth = document.getElementById('container').clientWidth;
    const containerHeight = document.getElementById('container').clientHeight;

    canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent('container');

    point1XSlider = select('#point1X');
    point1YSlider = select('#point1Y');
    point2XSlider = select('#point2X');
    point2YSlider = select('#point2Y');
    showQuadrilateral = select('#quadrilateralToggle');

    aSlider = select('#aSlider');
    bSlider = select('#bSlider');
    cSlider = select('#cSlider');

    select('#resetButton').mousePressed(resetPoints);

    calculateGeometry();
}

function draw() {
    background(50);
    stroke(255);
    fill(255);
    drawGrid();

    // Draw X and Y axes
    drawAxes();  // Call the function to draw the axes

    // Update point coordinates
    point1.x = parseInt(point1XSlider.value());
    point1.y = parseInt(point1YSlider.value());
    point2.x = parseInt(point2XSlider.value());
    point2.y = parseInt(point2YSlider.value());

    // Update quadratic coefficients
    a = parseFloat(aSlider.value());
    b = parseFloat(bSlider.value());
    c = parseFloat(cSlider.value());

    calculateGeometry();
    displayGeometry();
    drawLineSegment();

    if (showQuadrilateral.checked()) {
        drawQuadrilateral();
    }

    // Draw quadratic function and calculate its properties
    drawQuadratic();
}

function drawAxes() {
    // X-Axis
    stroke(0, 255, 0);  // Green color for the x-axis
    strokeWeight(3);
    line(0, mapY(0), width, mapY(0));  // Draw line for the x-axis
    textSize(16);
    fill(255, 255, 0);  // Yellow color for the text
    text("X-Axis", width - 50, mapY(0) - 10);  // Label the x-axis

    // Y-Axis
    stroke(255, 0, 0);  // Red color for the y-axis
    strokeWeight(3);
    line(mapX(0), 0, mapX(0), height);  // Draw line for the y-axis
    textSize(16);
    fill(255, 255, 0);  // Yellow color for the text
    text("Y-Axis", mapX(0) + 10, 20);  // Label the y-axis
}

function windowResized() {
    const containerWidth = document.getElementById('container').clientWidth;
    const containerHeight = document.getElementById('container').clientHeight;
    resizeCanvas(containerWidth, containerHeight);
}

function drawGrid() {
    stroke(255, 100);
    for (let x = 0; x < width; x += width / 10) {
        line(x, 0, x, height);
    }
    for (let y = 0; y < height; y += height / 10) {
        line(0, y, width, y);
    }
}

function drawLineSegment() {
    stroke(0, 255, 0);
    strokeWeight(2);
    line(mapX(point1.x), mapY(point1.y), mapX(point2.x), mapY(point2.y));

    fill(0, 255, 0);
    ellipse(mapX(point1.x), mapY(point1.y), 10);
    ellipse(mapX(point2.x), mapY(point2.y), 10);
}

function drawQuadrilateral() {
    let point3 = { x: point1.x, y: point2.y };
    let point4 = { x: point2.x, y: point1.y };

    stroke(0, 150, 255);
    strokeWeight(1);
    line(mapX(point1.x), mapY(point1.y), mapX(point3.x), mapY(point3.y));
    line(mapX(point3.x), mapY(point3.y), mapX(point2.x), mapY(point2.y));
    line(mapX(point2.x), mapY(point2.y), mapX(point4.x), mapY(point4.y));
    line(mapX(point4.x), mapY(point4.y), mapX(point1.x), mapY(point1.y));
}

function calculateGeometry() {
    let dx = point2.x - point1.x;
    let dy = point2.y - point1.y;

    distance = sqrt(dx * dx + dy * dy).toFixed(2);
    gradient = dx !== 0 ? (dy / dx).toFixed(2) : 'undefined'; // Prevent division by zero
    midpoint = { x: (point1.x + point2.x) / 2, y: (point1.y + point2.y) / 2 };
    equation = gradient !== 'undefined' ? `y = ${gradient}x + ${(point1.y - gradient * point1.x).toFixed(2)}` : 'Vertical line';

    updateUI();
}

function displayGeometry() {
    fill(255);
    noStroke();
    textSize(12);
    text(`P1: (${point1.x}, ${point1.y})`, mapX(point1.x) + 10, mapY(point1.y) - 10);
    text(`P2: (${point2.x}, ${point2.y})`, mapX(point2.x) + 10, mapY(point2.y) - 10);

    fill(255, 255, 0);
    ellipse(mapX(midpoint.x), mapY(midpoint.y), 10);
}

function drawQuadratic() {
    stroke(0, 255, 255);
    strokeWeight(2);
    noFill();

    // Draw quadratic curve
    beginShape();
    for (let x = -width / 2; x < width / 2; x += 1) {
        let y = a * pow(x / 30, 2) + b * (x / 30) + c;
        vertex(mapX(x / 30), mapY(y));
    }
    endShape();

    // Calculate vertex, axis of symmetry, roots, and focus/directrix
    let vertexX = -b / (2 * a);
    let vertexY = a * pow(vertexX, 2) + b * vertexX + c;
    let axisOfSymmetry = vertexX;
    let discriminant = pow(b, 2) - 4 * a * c;
    let root1 = (-b + sqrt(discriminant)) / (2 * a);
    let root2 = (-b - sqrt(discriminant)) / (2 * a);
    let focusY = vertexY + 1 / (4 * a);
    let directrixY = vertexY - 1 / (4 * a);

    // Display calculated quadratic properties
    select('#quadraticEquationOutput').html(`y = ${a.toFixed(2)}x² + ${b.toFixed(2)}x + ${c.toFixed(2)}`);
    select('#vertexOutput').html(`(${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})`);
    select('#axisOfSymmetryOutput').html(`x = ${axisOfSymmetry.toFixed(2)}`);
    select('#rootsOutput').html(`x1 = ${root1.toFixed(2)}, x2 = ${root2.toFixed(2)}`);
    select('#directrixOutput').html(`y = ${directrixY.toFixed(2)}`);
    select('#focusOutput').html(`(${vertexX.toFixed(2)}, ${focusY.toFixed(2)})`);

    // Mark vertex, focus, and directrix
    fill(255, 0, 0);
    ellipse(mapX(vertexX), mapY(vertexY), 10);
    fill(0, 255, 0);
    ellipse(mapX(vertexX), mapY(focusY), 10);

    stroke(255, 0, 0);
    line(-width, mapY(directrixY), width, mapY(directrixY));
}

function mapX(x) {
    return map(x, -10, 10, 0, width);
}

function mapY(y) {
    return map(y, -10, 10, height, 0);
}

function updateUI() {
    select('#point1Output').html(`(${point1.x}, ${point1.y})`);
    select('#point2Output').html(`(${point2.x}, ${point2.y})`);
    select('#distanceOutput').html(distance);
    select('#gradientOutput').html(gradient);
    select('#midpointOutput').html(`(${midpoint.x.toFixed(2)}, ${midpoint.y.toFixed(2)})`);
    select('#equationOutput').html(equation);
}

function resetPoints() {
    point1XSlider.value(-4);
    point1YSlider.value(-2);
    point2XSlider.value(3);
    point2YSlider.value(4);
    calculateGeometry();
}
