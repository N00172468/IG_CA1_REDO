const minRadius = 10;
const maxRadius = 40;
let radius = minRadius + maxRadius;
let molecules = [];
const numOfMolecules = 1;
let molPerGrid = [];
let tempArray = [];
const numRows = 6;
const numCols = 12;
let rowWidth;
let rowHeight;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  for (let i = 0; i < numOfMolecules; i++) {
    molecules.push(new Molecule(i));
  }
  rowWidth = width / numRows;
  rowHeight = height / numCols;
  
  // let gui_col = new dat.GUI();
   noLoop();
}

console.time("Time Taken");

function draw() {
  background(0);
  checks = 0;
  checkIntersection = 0;
  
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
  
  console.timeEnd("Time Taken");
}
