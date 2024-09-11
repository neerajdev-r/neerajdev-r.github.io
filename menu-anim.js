let lockHeader;

let header;
let lastY = null;

let suddenHide;

const showHeader = (pos) => {
	if(lockHeader) return;
	if(lastY === null) {
		lastY = pos;
		return;
	}
	if(pos > lastY) {
		header.style.top = '-6em'
	} else if(pos < lastY) {
		header.style.top = '0';
	}
	lastY = pos;
}

document.addEventListener('DOMContentLoaded', () => {
	const menuIcon = document.querySelector('.menu-icon');
	const menu = document.querySelector('.menu');
	header = document.querySelector('header');
	suddenHide = () => {
		if(lockHeader) {
			lockHeader = false;
			menuIcon.style.display = '';
			menu.classList.add('hidden')
			menu.classList.remove('big');
		}
	}
	menuIcon.addEventListener('click', () => {
		lockHeader = true;
		menuIcon.style.display = 'none'
		menu.classList.remove('hidden');
		setTimeout(() => menu.classList.add('big'), 50);
	});
	const menuClose = document.querySelector('button.menu-item.first');
	menuClose.addEventListener('click', () => {
		setTimeout(() => {
			menuIcon.style.display = ''
			menu.classList.add('hidden');
			lockHeader = false;
		}, 1000);
		menu.classList.remove('big');
	});
	window.addEventListener('scroll', () => {
		showHeader(window.scrollY);
	});
	header = document.querySelector('header');
})
