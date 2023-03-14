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

const navItemsBox = document.querySelector('.nav_items_mobile');
const navItems = document.querySelectorAll('.nav_item');
const burgerBtn = document.querySelector('.hamburger');
const sections = document.querySelectorAll('.section')

const handleNav = () => {
	const goUpArrow = document.querySelector('.go-up-arrow');
	const nav = document.querySelector('nav');
	const navMobile: any = document.querySelector('.nav-mobile');

	if (scrollY > 300) {
		nav?.classList.add('nav-fixed');
		navMobile?.classList.add('fixed');
	} else {
		nav?.classList.remove('nav-fixed');
		!navItemsBox?.classList.contains('show') && navMobile?.classList.remove('fixed');
	}
	if (scrollY > 1000) {
		goUpArrow?.classList.add('visible');
	} else goUpArrow?.classList.remove('visible');
};

window.addEventListener('scroll', handleNav);

const handleNavMobile = () => {
	const navMobile: any = document.querySelector('.nav-mobile');

	if (scrollY<=300){
		navMobile?.classList.toggle('fixed');
	}
	burgerBtn?.classList.toggle('is-active');
	navItemsBox?.classList.toggle('show');
};

burgerBtn?.addEventListener('click', handleNavMobile);
navItems.forEach(item=>item.addEventListener('click', handleNavMobile))

const options = {
	threshold: [.30],
};

const handleScrollspy = (entries:any) => {
	entries.forEach((entry:any) => {
		console.log(entries)
		if (entry.isIntersecting) {
			const activeNav = document.querySelector(`a[href='#${entry.target.id}']`);
			navItems.forEach(btn => btn.classList.remove('nav-active'));
			activeNav?.classList.add('nav-active');
		}
	});
};

const sectionObserver = new IntersectionObserver(handleScrollspy, options);

sections.forEach(section => {
	sectionObserver.observe(section);
});

// OFFER--------------------------------------

const areas = document.querySelectorAll('.offer-area-text');
const areaHeaders = document.querySelectorAll('.offer_area');
const cards = document.querySelectorAll('.offer_card');

let areaNumber = 0;
let delay = 0;

const observer = new IntersectionObserver(
	entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting && areaNumber % 2 === 0) {
				entry.target.classList.add('visible-right');
				observer.unobserve(entry.target);
				areaNumber++;
			} else if (entry.isIntersecting && areaNumber % 2 !== 0) {
				entry.target.classList.add('visible-left');
				observer.unobserve(entry.target);
				areaNumber++;
			}
		});
	},
	{
		threshold: 0.5,
	}
);

areas.forEach(area => {
	observer.observe(area);
});

const handleArea = (e: any): void => {
	e.target.nextElementSibling.classList.toggle('distinguish');
};

areaHeaders.forEach(header => header.addEventListener('mouseenter', handleArea));
areaHeaders.forEach(header => header.addEventListener('mouseleave', handleArea));

const cardsObserver = new IntersectionObserver(
	entries => {
		entries.forEach((entry: any) => {
			if (entry.isIntersecting) {
				entry.target.style.animationDelay = `${delay}ms`;
				entry.target.classList.add('visible-animation');
				delay += 100;
				cardsObserver.unobserve(entry.target);
			}
		});
	},
	{
		threshold: 0.5,
	}
);

cards.forEach(card => {
	cardsObserver.observe(card);
});

// COOKIE--------------------------------------

document.querySelector('.cookie-btn')?.addEventListener('click', ()=>{
	document.querySelector<any>('.cookie-box')!.style.display='none'
	document.querySelector<any>('.shadow')!.style.display='none'
})

getQuotes();
