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
	const goToMyCrafts = () => {
		window.scroll(0, paraOutEnd)
		if(suddenHide) suddenHide();
	}
	const goToContact = () => {
		window.scroll(0, footerEnd)
		if(suddenHide) suddenHide();
	}
	const search = new URLSearchParams(window.location.search);
	if(search.get('section')==='mycrafts') {
		goToMyCrafts();
	} else if(search.get('section')==='contact') {
		goToContact();
	}
	document.querySelectorAll('[data-to="contact"]').forEach(i => i.addEventListener('click', goToContact));
	document.querySelectorAll('[data-to="my-crafts"]').forEach(i => i.addEventListener('click', goToMyCrafts));
	window.addEventListener('resize', (e) => {
		nameAnimSetup();
		nameAnim(
			lastScrollY,
			document.body.offsetHeight - window.innerHeight
		);
		bgAnimSetup();
	});
});
