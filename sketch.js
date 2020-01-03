var minRadius = 10;
var maxRadius = 40;
let radius = minRadius + maxRadius;

let molecules = [];
var numOfMolecules = 1;

var numRows = 6;
var numCols = 12;

let rowWidth;
let rowHeight;

let molPerGrid = [];
let tempArray = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  
  rowWidth = width / numRows;
  rowHeight = height / numCols;
  
  for (let i = 0; i < numOfMolecules; i++) {
    molecules.push(new Molecule(i));
  }
  
  let gui_col = new dat.GUI(); 
  gui_col.add(this, 'numOfMolecules', 1, 100).step(1).onChange(
    function() {
      guiMols();
    }
  );
  gui_col.add(this, 'numRows', 1, 50).step(1);
  gui_col.add(this, 'numCols', 1, 50).step(1);

  //  noLoop();
}


function draw() {
  // console.time("Time Taken");

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

  // **GUI MOLECULES** - Generate Molecules using GUI:
  function guiMols() {
    molecules = [];

    for (let i = 0; i < numOfMolecules; i++) {
      molecules.push(new Molecule(i));
    }
  }
