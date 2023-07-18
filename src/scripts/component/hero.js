class HeroContent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="countainer-hero">
      <div class="hero">
        <h1>Hungry? Let's GETRESTO.</h1>
        <p>Bersama GETRESTO dapat membantu anda untuk mngeksplore restoran terbaik di Indonesia</p>
      </div>
    </div>
      `;
  }
}

customElements.define('hero-content', HeroContent);
