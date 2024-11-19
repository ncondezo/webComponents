class AlertMessage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['message', 'type'];
    }

    connectedCallback() {
        console.log("AlertMessage connected");
        this.shadowRoot.innerHTML = /*html*/ `
        <style>
            .alert {
                display: none;
                padding: 10px;
                margin: 10px;
                border-radius: var(--border-radius);
                font-size: var(--font-size-small);
                position: relative;
                text-align: center; 
            }

            .alert.success { background-color: var(--success-color); color: var(--text-color-light); }
            .alert.warning { background-color: var(--warning-color); color: var(--text-color-dark); }
            .alert.error { background-color: var(--error-color); color: var(--text-color-light); }
            .alert.info { background-color: var(--info-color); color: var(--text-color-light); }

            button {
                position: absolute;
                top: 5px;
                right: 5px;
                background: none;
                border: none;
                color: inherit;
                font-size: 16px;
                cursor: pointer;
            }
        </style>
       
        <div class="alert">
            <span class="icon"></span>
            <span class="message"></span>
            <button>X</button>
        </div>
          
        `;

        this.messageElement = this.shadowRoot.querySelector('.message');
        this.alertElement = this.shadowRoot.querySelector('.alert');
        this.button = this.shadowRoot.querySelector('button');

        this.button.addEventListener('click', () => {
            this.hideAlert();
        });
    }

    attributeChangedCallback(name, oldVal, val) {
        console.log(`attributeChangedCallback - ${name}: ${val}`);
        if (name === 'message') {
            this.messageElement.textContent = val;
        }
        if (name === 'type') {
            this.alertElement.className = `alert ${val}`;
        }

        if (this.hasAttribute('message') && this.getAttribute('message').trim() !== "") {
            this.showAlert();
        } else {
            this.hideAlert();
        }
    }

    showAlert() {
        this.alertElement.style.display = 'block';
        console.log("llamado metodo show Alert ------------------------");
        
    }

    hideAlert() {
        this.alertElement.style.display = 'none'; 
    }
}

customElements.define('alert-message', AlertMessage);