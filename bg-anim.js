let animSquare, animTriangle;
let animSquareText, animTriangleText;
let animSquareTextMask, animTriangleTextMask;
let headerHeight, namePartHeight;
let diaDist, animH, animW;
// 1440, 876

let values

const makeValues = (sw, sh, bw, bh) => {
	values = [
		[
			18, 36, -1.85, 48,
			30, 48, 38.29, 60
		],[
			82, 36, 0.96, 25,
			88, 34, 90.24, 63,
		],[
			81.5, 74, -0.12, 25,
			85, 79, 70.52, 63,
		],[
			18, 74, 0.8, 45,
			35, 82, 63, 60,
		],
	];
}
makeValues()
const centerValues = [
	45, 45, 35, 25,
	62, 50, 20, 50
]

const bgAnimSetup = () => {
	headerHeight = document.querySelector('header').offsetHeight;
	const namePart = document.querySelector('.name-part');
	namePartHeight = namePart.offsetHeight;
	diaDist = Math.sqrt(namePart.offsetHeight ** 2 + namePart.offsetWidth ** 2);
	animH = namePart.offsetHeight;
	animW = namePart.offsetWidth;
	// animSquare.style.width = 
	// move(animW/2, animH/2);
	moveCenter();
}

/*
const mid = (x, y, pi) => {
	const tl = values[0][pi],
		tr = values[1][pi],
		br = values[2][pi],
		bl = values[3][pi];
	const dtl = Math.sqrt(x ** 2 + y ** 2);
	const dtr = Math.sqrt((x - animW) ** 2 + y ** 2);
	const dbr = Math.sqrt((x - animW) ** 2 + (y - animH) ** 2);
	const dbl = Math.sqrt(x ** 2 + (y - animH) ** 2);
	const d1 = tl + (br - tl) * dtl / (dtl + dbr);
	const d2 = tr + (bl - tr) * dtr / (dtr + dbl);
	// console.log(tl, dtl, br, dbr, d1);
	// console.log(tr, dtr, bl, dbl, d2);
	const d1f = (dtl + dbr - diaDist) / (animW + animH - diaDist)
	const d2f = (dtr + dbl - diaDist) / (animW + animH - diaDist)
	const d = d1 + (d2 - d1) * d1f / (d1f + d2f);
	// console.log(d1f, d1, d2f, d2, d);
	return d;
}
*/
const mid = (x, y, pi) => {
	const tl = values[0][pi],
		tr = values[1][pi],
		br = values[2][pi],
		bl = values[3][pi];
	const t = tl + (tr - tl) * x / animW;
	const b = bl + (br - bl) * x / animW;
	const d = t + (b - t) * y / animH;
	return d;
}

const moveCenter = () => {
		animSquare.style.transform = `translate(${centerValues[0]}vw, ${centerValues[1]}vh) rotate(${centerValues[2]}deg)`;
		animSquareText.style.transform = `translate(${centerValues[3]}px, 0)`;
		animSquareTextMask.style.transform = `translate(${centerValues[3]-1}px, 0)`;
		
		animTriangle.style.transform = `translate(${centerValues[4]}vw, ${centerValues[5]}vh) rotate(${centerValues[6]}deg)`;
		animTriangleText.style.transform = `translate(${centerValues[7]}px, 0)`;
		animTriangleTextMask.style.transform = `translate(${centerValues[7]-1}px, 0)`;
}

const move = (x, y) => {
		animSquare.style.transform = `translate(${mid(x,y,0)}vw, ${mid(x,y,1)}vh) rotate(${mid(x,y,2)}deg)`;
		animSquareText.style.transform = `translate(${mid(x,y,3)}px, 0)`;
		animSquareTextMask.style.transform = `translate(${mid(x,y,3)-1}px, 0)`;
		
		animTriangle.style.transform = `translate(${mid(x,y,4)}vw, ${mid(x,y,5)}vh) rotate(${mid(x,y,6)}deg)`;
		animTriangleText.style.transform = `translate(${mid(x,y,7)}px, 0)`;
		animTriangleTextMask.style.transform = `translate(${mid(x,y,7)-1}px, 0)`;
}

const bgAnimInit = () => {
	animSquare = document.getElementById('m-square');
	animTriangle = document.getElementById('m-triangle');
	animSquareText  = animSquare.querySelector('text')
	animTriangleText  = animTriangle.querySelector('text')
	animSquareTextMask = animSquare.querySelector('.text-mask');
	animTriangleTextMask = animTriangle.querySelector('.text-mask');
	bgAnimSetup()
	document.querySelector('.name-part').addEventListener('pointermove', (e) => {
		const x = e.clientX;
		const y = e.clientY - headerHeight;
		move(x, y);
	});
}
