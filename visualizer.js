function draw_node(x, y, color) {
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();
}

function draw_edge(x, y, direction) {
	ctx.beginPath();
	ctx.moveTo(
		direction ? x + nodeRadius / 2 : x - nodeRadius / 2, y + nodeRadius)
	ctx.lineTo(
		direction ? x + nodeDistance : x - nodeDistance,
		y + nodeDistance + currentHeight)
	ctx.stroke();
}

function init_nodes_and_edges(x, y, node) {
	if (!node) return;

	currentHeight += 10;

	if (node.left) draw_edge(x, y, false);

	ctx.beginPath();
	ctx.fillStyle = 'black';
	ctx.fillText(node.value, x + 20, y + 20);
	ctx.stroke();

	draw_node(x, y, 'white');

	init_nodes_and_edges(x - nodeDistance, y + nodeDistance + currentHeight, node.left);

	if (node.right) draw_edge(x, y, true);

	init_nodes_and_edges(x + nodeDistance, y + nodeDistance + currentHeight, node.right);
}

function set_gray_nodes(x, y, node, i) {
	if (!node || deepCount === i) return;

	currentHeight += 10;

	draw_node(x, y, 'gray');

	set_gray_nodes(x - nodeDistance, y + nodeDistance + currentHeight, node.left, i);

	if (!(node.left)) {
		deepCount++;
		draw_node(x, y, 'black');
	}

	set_gray_nodes(x + nodeDistance, y + nodeDistance + currentHeight, node.right, i);
}

function set_black_nodes(x, y, node, i) {
	if (!node || deepCount === i) return;

	currentHeight += 10;

	set_black_nodes(x - nodeDistance, y + nodeDistance + currentHeight, node.left, i);

	if (!(node.left)) deepCount++;

	draw_node(x, y, 'black');

	set_black_nodes(x + nodeDistance, y + nodeDistance + currentHeight, node.right, i);
}

function draw() {
	currentHeight = 0;
	deepCount = 0;

	nodeBreak++;

	set_gray_nodes(canvas.width / 2, nodeDistance, tree, nodeBreak);
	currentHeight = 0;
	deepCount = 0;

	set_black_nodes(
		canvas.width / 2, nodeDistance, tree, nodeBreak > 1 ? nodeBreak - 1 : 0);
}
