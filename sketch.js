var minRadius = 10;
var maxRadius = 40;
let radius = minRadius + maxRadius;
let molecules = [];
var numOfMolecules = 1;
let molPerGrid = [];
let tempArray = [];
var numRows = 6;
var numCols = 12;
let rowWidth;
let rowHeight;

// let guiVars = {
//   numOfMolecules: 1,
//   numRows: 6,
//   numCols: 12,
//   minRadius: 10,
//   maxRadius: 40
// }

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  for (let i = 0; i < numOfMolecules; i++) {
    molecules.push(new Molecule(i));
  }
  rowWidth = width / numRows;
  rowHeight = height / numCols;
  
  let gui_col = new dat.GUI();
  gui_col.add(this, 'numOfMolecules', 1, 1000).step(1);
  gui_col.add(this, 'numRows', 1, 1000).step(1);
  gui_col.add(this, 'numCols', 1, 1000).step(1);
  // gui_col.add(this, 'minRadius', 1, 1000).step(1);
  // gui_col.add(this, 'maxRadius', 1, 1000).step(1);
  //  noLoop();
}

// console.time("Time Taken");

function draw() {
  background(0);
  checks = 0;
  checkIntersection = 0;
  gui_col = 0;
  
  molecules.forEach(molecule => {
    molecule.render();
    molecule.step();
    molecule.checkEdges();
    molecule.bruteChecks();
    molecule.checkIntersections();
    molecule.splitIntoGrids();
    molecule.drawGrid();
    molecule.statistics();
  });
  
  // console.timeEnd("Time Taken");
}
