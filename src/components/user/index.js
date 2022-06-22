//IIFE
(async () => {
    const template = document.createElement('template')
    template.innerHTML = `
        <link rel='stylesheet' href='src/components/user/style.css' />
        <div>
            <div>
                <img class='avatar' />
            </div>
            <div>
                <p>Nombre: <span class='first_name'></span></p>
            </div>
            <div>
                <p>Apellido: <span class='last_name'></span></p>
            </div>
            <div>
                <p>Correo: <span class='email'></span></p>
            </div>
            <div>
                <button class='viewMore'>VER MÁS</button>
            </div>
        </div>
    `

    class User extends HTMLElement {
        constructor() {
            super()
            this.user
            this.attachShadow({ mode: 'open' })
            this.shadowRoot.appendChild(template.content.cloneNode(true))
        }

        //Declaran los atributos
        static get observedAttributes() {
            return ['element']
        }

        //Implementación cuando se cambia el valor de un atributo
        attributeChangedCallback(name, oldValue, newValue) {
            if (name === 'element') {
                this.user = JSON.parse(newValue)
            }
        }

        _showModal() {
            const modalhtml = `
                <modal-element>
                    <h2 slot='header'>Ver usuario</h2>
                    <div slot='content'>
                        <img src=${this.user.avatar} />
                        <p>${this.user.first_name}</p>
                        <p>${this.user.last_name}</p>
                        <p>${this.user.email}</p>
                    </div>
                </modal-element>
            `
            document.body.insertAdjacentHTML('beforeend' , modalhtml)
            document.body.querySelector('modal-element').showModal()
        }

        connectedCallback() {
            try {
                this.shadowRoot.querySelector('.avatar').src = this.user.avatar
                this.shadowRoot.querySelector('.first_name').innerHTML = this.user.first_name
                this.shadowRoot.querySelector('.last_name').innerHTML = this.user.last_name
                this.shadowRoot.querySelector('.email').innerHTML = this.user.email
                this.shadowRoot.querySelector('.viewMore').addEventListener('click', this._showModal.bind(this))
            } catch (err) {
                console.error('Error to connectedCallback: ', err)
            }
        }

        disconnectedCallback() {
            try {
                this.shadowRoot.querySelector('.viewMore').removeEventListener('click', this._showModal)
            } catch (err) {
                console.error('Error to disconnectedCallback: ', err)
            }
        }
    }

    window.customElements.define('user-element', User)

})()