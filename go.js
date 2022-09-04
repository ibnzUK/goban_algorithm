let goField = [];
// WHITE = 1, BLACK = 2, EMPTY = 3, OUT = 4
const goStatus = 'EMPTY';
//board size x by y
const boardSize = [4, 4];
let surrounds = [];

//setting field values (EXAMPLE)
// . #.
// # o #
// . #. <= bottom to top

let setup = [
  { x: 1, y: 2, value: 'BLACK' },
  { x: 2, y: 1, value: 'BLACK' },
  { x: 2, y: 2, value: 'WHITE' },
  { x: 2, y: 3, value: 'BLACK' },
  { x: 3, y: 2, value: 'BLACK' },
];

//setting field values (EXAMPLE)
// o # 
// #. <= bottom to top
// board size 3x3
// let setup = [
//   { x: 1, y: 2, value: 'BLACK' },
//   { x: 1, y: 3, value: 'WHITE' },
//   { x: 2, y: 3, value: 'BLACK' },
// ];

// oo.
// ## o 
// o o #
// .o. <= bottom to top

// const setup = [
//   { x: 2, y: 1, value: 'WHITE' },
//   { x: 1, y: 2, value: 'WHITE' },
//   { x: 2, y: 2, value: 'WHITE' },
//   { x: 3, y: 2, value: 'BLACK' },
//   { x: 1, y: 3, value: 'BLACK' },
//   { x: 2, y: 3, value: 'BLACK' },
//   { x: 3, y: 3, value: 'WHITE' },
//   { x: 1, y: 4, value: 'WHITE' },
//   { x: 2, y: 4, value: 'WHITE' },
// ];

let drawBoard = (_x, _y) => {
  let tempX = -1;
  function pushToGrid(_tempX, _i, _status) {
    goField.push({ x: _tempX, y: _i + 1, value: _status });
  }
  for (let i = 0; i < _x + 1; i++) {
    tempX++;
    for (let i = -1; i < _y; i++) {
      if (tempX === 0 || i + 1 === 0) {
        pushToGrid(tempX, i, 'OUT');
      } else if (i === _y - 1 || tempX === _x) {
        pushToGrid(tempX, i, 'OUT');
      } else {
        pushToGrid(tempX, i, goStatus);
      }
    }
  }
};

//initialising goban board
drawBoard(boardSize[0] + 1, boardSize[1] + 1);
let placeRock = (_setup) => {
  setup.map((a) => {
    goField.find((o, i) => {
      if ((o.x === a.x) & (o.y === a.y)) {
        goField[i] = { x: a.x, y: a.y, value: a.value };
        return true; // stop searching
      }
    });
  });
};
placeRock(setup);

//getting status of coordinates
let get_status = (_x, _y) => {
  let obj = goField.find((o) => (o.x === _x) & (o.y === _y));
  if (obj.value === 'EMPTY' || obj.value === 'OUT') {
    console.log('EMPTY or OUT');
  } else {
    if (is_shape(obj)) {
      // return shape cordinates, array
      if (
        checkSurrounds(obj.x, obj.y)[0] === 'EMPTY' ||
        checkSurrounds(obj.x, obj.y)[1] === 'EMPTY' ||
        checkSurrounds(obj.x, obj.y)[2] === 'EMPTY' ||
        checkSurrounds(obj.x, obj.y)[3] === 'EMPTY'
      ) {
        console.log('not take, there are moves');
      } else {
        console.log(' need to draw shape; ', drawShape(obj));
      }
    } else {
      is_taken(obj, surrounds);
    }
  }
};

let checkSurrounds = (_x, _y) => {
  surrounds = [
    goField.find((o) => (o.x === _x - 1) & (o.y === _y)).value,
    goField.find((o) => (o.x === _x) & (o.y === _y + 1)).value,
    goField.find((o) => (o.x === _x + 1) & (o.y === _y)).value,
    (obj_bottom = goField.find((o) => (o.x === _x) & (o.y === _y - 1)).value),
  ];
  return surrounds;
};

let is_shape = (_obj) => {
  console.log(
    'Surrounds:   ', '\n',
    '\n',
    '       ',
    checkSurrounds(_obj.x, _obj.y)[1],
    '       ',
    '\n',
    checkSurrounds(_obj.x, _obj.y)[0],
    '            ',
    checkSurrounds(_obj.x, _obj.y)[2],
    '\n',
    '       ',
    checkSurrounds(_obj.x, _obj.y)[3], '\n'
  );

  if (
    checkSurrounds(_obj.x, _obj.y)[0] === _obj.value ||
    checkSurrounds(_obj.x, _obj.y)[1] === _obj.value ||
    checkSurrounds(_obj.x, _obj.y)[2] === _obj.value ||
    checkSurrounds(_obj.x, _obj.y)[3] === _obj.value
  ) {
    //is shape
    return true;
  } else {
    return false;
  }
};

let drawShape = (_obj) => {
  let shapeArray = [];
  //shape colour

  if (_obj.value === 'WHITE') {
    shapeArray.push('WHITE');
  } else {
    shapeArray.push('BLACK');
  }
  shapeArray.push({ x: _obj.x, y: _obj.y });

   // TO DO
  //draw full shape
  return shapeArray;
};

let is_taken = (_obj, _surrounds) => {
//   console.log(_obj, _surrounds);
  if (
    _surrounds[0] === 'EMPTY' ||
    _surrounds[1] === 'EMPTY' ||
    _surrounds[2] === 'EMPTY' ||
    _surrounds[3] === 'EMPTY'
  ) {
    console.log(' is NOT taken, there are moves');
  } else {
    if (
      (_surrounds[0] !== _obj.value) &
      (_surrounds[1] !== _obj.value) &
      (_surrounds[2] !== _obj.value) &
      (_surrounds[3] !== _obj.value)
    ) {
      console.log(' this', _obj.value, 'is taken');
    } else {
      console.log(' IS NOT TAKEN');
    }
  }
};

//get status
get_status(2, 2);


