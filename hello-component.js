class HelloComponent extends HTMLElement {
	constructor() {
		super();	
	}

	connectedCallback() {
		this.innerHTML = "<p>Hello World</p>";
	}
}

class HelloComponentWithShadowRoot extends HTMLElement {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = `
			<style>
				:host {margin-left: 20px; }
			</style>
			<p>In the shadow!</p>`;
	}
}

window.customElements.define('hello-component', HelloComponent);

window.customElements.define('hello-component-shadow', HelloComponentWithShadowRoot);
