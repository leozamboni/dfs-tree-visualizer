class Tree {
	constructor(value, left, right) {
		this.value = value;
		this.left = left;
		this.right = right;
	}
}

tree = new Tree(
	1, new Tree(2, new Tree(4, new Tree(8)), new Tree(5)),
	new Tree(3, new Tree(6, new Tree(9), new Tree(10)), new Tree(7)));

var height;

let set_node = (x, y, color) => {
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.arc(x, y, 20, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();
}

function set_white_nodes_and_edges(x, y, node) {
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
			ctx.lineTo(x + 50, y + 70 + height)
		}

		ctx.fillText(node.value, x + 20, y + 20);
		ctx.stroke()

		set_node(x, y, 'white');

		set_white_nodes_and_edges(x - 50, y + 50 + height, node.left);
		set_white_nodes_and_edges(x + 50, y + 50 + height, node.right);
	}
}

var deepCount;

function set_gray_nodes(x, y, node, i) {
	if (node) {
		if (deepCount === i) return;
		height += 10;
		set_node(x, y, 'gray');
		set_gray_nodes(x - 50, y + 50 + height, node.left, i);
		if (!(node.left)) {
			deepCount++;
			set_node(x, y, 'black');
		}
		set_gray_nodes(x + 50, y + 50 + height, node.right, i);
	}
}

function set_black_nodes(x, y, node, i) {
	if (node) {
		if (deepCount >= i) return;
		height += 10;
		set_black_nodes(x - 50, y + 50 + height, node.left, i);
		if (!(node.left)) deepCount++;
		set_node(x, y, 'black');
		set_black_nodes(x + 50, y + 50 + height, node.right, i);
	}
}

var grayNodes = 0;
var blackNodes = 0;

function draw() {
	grayNodes++;
	blackNodes = grayNodes - 1;
	height = 0;
	deepCount = 0;
	set_gray_nodes(canvas.width / 2, 50, tree, grayNodes);
	height = 0;
	deepCount = 0;
	set_black_nodes(canvas.width / 2, 50, tree, blackNodes);
}

function main(tree) {
	var canvas = document.getElementById('canvas');

	if (canvas.getContext) {
		window.ctx = canvas.getContext('2d');
		ctx.clearRect(10, 10, canvas.width, canvas.height);
		ctx.font = '15px Arial';

		height = 0;
		set_white_nodes_and_edges(canvas.width / 2, 50, tree);
	}
}

main(tree);
