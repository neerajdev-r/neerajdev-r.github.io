let container;
let lastScrollY;

document.addEventListener('DOMContentLoaded', () => {
	container = document.querySelector('.container');
	lastScrollY = window.scrollY;
	nameAnimInit();
	nameAnim(
		window.scrollY,
		document.body.offsetHeight - window.innerHeight
	);
	document.addEventListener('scroll',(e) => {
		const pos = window.scrollY;
		const max = document.body.offsetHeight - window.innerHeight;
		nameAnim(pos, max)
		lastScrollY = pos;
	})
	bgAnimInit();
	document.addEventListener('resize', (e) => {
		nameAnimSetup();
		nameAnim(
			lastScrollY,
			document.body.offsetHeight - window.innerHeight
		);
		bgAnimSetup();
	});
});
