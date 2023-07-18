class ComponentHead extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="logo">
        <h1><span>GET</span>RESTO.</span></h1>
      </div>
      <button
              class="menu"
              aria-label="open to navbar" id="hamburgerMenu" 
              type="button"
            >
              <span class="fa fa-bars"></span>
            </button>
      <nav class="navbar" id="navigasiDrawer">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a class="active" href="#/favorit">Favorite</a></li>
          <li><a href="https://www.instagram.com/fbryan.b/#">About Us</a></li>
        </ul>
      </nav>
      `;
  }
}

customElements.define('head-section', ComponentHead);
