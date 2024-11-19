class UserLogin extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = /*html*/ `
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            /* Estilos del componente */
            :host {
                font-family: -apple-system, sans-serif;
                display: block;
                padding: 20px;
                background-color: var(--primary-bg-color);  /* Fondo oscuro */
                color: var(--text-color-light);  /* Color de texto claro */
            }

            h2 {
                text-align: center;
                font-size: 24px;
                color: var(--text-color-light);
                margin-bottom: 20px;
                font-weight: 600;
            }

            form {
                background-color: var(--secondary-bg-color); /* Fondo gris oscuro para el formulario */
                padding: 20px;
                border-radius: var(--border-radius); /* Usando variable global */
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            }

            label {
                display: block;
                margin-bottom: 8px;
                color: var(--text-color-light);
            }

            input {
                width: 100%;
                padding: var(--input-padding);
                margin-bottom: 20px;
                background-color: var(--input-bg-color);
                color: var(--text-color-light);
                border: 1px solid var(--input-border-color);
                border-radius: 6px;
                font-size: var(--font-size-medium);
            }

            input:focus {
                border-color: var(--input-focus-border-color);
                outline: none;
            }

            button {
                width: 100%;
                padding: var(--button-padding);
                background-color: var(--accent-color);
                color: var(--text-color-light);
                border: none;
                border-radius: 6px;
                font-size: var(--font-size-medium);
                cursor: pointer;
            }

            button:hover {
                background-color: #4b8a8a;
            }

            .error {
                color: #FF3B30;
                font-size: var(--font-size-small);
                margin-top: 10px;
            }

            .success {
                color: var(--success-color);
                font-size: var(--font-size-small);
                margin-top: 10px;
            }
        </style>
        <h2>Iniciar Sesión</h2>
        <form id="login-form">
        <label for="username">Usuario:</label>
        <input type="text" id="username" name="username" required placeholder="Ingresa tu usuario" />

        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="password" required placeholder="Ingresa tu contraseña" />

        <button type="submit" id="bton">Entrar</button>
        <p class="error" id="error-message"></p>
      </form>
        
        `;

        this.form = this.shadowRoot.querySelector('#login-form');
        this.username = this.shadowRoot.querySelector('#username');
        this.password = this.shadowRoot.querySelector('#password');
        this.errorMessage = this.shadowRoot.querySelector('#error-message');
        this.button =this.shadowRoot.querySelector('#bton');

        this.shadowRoot.getElementById('bton')
            .addEventListener('click', this.submitForm.bind(this));
    }

submitForm(event) {
    event.preventDefault(); 

    const username = this.username.value;
    const password = this.password.value;

    // validaciones 
    if (username === 'admin' && password === 'admin') {
        this.errorMessage.textContent = '';
        this.dispatchEvent(new CustomEvent('login-result', {
            detail: { status: true, message: 'Inicio de sesión exitoso', bubbles: true, composed: true }
        }));
    } else if (username === '' || password === '') {
        
        this.dispatchEvent(new CustomEvent('login-result', {
            detail: { status: false, message: 'Por favor, complete ambos campos', bubbles: true, composed: true }
        }));
    } else {
        
        this.dispatchEvent(new CustomEvent('login-result', {
            detail: { status: false, message: 'Usuario o contraseña incorrectos', bubbles: true, composed: true }
        }));
    }
    
    // Puede ser útil también enviar una alerta tipo 'info' en otros contextos:
    // Ejemplo de mensaje informativo cuando el usuario pasa el mouse sobre el campo de contraseña
    this.dispatchEvent(new CustomEvent('alert', {
        detail: { type: 'info', message: 'Recuerda que tu contraseña es sensible a mayúsculas y minúsculas', bubbles: true, composed: true }
    }));
    
    /*if (username === 'admin' && password === 'admin') {
        this.errorMessage.textContent = ''; 
        this.dispatchEvent(new CustomEvent('login-result', {
            detail: { status: true, message: 'Inicio de sesión exitoso', bubbles: true, composed: true }
        }));
    } else {
        
        this.dispatchEvent(new CustomEvent('login-result', {
            detail: { status: false, message: 'Usuario o contraseña incorrectos', bubbles: true, composed: true }
        }));
    }
}
}*/
}}

customElements.define('user-login', UserLogin);

