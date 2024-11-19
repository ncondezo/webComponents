class LoginPage extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = /*html*/ `
        
        <style>
            /* Estilos para LoginPage */
            :host {
                display: block;
                font-family: 'Arial', sans-serif;
                height: 100vh;
                background-color: var(--primary-bg-color);  /* Usando variable global para el fondo */
                color: var(--text-color-light);  /* Usando variable global para el color de texto */
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
            }

            /* Estilo del contenedor de login */
            user-login {
                background: var(--secondary-bg-color);  /* Usando variable global para el fondo del formulario */
                padding: 20px;
                border-radius: var(--border-radius);  /* Bordes redondeados usando variable global */
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
                width: 100%;
                max-width: 400px; /* Máximo ancho para el formulario de login */
                margin: 20px;
            }

            /* Estilo del contenedor de alertas */
            alert-message {
                margin-top: 20px;
                width: 100%;
                max-width: 400px;  /* Ancho máximo para la alerta */
            }

            /* Asegurarse de que el formulario de login ocupe toda la altura disponible */
            user-login {
                margin-top: 0;
                margin-bottom: 20px;
            }

        </style>
        
       
        <user-login></user-login>
        <alert-message></alert-message>
        `;

    
    }

    connectedCallback() {

         this.userLogin = this.shadowRoot.querySelector('user-login');
         this.alertComponent = this.shadowRoot.querySelector('alert-message');
         console.log("alertComponent found:", this.alertComponent);
         this.userLogin.addEventListener('login-result', this.handleLogin.bind(this));

    }

    handleLogin(event){
        const { status, message} = event.detail;
        this.handlerShowAlert(status, message);
    }

    handlerShowAlert(status, message){
        const alertType = status ? 'success' : 'error';
        this.alertComponent.setAttribute('type', alertType);  
        this.alertComponent.setAttribute('message', message); 
        //this.alertComponent.message = {type: alertType, text: message};
        console.log(`TEXT = ${message}`);
        console.log(`ALERT = ${alertType}`);
    }
}
customElements.define('login-page', LoginPage);
