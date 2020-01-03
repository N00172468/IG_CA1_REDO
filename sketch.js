// Radius:
var minRadius = 20;
var maxRadius = 40;
let radius = minRadius + maxRadius;

// Molecules:
let molecules = [];
var numOfMolecules = 20; // Default for GUI

// Rows and Columns:
var numRows = 6; // Default for GUI
var numCols = 12; // Default for GUI
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
    .add(this, "numOfMolecules", 1, 100) // No. of Molecules = Min: 1, Max: 100
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
    // If loops for GUI checkboxes
    this.renderMols ? molecule.render() : this.renderMols = false;
    this. moveMols ? molecule.step() : this.moveMols = false;
    this.checkEdge ? molecule.checkEdges() : this.checkEdge = false;
    this.bruteForceChecks ? molecule.bruteChecks() : this.bruteForceChecks = false; 
    this.intersectionChecks ? molecule.checkIntersections() : this.intersectionChecks = false;
    this.grid ? molecule.drawGrid() : this.grid = false; 
    this.molsPerCell ? molecule.splitIntoGrids() : this.molsPerCell = false;
    this.showStats ? molecule.statistics() : this.showStats = false;
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
