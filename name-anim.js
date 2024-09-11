let heightFinder;
let screenHeight;

let anim1Outer;

const NAME_SPLIT_START = 0;
const NAME_SPLIT_END = NAME_SPLIT_START + 10;
const MAX_NAME_SPLIT = 6;
const MIN_NAME_SPLIT_OPACITY = 0.1;
let nameGap, namesOuter;

const ABOUT_START = NAME_SPLIT_START;
const ABOUT_END = NAME_SPLIT_END;
let aboutList;

const PARA_START = NAME_SPLIT_END + 500;
const PARA_END = PARA_START + 800;
const MAX_NAME_TOP = -200;
let minParaTop;
let paraPart, namePart;

const GRAD_START = PARA_END + 300;
const GRAD_END = GRAD_START + 1500;
let grads;
let gradPoints = [21, 33, 33];

const CRAFT_START = GRAD_END+300;// + 600;
let craftEnd, paraOutEnd;
let crafts, craftHeight;

let logoInStart, logoInEnd;
let logoOuter;

let logoClipStart;
let logoClip1, logoClip2, logoClip3;
let logClip1W, logoClip2W, logoClip3W;

let footerBox, footerHeight;
let footerStart, footerEnd;

let animSvg1, animSvg2;

const splitName = (pos) => {
	if(pos>NAME_SPLIT_END) {
		animSvg1.style.opacity = 0.3;
		animSvg2.style.opacity = 0.3;
		nameGap.style.height = MAX_NAME_SPLIT+'em';
		namesOuter.style.opacity = MIN_NAME_SPLIT_OPACITY;
	} else if(pos < NAME_SPLIT_START) {
		animSvg1.style.opacity = 1;
		animSvg2.style.opacity = 1;
		nameGap.style.height = '0em';
		namesOuter.style.opacity = 1;
	} else {
		const prog = Math.sin((pos-NAME_SPLIT_START)/NAME_SPLIT_END * Math.PI/2);
		nameGap.style.height = prog * MAX_NAME_SPLIT + 'em'
		namesOuter.style.opacity = 1 - prog * (1 - MIN_NAME_SPLIT_OPACITY);
		animSvg1.style.opacity = 1 - prog * 0.7;
		animSvg2.style.opacity = 1 - prog * 0.7;
	}
}

const showAbouts = (pos) => {
	if(pos>ABOUT_END) {
		aboutList.style.opacity = 1;
	} else if(pos <= ABOUT_START) {
		aboutList.style.opacity = 0;
	} else {
		const prog = Math.cos((pos-ABOUT_START)/ABOUT_END * Math.PI/2);
		aboutList.style.opacity = 1 - prog;
	}
}

const showAboutGrads =  (pos) => {
	if(pos > GRAD_END) {
		grads.forEach((i,j) => i.style.width = gradPoints[j]+'px');
	} else if(pos < GRAD_START) {
		grads.forEach(i => i.style.width = '0px');
	} else {
		const prog = (pos-GRAD_START)/(GRAD_END - GRAD_START);
		grads.forEach((i,j) => {
			if(prog<j*1/grads.length) {
				i.style.width = '0px';
			} else if(prog>(j+1)*1/grads.length) {
				i.style.width = gradPoints[j]+'px';
			} else {
				i.style.width = (prog-j*1/grads.length)*grads.length*gradPoints[j] + 'px';
			}
		})
	}
}

const showPara = (pos) => {
	if(pos>PARA_END) {
		paraPart.style.marginTop = '0px';
		namePart.style.top = MAX_NAME_TOP + 'px';
		namePart.style.opacity = 0;
		namePart.style.zIndex = 0;
	} else if(pos < PARA_START) {
		paraPart.style.marginTop = minParaTop+'px'//minParaTop+'%';
		namePart.style.top = '0px';
		namePart.style.opacity = 100;
		namePart.style.zIndex = 5;
	} else {
		const prog = Math.sin((pos-PARA_START)/(PARA_END-PARA_START)*Math.PI/2);
		namePart.style.zIndex = 0;
		paraPart.style.marginTop = (1-prog)*minParaTop+'px';
		namePart.style.top = prog * MAX_NAME_TOP + 'px';
		namePart.style.opacity = 1 - prog;
	}
}

const showCraft = (pos) => {
	if(pos > craftEnd) {
		crafts.style.top = -craftHeight + 'px';
	} else if(pos < CRAFT_START) {
		crafts.style.top = screenHeight + 'px';
	} else {
		const prog = (pos-CRAFT_START)/(craftEnd-CRAFT_START);
		crafts.style.top = (screenHeight - (screenHeight + craftHeight) * prog) + 'px'
	}
	if(pos > paraOutEnd) {
		paraPart.style.opacity = 0;
		paraPart.style.transform = 'scale(1.2)';
		paraPart.style.top = -200+'px';
	} else if(pos < CRAFT_START) {
		paraPart.style.opacity = 1;
		paraPart.style.transform = 'scale(1)';
		paraPart.style.top = 0;
	} else {
		const prog = Math.sin((pos-CRAFT_START)/(paraOutEnd-CRAFT_START)*Math.PI/2);
		paraPart.style.opacity = 1 - prog;
		paraPart.style.transform = 'scale('+(1+prog*0.2)+')';
		paraPart.style.top = (prog * -200)+'px';
	}
}

const showLogo = (pos) => {
	if(pos > logoInEnd) {
		logoOuter.style.top = 0;
	} else if(pos < logoInStart) {
		logoOuter.style.top = screenHeight+'px';
	} else {
		//const prog = Math.sin((pos-CRAFT_START)/(paraOutEnd-CRAFT_START)*Math.PI/2);
		const prog = (pos-logoInStart)/(logoInEnd-logoInStart);
		logoOuter.style.top = (1 - prog) * screenHeight + 'px';
	}
}

const showLogoClip = (pos) => {
	if(pos > logoInEnd) {
		logoClip1.style.width = logoClip1W + 'px';
		logoClip2.style.width = logoClip2W + 'px';
		logoClip3.style.width = logoClip3W + 'px';
	} else if(pos < logoInStart) {
		logoOuter.style.top = screenHeight+'px';
		logoClip1.style.width = '0px';
		logoClip2.style.width = '0px'
		logoClip3.style.width = '0px'
	} else {
		//const prog = Math.sin((pos-CRAFT_START)/(paraOutEnd-CRAFT_START)*Math.PI/2);
		const prog = (pos-logoClipStart)/(logoInEnd-logoClipStart);
		if(prog <= 0.333333) {
			logoClip1.style.width = logoClip1W * prog * 3 + 'px';
			logoClip2.style.width = '0px'
			logoClip3.style.width = '0px'
		} else if(prog <= 0.6666666) {
			logoClip1.style.width = logoClip1W + 'px';
			logoClip2.style.width = logoClip2W * (prog * 3 - 1) + '0px'
			logoClip3.style.width = '0px'
		} else {
			logoClip1.style.width = logoClip1W + 'px';
			logoClip2.style.width = logoClip2W + 'px';
			logoClip3.style.width = logoClip3W * (prog * 3 - 2) + '0px'
		}
	}
}

const showFooter = (pos) => {
	if(pos > footerEnd) {
		footerBox.style.top = (screenHeight - footerHeight)+'px';
		logoOuter.style.marginTop = -footerHeight/2+'px'
		logoOuter.style.transform = 'scale(0.8)'
		logoOuter.style.opacity = 0.3
	} else if(pos < footerStart) {
		footerBox.style.top = screenHeight+'px';
		logoOuter.style.marginTop = '0px'
		logoOuter.style.transform = 'scale(1)'
		logoOuter.style.opacity = 1
	} else {
		//const prog = Math.sin((pos-CRAFT_START)/(paraOutEnd-CRAFT_START)*Math.PI/2);
		const prog = (pos-footerStart)/(footerEnd-footerStart);
		footerBox.style.top = - prog * footerHeight + screenHeight + 'px';
		logoOuter.style.marginTop = -footerHeight/2 * prog + 'px'
		logoOuter.style.transform = 'scale('+(1-prog*0.2)+')'
		logoOuter.style.opacity = 1 - prog * 0.7
	}
}

const nameAnim = (pos, max) => {
	splitName(pos);
	showAbouts(pos);
	showAboutGrads(pos);
	showPara(pos);
	showCraft(pos);
	showLogo(pos);
	showHeader(pos);
	showLogoClip(pos);
	showFooter(pos);
}

const nameAnimSetup = () => {
	screenHeight = heightFinder.offsetHeight;
	craftHeight = crafts.offsetHeight;
	const factor = 1.5
	craftEnd = CRAFT_START + (craftHeight + screenHeight)*factor;
	paraOutEnd = CRAFT_START + screenHeight*factor;
	//minParaTop = paraPart.offsetHeight/2 + paraPart.offsetWidth*0.56*0.33;
	minParaTop = paraPart.offsetHeight/2 + paraPart.offsetWidth*0.56;
	logoInStart = craftEnd - screenHeight*factor - screenHeight*0.3;
	logoInEnd = craftEnd;
	logoClipStart = logoInStart + screenHeight * factor * 0.5;
	logoClip1W = 248;
	logoClip2W = 252.493;
	logoClip3W = 359;
	footerHeight = footerBox.offsetHeight;
	footerStart = logoInEnd + 500;
	footerEnd = footerStart + 50;//footerHeight * 2;
	paraPart.style.height = anim1Outer.offsetHeight+'px';
	document.body.style.height = (footerEnd + screenHeight) + 'px';
}

const nameAnimInit = () => {
	nameGap = document.querySelector('.name-break-gap');
	namesOuter = document.querySelector('.names-outer');
	aboutList = document.querySelector('.about-list');
	anim1Outer = document.querySelector('.animation-1-container');
	paraPart = document.querySelector('.para-part');
	grads = [...document.querySelectorAll('.para-part mask rect')];
	namePart = document.querySelector('.name-part');
	crafts = document.querySelector('.crafts');
	logoOuter = document.querySelector('.big-logo');
	logoClip1 = document.querySelector('#clip2_84_1502 > rect');
	logoClip2 = document.querySelector('#clip7_84_1502 > rect');
	logoClip3 = document.querySelector('#clip4_84_1502 > rect');
	footerBox = document.querySelector('.footer');
	animSvg1 = document.getElementById('m-square');
	animSvg2 = document.getElementById('m-triangle');
	heightFinder = document.querySelector('.height-finder');
	nameAnimSetup();
}
