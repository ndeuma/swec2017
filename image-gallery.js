class ImageGallery extends HTMLElement {
	
	constructor() {
		super();
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = `	
			<style>
				:host { 
					display: flex;
					align-items: center;
				}
				button {					
					margin: 10px;
					height: 40px;					
				}
			</style>
			<button id="previous">&lt;</button>
			<slot id="slot">No images defined</slot>
			<button id="next">&gt;</button>
		`;				
	}
	
	connectedCallback() {		
		var slot = this.shadowRoot.querySelector("#slot");		
		this._boundOnSlotChange = this.onSlotChange.bind(this);
		slot.addEventListener("slotchange", this._boundOnSlotChange);
		
		var previous = this.shadowRoot.querySelector("#previous");
		previous.addEventListener("click", this.previous.bind(this));
		
		var next = this.shadowRoot.querySelector("#next");
		next.addEventListener("click", this.next.bind(this));
	}
	
	disconnectedCallback() {
		var slot = this.shadowRoot.querySelector("#slot");
		slot.removeEventListener("slotchange", this._boundOnSlotChange);
	}
	
	onSlotChange() {
		var slot = this.shadowRoot.querySelector("#slot");
		this.images = slot.assignedNodes().filter(node => node.nodeName === "IMG");
		this.selectImage(0);
	}
	
	previous() {
		if (this.selected > 0) {
			this.selectImage(this.selected - 1);
		}
	}
	
	next() {
		if (this.selected < this.images.length - 1) {
			this.selectImage(this.selected + 1);
		}
	}
	
	selectImage(index) {
		this.selected = index;
		for (let i in this.images) {
			if (i == index) {
				this.images[i].style = "display: inline;"
			} else {
				this.images[i].style = "display: none;"
			}
		}
	}
}

window.customElements.define('image-gallery', ImageGallery);
