const NAME_SPLIT_START = 0;
const NAME_SPLIT_END = 2000;
const MAX_NAME_SPLIT = 6;
const MIN_NAME_SPLIT_OPACITY = 0.1;
let nameGap, namesOuter;

const ABOUT_START = 0;
const ABOUT_END = 2000;
let aboutList;

const PARA_START = 5000;
const PARA_END = 8000;
const MAX_NAME_TOP = -200;
const MIN_PARA_TOP = 50;
let paraPart, namePart;

const nameAnimSetup = () => {
	nameGap = document.querySelector('.name-break-gap');
	namesOuter = document.querySelector('.names-outer');
	aboutList = document.querySelector('.about-list');
	paraPart = document.querySelector('.para-part');
	namePart = document.querySelector('.name-part');
}

const splitName = (pos) => {
	if(pos>NAME_SPLIT_END) {
		nameGap.style.height = MAX_NAME_SPLIT+'em';
		namesOuter.style.opacity = MIN_NAME_SPLIT_OPACITY;
	} else if(pos < NAME_SPLIT_START) {
		nameGap.style.height = '0em';
		namesOuter.style.opacity = 1;
	} else {
		const prog = Math.sin((pos-NAME_SPLIT_START)/NAME_SPLIT_END * Math.PI/2);
		nameGap.style.height = prog * MAX_NAME_SPLIT + 'em'
		namesOuter.style.opacity = 1 - prog * (1 - MIN_NAME_SPLIT_OPACITY);
	}
}

const showAbouts = (pos) => {
	if(pos>ABOUT_END) {
		aboutList.style.opacity = 1;
	} else if(pos < ABOUT_START) {
		aboutList.style.opacity = 0;
	} else {
		const prog = Math.cos((pos-ABOUT_START)/ABOUT_END * Math.PI/2);
		aboutList.style.opacity = 1 - prog;
	}
}

const showPara = (pos) => {
	if(pos>PARA_END) {
		paraPart.style.marginTop = '0%';
		namePart.style.top = MAX_NAME_TOP + 'px';
		namePart.style.opacity = 0;
	} else if(pos < PARA_START) {
		paraPart.style.marginTop = MIN_PARA_TOP+'%';
		namePart.style.top = '0px';
		namePart.style.opacity = 100;
	} else {
		const prog = Math.sin((pos-PARA_START)/(PARA_END-PARA_START)*Math.PI/2);
		paraPart.style.marginTop = (1-prog)*MIN_PARA_TOP+'%';
		namePart.style.top = prog * MAX_NAME_TOP + 'px';
		namePart.style.opacity = 1 - prog;
	}
}

const nameAnim = (pos, max) => {
	splitName(pos);
	showAbouts(pos);
	showPara(pos);
}
