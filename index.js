let container;

document.addEventListener('DOMContentLoaded', () => {
	container = document.querySelector('.container');
	nameAnimSetup();
	document.body.style.height = (container.clientHeight + 12000) + 'px';
	nameAnim(
		window.scrollY,
		document.body.offsetHeight - window.innerHeight
	);
	document.addEventListener('scroll',(e) => {
		const pos = window.scrollY;
		const max = document.body.offsetHeight - window.innerHeight;
		if(pos < 11000)
			container.style.marginTop = 0;
		else if(pos>13000)
			container.style.marginTop = (- (pos - 12000)) + 'px';
		else {
			const prog = Math.sin((pos - 11000)/2000 * Math.PI/2) * 1000;
			container.style.marginTop = -prog + 'px';
		};
		nameAnim(pos, max)
	})
});
