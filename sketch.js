// Radius:
var minRadius = 25;
var maxRadius = 40;
let radius = minRadius + maxRadius;

// Molecules:
let molecules = [];
var numOfMolecules = 30; // Default for GUI

// Rows and Columns:
var numRows = 4; // Default for GUI
var numCols = 8; // Default for GUI
let rowWidth;
let rowHeight;

// Key Array Attributes:
let molPerGrid = [];
let tempArray = [];

// For GUI Checkbox
var renderMols = true;
var moveMols = true;
var checkEdge = true;
var bruteForceChecks = true;
var intersectionChecks = true;
var grid = true;
var molsPerCell = true;
var showStats = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  rowWidth = width / numRows;
  rowHeight = height / numCols;

  // Generate Objects:
  for (let i = 0; i < numOfMolecules; i++) {
    molecules.push(new Molecule(i));
  }

  // Generate GUI:
  let gui_col = new dat.GUI(); // Calling GUI features from dat.gui.min.js
  gui_col
    .add(this, "numOfMolecules", 1, 1000) // No. of Molecules = Min: 1, Max: 1000
    .step(1) // Convert float values into int values
    .onChange(function() {
      guiMols();
    });
  gui_col.add(this, "numRows", 1, 50).step(1); // No. of Rows = Min: 1, Max: 50
  gui_col.add(this, "numCols", 1, 50).step(1); // No. of Columns = Min: 1, Max: 50
  gui_col.add(this, "renderMols"); // On/Off Checkbox
  gui_col.add(this, "moveMols"); 
  gui_col.add(this, "checkEdge"); 
  gui_col.add(this, "bruteForceChecks");  
  gui_col.add(this, "intersectionChecks");  
  gui_col.add(this, "grid"); 
  gui_col.add(this, "molsPerCell");  
  gui_col.add(this, "showStats");  

  //  noLoop();
}

function draw() {
  // console.time("Time Taken");

  // Refreshing:
  background(0);
  checks = 0;
  checkIntersection = 0;

  // Call out Class Functions:
  molecules.forEach(molecule => {
    molecule.render();
    molecule.step();
    molecule.checkEdges();

    // If loops for GUI checkboxes
    // this.renderMols ? molecule.render() : this.renderMols = false;
    // this.moveMols ? molecule.step() : this.moveMols = false;
    // this.checkEdge ? molecule.checkEdges() : this.checkEdge = false;
    // this.bruteForceChecks ? molecule.bruteChecks() : this.bruteForceChecks = false; 
    // this.intersectionChecks ? molecule.checkIntersections() : this.intersectionChecks = false;
    // this.grid ? molecule.drawGrid() : this.grid = false; 
    // this.molsPerCell ? molecule.splitIntoGrids() : this.molsPerCell = false;
    // this.showStats ? molecule.statistics() : this.showStats = false;
  });

  // console.timeEnd("Time Taken");
}

// **GUI MOLECULES** - Generate Objects using GUI:
function guiMols() {
  molecules = []; // Refresh

  // Generate Objects:
  for (let i = 0; i < numOfMolecules; i++) {
    molecules.push(new Molecule(i));
  }
}

// **BRUTE-CHECKS** - Brute-force Checking:
function bruteChecks() {
  for (let i = 0; i < molecules.length; i++) {
    for (let j = 0; j < molecules.length; j++) {
      if (p5.Vector.sub(molecules[i].position, molecules[j].position).mag() < radius) {
        checks++;
      }
    }
  }
}

// **CHECK-INTERSECTIONS** - No. of Intersections:
function checkIntersections() {
  for (let i = 0; i < molecules.length; i++) {
    for (let j = i + 1; j < molecules.length; j++) {
      if (p5.Vector.sub(molecules[i].position, molecules[j].position).mag() < radius) {
        checkIntersection++;
        molecules[i].molFill = true; // When intersect, fill in Object i
        molecules[j].molFill = true; // When intersect, fill in Object j
      }
    }
  }
}

// **SPLIT-INTO-GRIDS** - Check Molecules if in Specific Grid (Reference: xCell = i / yCell = j):
function splitIntoGrids() {
  // Refresh to prevent stacking
  this.molFill = 0;

  molecules.forEach(molecule => {
    tempArray = [];

    for (let xCell = 0; xCell < numRows; xCell++) {
      for (let yCell = 0; yCell < numCols; yCell++) {
        let rowHeight = height / numCols;

        if (
          molecule.position.x < rowWidth * (xCell + 1) &&
          molecule.position.x > rowWidth * xCell &&
          molecule.position.y < rowHeight * (yCell + 1) &&
          molecule.position.y > rowHeight * yCell
        ) {
          tempArray.push(molecule.moleculeId);

          // ---UN-COMMENT BELOW FOR TESTING (WARNING: FPS WILL DROP A GOOD AMOUNT!)---
          // console.table("---MOL ID---: " + this.moleculeId);
          // console.table("xCell: " + xCell + "     yCell: " + yCell);
          // console.table("X Pos: " + round(molecule.position.x) + "   Y Pos: " + round(molecule.position.y));
        }
      }
    }
  });
  return tempArray;
}

// **DRAW-GRID** - Display Grid:
function drawGrid() {
  let colWidth = width / numCols;
  let rowHeight = height / numRows;

  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      noFill();
      stroke(60, 60, 60);
      rect(x * colWidth, y * rowHeight, colWidth, rowHeight);
    }
  }

  // Mol Key Array:
  tempArray.push[molecules];
  molPerGrid.push[tempArray];
}

// **STATISTICS** - Display Statistics (Top Left Corner):
function statistics() {
  fill(47, 226, 255);
  textSize(11);
  text("FPS: " + frameRate().toFixed(0), 5, 14);
  text("No. of Mols: " + numOfMolecules, 5, 25);
  text("Intersections: " + checkIntersection, 5, 36);
  text("Brute Checks: " + checks, 5, 47);
}