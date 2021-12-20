class Tree {
  constructor(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

function insert(node, value) {
  while (1) {
    if (node.value === value) return;
    if (value > node.value && node.right) {
      node = node.right;
    } else if (value < node.value && node.left) {
      node = node.left;
    } else {
      break;
    }
  }

  if (value > node.value) {
    node.right = new Tree(value);
  } else {
    node.left = new Tree(value);
  }
}

var tree;

function random_tree() {
  nodeBreak = 0;
  maxRange = document.getElementById('maxRange').value;
  tree = new Tree(Math.round(Math.random() * maxRange))

  for (let i = 0; i < maxRange; ++i) {
    insert(tree, Math.round(Math.random() * maxRange));
  }

  main(tree)
}


var nodeRadius = 20;
function draw_node(x, y, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}

var nodeDistance = 50;
function init_nodes_and_edges(x, y, node) {
  if (node) {
    height += 10;

    ctx.beginPath();

    if (node.left) {
      ctx.moveTo(x - nodeRadius / 2, y + nodeRadius)
      ctx.lineTo(x - nodeDistance, y + nodeDistance + height)
    }

    ctx.fillStyle = 'black';
    ctx.fillText(node.value, x + 20, y + 20);
    ctx.stroke()

    draw_node(x, y, 'white');

    init_nodes_and_edges(
        x - nodeDistance, y + nodeDistance + height, node.left);

    if (node.right) {
      ctx.beginPath();
      ctx.moveTo(x + nodeRadius / 2, y + nodeRadius)
      ctx.lineTo(x + nodeDistance, y + nodeDistance + height)
      ctx.stroke()
    }

    init_nodes_and_edges(
        x + nodeDistance, y + nodeDistance + height, node.right);
  }
}

var deepCount;

function set_gray_nodes(x, y, node, i) {
  if (node) {
    if (deepCount === i) return;

    height += 10;

    draw_node(x, y, 'gray');

    set_gray_nodes(x - nodeDistance, y + nodeDistance + height, node.left, i);
    if (!(node.left)) {
      deepCount++;
      draw_node(x, y, 'black');
    }

    set_gray_nodes(x + nodeDistance, y + nodeDistance + height, node.right, i);
  }
}


function set_black_nodes(x, y, node, i) {
  if (node) {
    if (deepCount === i) return;

    height += 10;

    set_black_nodes(x - nodeDistance, y + nodeDistance + height, node.left, i);
    if (!(node.left)) deepCount++;

    draw_node(x, y, 'black');

    set_black_nodes(x + nodeDistance, y + nodeDistance + height, node.right, i);
  }
}

var nodeBreak = 0;

function draw() {
  height = 0;
  deepCount = 0;

  nodeBreak++;

  set_gray_nodes(canvas.width / 2, nodeDistance, tree, nodeBreak);
  height = 0;
  deepCount = 0;

  set_black_nodes(
      canvas.width / 2, nodeDistance, tree, nodeBreak > 1 ? nodeBreak - 1 : 0);
}

function main(tree) {
  var canvas = document.getElementById('canvas');

  if (canvas.getContext) {
    window.ctx = canvas.getContext('2d');
    ctx.clearRect(10, 10, canvas.width, canvas.height);
    ctx.font = '15px Arial';

    height = 0;
    init_nodes_and_edges(canvas.width / 2, nodeDistance, tree);
  }
}

random_tree()