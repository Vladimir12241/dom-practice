import { title, turtles } from "./persons.js";
import { Navigation } from "./navigationListGenereator.js";
import { Content } from "./contentGenerator.js";

class App {
	constructor() {
		this.favicon = document.querySelector(".logo-link");
		this.menu = document.querySelector("#menu-toggle");
		this.contentBox = document.querySelector("#main-content");
		this.contentMenuList = [];
		this.contentTitul = [];

		this.favicon.addEventListener("click", (e) => {
			this.router();
			return;
		});

		this.menu.addEventListener("change", (e) => {
			this.navigationListHiden();
		});

		addEventListener("popstate", (e) => {
			e.preventDefault;
			this.router();
		});

		this.contentGenerator();
	}
	contentGenerator() {
		turtles.map((item) => {
			new Navigation(item);
			this.contentMenuList.push(new Content(item));
		});
		this.contentTitul.push(new Content(title));
	}

	router() {
		let hash = window.location.hash.split("/");
		hash = hash[hash.length - 1];
		this.isActive(hash);
	}

	isActive(hash) {
		document.getElementById("menu-toggle").checked = false;
		const navMenu = document.getElementById("nav-list").childNodes;
		if (hash === undefined || hash === "") {
			for (let i = 0; i < navMenu.length; i++) {
				navMenu[i].firstChild.classList.remove("is-active");
				this.printer(this.contentTitul[0]);
			}
		} else {
			this.contentMenuList.map((item) => {
				if (item.hash === hash) {
					navMenu[item.id - 1].firstChild.classList.add("is-active");
					this.printer(item);
				} else {
					navMenu[item.id - 1].firstChild.classList.remove("is-active");
				}
			});
			this.navigationListHiden();
		}
	}

	printer(content) {
		this.preload();
		this.contentBox.innerHTML = "";
		this.contentBox.appendChild(content.localContentBox);
	}

	preload() {
		document.getElementById("main-content").classList.add("while-preload");
		document.getElementById("main").classList.remove("loaded");

		const loaded = () => {
			if (document.readyState !== "complete") {
				setTimeout(loaded, 2000);
			} else {
				window.setTimeout(() => {
					document.getElementById("main").classList.add("loaded");
					document.getElementById("main-content").classList.remove("while-preload");
				}, 500);
			}
		};
		loaded();
	}

	navigationListHiden() {
		if (document.getElementById("menu-toggle").checked) {
			document.getElementById("nav-list").classList.remove("nav-list-hiden");
		} else {
			document.getElementById("nav-list").classList.add("nav-list-hiden");
		}
	}
}

const app = new App();
app.router();
