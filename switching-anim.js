let list, items;
let index = 0, gap = 0, maxGap = -2.5, lastSwitch = 0;

const setPos = (px) => {
	list.style.marginTop = (px + 1)+'em';
}

const doNext = () => {
	const now = Date.now();
	const diff = now - lastSwitch;
	if(diff >= 1500) {
		lastSwitch = now;
		gap = 0;
		setPos(0)
		items[index].remove();
		list.append(items[index]);
		index++;
		if(index===items.length) index = 0;
	} else if(diff > 500) {
		gap = Math.sin((diff - 500)/1000 * Math.PI/2) * maxGap;
		setPos(gap);
	}
	requestAnimationFrame(doNext);
}

document.addEventListener('DOMContentLoaded', () => {
	lastSwitch = Date.now();
	list = document.querySelector('.about-list');
	items = [...list.children];
	doNext();
});
