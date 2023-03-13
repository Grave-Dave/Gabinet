import './scss/style.scss';
import quotes from './quotes';

// Header--------------------------------------

let quote = 0;

const getQuotes = () => {
	document.querySelector<HTMLDivElement>('.quote')?.classList.add('display-down');

	setTimeout(() => {
		document.querySelector<HTMLDivElement>('.quote')?.classList.remove('display-down');
		document.querySelector<HTMLDivElement>('.quote')?.classList.add('display-up');
	}, 3000);

	setTimeout(() => {
		document.querySelector<HTMLDivElement>('.header_quotes')!.innerHTML = `
    <p class="quote">
    ${quotes[quote].quote}
    </p>`;

		quote++;
		quote > 5 ? (quote = 0) : quote;
		getQuotes();
	}, 7000);
};

const handleBackground = () => {
	document.querySelector('.header')?.classList.toggle('lighten');
};

document.querySelector('.header_btn')?.addEventListener('mouseenter', handleBackground);
document.querySelector('.header_btn')?.addEventListener('mouseleave', handleBackground);

// Nav--------------------------------------

const handleNav = () => {
  const goUpArrow = document.querySelector('.go-up-arrow');
	const nav = document.querySelector('nav');

	if (scrollY > 300) {
		nav?.classList.add('nav-fixed');
	} else {
		nav?.classList.remove('nav-fixed');
	}
	if (scrollY > 1000) {
		goUpArrow?.classList.add('visible');
	} else goUpArrow?.classList.remove('visible');
};


const burgerBtn = document.querySelector('.hamburger')

const handleNavMobile = () => {

  const navItems = document.querySelector('.nav_items_mobile')

  burgerBtn?.classList.toggle('is-active')
  navItems?.classList.toggle('show')
  
}

burgerBtn?.addEventListener('click', handleNavMobile)

  


window.addEventListener('scroll', handleNav);

getQuotes();
