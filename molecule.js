class Molecule {
  constructor(_moleculeId) {
    this.radius = random(minRadius, maxRadius);
    this.position = createVector(
      random(this.radius, width - this.radius * 2),
      random(this.radius, height - this.radius * 2)
    );
    this.velocity = createVector(random(-15, 20), random(-15, 20));
    this.moleculeId = _moleculeId; // Tracking I.D per Object (Starting at Object I.D: 0)
    this.molFill = false; // Object Fill colour = False by default
    this.angle = 41.5; // Starting angle of aesthetic design within Object
    this.checks; // Attribute for Brute-force Checking function
    this.checkIntersection; // Attribute for Intersection Checking function
  }

  // **RENDER** - Animate Objects:
  render() {
    // Refresh to prevent stacking
    checks = 0;
    checkIntersection = 0;

    this.molFill ? fill(56, 131, 227) : noFill(); // i.e. If Objects are intersecting, fill in objects. Else don't fill

    push();
    stroke(40, 126, 235);
    strokeWeight(2);
    let c = tan(this.angle); // Allows angle of aesthetics to be animated (in this case, rotating)
    translate(this.position.x, this.position.y); // Displace 0,0 coordinates
    rotate(c); // Rotate aesthetics
    this.angle++; // Animate aesthetics
    ellipse(0, 0, this.radius * 1.8, this.radius * 0.2); // Aesthetics (i.e. Oval-1)
    ellipse(0, 0, this.radius * 0.2, this.radius * 1.8); // Aesthetics (i.e. Oval-2)
    ellipse(0, 0, this.radius * 2, this.radius * 2); // Main Object (i.e. Molecule)
    pop();

    noFill();
  }

  // **STEP** - Make Objects Move:
  step() {
    this.position.add(this.velocity);
  }

  // **CHECK-EDGES** - Outside Canvas Prevention:
  checkEdges() {
    if (this.position.x < this.radius || this.position.x > width - this.radius) {
      this.velocity.x = this.velocity.x * -1;
    }

    if (this.position.y < this.radius || this.position.y > height - this.radius) {
      this.velocity.y = this.velocity.y * -1;
    }
  }

  // **BRUTE-CHECKS** - Brute-force Checking:
  bruteChecks() {
    for (let i = 0; i < molecules.length; i++) {
      for (let j = 0; j < molecules.length; j++) {
        if (p5.Vector.sub(molecules[i].position, molecules[j].position).mag() < radius) {
          checks++;
        }
      }
    }
  }

  // **CHECK-INTERSECTIONS** - No. of Intersections:
  checkIntersections() {
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
  splitIntoGrids() {
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
    fill(47, 226, 255);
    textSize(11);
    text("FPS: " + frameRate().toFixed(0), 5, 14);
    text("No. of Mols: " + numOfMolecules, 5, 25);
    text("Intersections: " + checkIntersection, 5, 36);
    text("Brute Checks: " + checks, 5, 47);
  }
}
