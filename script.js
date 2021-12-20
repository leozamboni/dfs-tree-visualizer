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

function draw_node(x, y, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, 20, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}

function init_nodes_and_edges(x, y, node) {
  if (node) {
    ctx.beginPath();
    ctx.fillStyle = 'black';

    height += 10;

    if (node.left) {
      ctx.moveTo(x, y)
      ctx.lineTo(x - 50, y + 50 + height)
    }

    if (node.right) {
      ctx.moveTo(x, y)
      ctx.lineTo(x + 50, y + 50 + height)
    }

    ctx.fillText(node.value, x + 20, y + 20);
    ctx.stroke()

    draw_node(x, y, 'white');

    init_nodes_and_edges(x - 50, y + 50 + height, node.left);
    init_nodes_and_edges(x + 50, y + 50 + height, node.right);
  }
}

var deepCount;

function set_gray_nodes(x, y, node, i) {
  if (node) {
    if (deepCount === i) return;

    height += 10;

    draw_node(x, y, 'gray');

    set_gray_nodes(x - 50, y + 50 + height, node.left, i);
    if (!(node.left)) {
      deepCount++;
      draw_node(x, y, 'black');
    }

    set_gray_nodes(x + 50, y + 50 + height, node.right, i);
  }
}


function set_black_nodes(x, y, node, i) {
  if (node) {
    if (deepCount === i) return;

    height += 10;

    set_black_nodes(x - 50, y + 50 + height, node.left, i);
    if (!(node.left)) deepCount++;

    draw_node(x, y, 'black');

    set_black_nodes(x + 50, y + 50 + height, node.right, i);
  }
}

var nodeBreak = 0;

function draw() {
  height = 0;
  deepCount = 0;

  nodeBreak++;

  set_gray_nodes(canvas.width / 2, 50, tree, nodeBreak);
  height = 0;
  deepCount = 0;

  set_black_nodes(
      canvas.width / 2, 50, tree, nodeBreak > 1 ? nodeBreak - 1 : 0);
}

function main(tree) {
  var canvas = document.getElementById('canvas');

  if (canvas.getContext) {
    window.ctx = canvas.getContext('2d');
    ctx.clearRect(10, 10, canvas.width, canvas.height);
    ctx.font = '15px Arial';

    height = 0;
    init_nodes_and_edges(canvas.width / 2, 50, tree);
  }
}

random_tree()