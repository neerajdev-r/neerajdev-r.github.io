let footerHeight;

document.addEventListener('DOMContentLoaded', () => {
	const goToContact = () => {
		window.scroll(0, document.body.offsetHeight)
		suddenHide();
	}
	document.querySelectorAll('[data-to="contact"]').forEach(i => {
		i.addEventListener('click', goToContact);
	});
});
