class Molecule {
  constructor(_moleculeId) {
    this.radius = random(minRadius, maxRadius);
    this.position = createVector(
      random(this.radius, width - this.radius * 2),
      random(this.radius, height - this.radius * 2)
    );
    this.velocity = createVector(random(-15, 5), random(-15, 5));
    this.moleculeId = _moleculeId;
    this.molFill = false;
    this.angle = 41.5;
    this.checks;
    this.checkIntersection;
  }

  // **RENDER** - Animate Objects:
  render() {
    checks = 0;
    checkIntersection = 0;

    this.molFill ? fill(56,131,227) : noFill();

    push();

    stroke(40,126,235);
    strokeWeight(2);
    let c = cos(this.angle);
    translate(this.position.x, this.position.y);
    rotate(c);
    this.angle++;
    ellipse(0, 0, this.radius * 1.8, this.radius * 0.2);
    ellipse(0, 0, this.radius * 0.2, this.radius * 1.8);
    ellipse(0, 0, this.radius * 2, this.radius * 2);
    pop();

    noFill();
  }

  // **STEP** - Make Objects Move:
  step() {
    this.position.add(this.velocity);
  }

  // **CHECK-EDGES** - Outside Canvas Prevention:
  checkEdges() {
    if (
      this.position.x < this.radius ||
      this.position.x > width - this.radius
    ) {
      this.velocity.x = this.velocity.x * -1;
    }

    if (
      this.position.y < this.radius ||
      this.position.y > height - this.radius
    ) {
      this.velocity.y = this.velocity.y * -1;
    }
  }

  // **BRUTE-CHECKS** - Brute-force Checking:
  bruteChecks() {
    for (let i = 0; i < molecules.length; i++) {
      for (let j = 0; j < molecules.length; j++) {
        if (
          p5.Vector.sub(molecules[i].position, molecules[j].position).mag() <
          radius
        ) {
          checks++;
        }
      }
    }
  }

  // **CHECK-INTERSECTIONS** - No. of Intersections:
  checkIntersections() {
    for (let i = 0; i < molecules.length; i++) {
      for (let j = i + 1; j < molecules.length; j++) {
        if (
          p5.Vector.sub(molecules[i].position, molecules[j].position).mag() <
          radius
        ) {
          checkIntersection++;
          molecules[i].molFill = true;
          molecules[j].molFill = true;
        }
      }
    }
  }

  // **SPLIT-INTO-GRIDS** - Check Molecules if in Specific Grid (Reference: xCell = i / yCell = j):
  splitIntoGrids() {
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
  drawGrid() {
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
  statistics() {
    fill(47,226,255);
    textSize(11);
    text("FPS: " + frameRate().toFixed(0), 5, 14);
    text("No. of Mols: " + numOfMolecules, 5, 25);
    text("Intersections: " + checkIntersection, 5, 36);
    text("Brute Checks: " + checks, 5, 47);
  }
}
