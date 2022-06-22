//IIFE
(async () => {
    const template = document.createElement('template')
    template.innerHTML = `
        <link rel='stylesheet' href='src/components/modal/style.css' />
        <div class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="btn btn-small btn-red close">&times;</span>
                    <slot name="header"><slot>
                </div>
                <div class="modal-body">
                    <slot name="content"><slot>
                </div>
            </div>
        </div>
    `

    class Modal extends HTMLElement {
        constructor() {
            super()
            this.modal
            this.attachShadow({ mode: 'open' })
            this.shadowRoot.appendChild(template.content.cloneNode(true))
        }

        showModal() {
            this.modal.style.display = 'block'
        }

        _hideModal() {
            this.modal.style.display = 'none'
            this.parentNode.removeChild(this)
        }

        connectedCallback() {
            try {
                this.modal = this.shadowRoot.querySelector('.modal')
                this.shadowRoot.querySelector('.close').addEventListener('click', this._hideModal.bind(this))
            } catch (err) {
                console.error('Error to connectedCallback: ', err)
            }
        }

        disconnectedCallback() {
            try {
                this.shadowRoot.querySelector('.close').removeEventListener('click', this._hideModal)
            } catch (err) {
                console.error('Error to disconnectedCallback: ', err)
            }
        }
    }

    window.customElements.define('modal-element', Modal)

})()