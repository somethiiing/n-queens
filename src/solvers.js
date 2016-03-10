/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var b = new Board({'n': n});
  //var countRooks = 0
  //loop through rows
    //loop through columns
      //if no rook conflict
        //toggle piece
  //after toggling, skip to next row
  //if countRooks = n
    //return solution
  //else
    //recurse

  var countRooks = 0;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      b.togglePiece(i, j);
      if (b.hasAnyRooksConflicts() === false) {
        countRooks++;
      } else {
        b.togglePiece(i, j);
      }
    }
  }
  if (countRooks === n) {
    var solution = b.rows();
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  //recursion backtrack instead of this
  var numbers = [0, 1];
  var loops = n;
  var combos = [];
  var solutionCount = 0;

  var generateCombos = function(roundsToGo, playedSoFar) {
    playedSoFar = playedSoFar || [];

    if (roundsToGo === 0) {
      combos.push(playedSoFar);
      return;
    }
//we're only finding solutions for the first row in the matrix; we need to recurse through 
//each row in order to find all possibilities
    for (var i = 0; i < numbers.length; i++) {
      var currentPlay = numbers[i];
      generateCombos(roundsToGo - 1, playedSoFar.concat(currentPlay));
    }
  };

  generateCombos(loops);

  console.log('combos is ', JSON.stringify(combos));

  for (var i = 0; i < combos.length; i++) {
    var rookCounter = 0;
    for (var j = 0; j < combos[i].length; j++) {
      for (var k = 0; k < combos[i][j].length; k++){
        if (combos[i][j][k] === 1) {
          rookCounter++;
        } 
      }
    }
    if (rookCounter !== n) {
      combos.splice(i, 1);
    }
  }

  var solutionsArray = [];
  for (var i = 0; i < combos.length; i++) {
    var temp = new Board(combos[i]);
    solutionsArray.push(temp);
  }

  for (var i = 0; i < solutionsArray.length; i++) {
    var hasAnyConflicts = solutionsArray[i].hasAnyRooksConflicts();
    if (hasAnyConflicts === false) {
      solutionCount++;
    }
  }

 console.log((solutionsArray));


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
