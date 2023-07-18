class SetFooter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <footer>
    <div class="footer">
      <div class="alamat">
        <div class="logo">
          <h1><span>GET</span>RESTO.</span></h1>
      </div>
  
      <p>jl.siha Kampus Polnustar<br>Kec.Manganitu kampung siha<br>Kab.Kep Sangihe<br>Sulawesi Utara </p>
      <ul>
          <li><span class="fa fa-facebook"></span></li>
          <li><span class="fa fa-twitter"></span></i></li>
          <li><span class="fa fa-instagram"></span></i></li>
      </ul>
      </div>

      <div class="footer-nav">
        <h2>NAV.</h2>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Favorite</a></li>
          <li><a href="https://www.instagram.com/fbryan.b/#">About Us</a></li>
        </ul>
      </div> 

      <div class="kontak">
        <h2>CONTACT US</h2>
        <a href="">Kontak Kami</a>        
      </div>
    </div>
    <div class="copyrigth">
      <h3>Copyright © 2023 - GETRESTO</h3>
    </div>
  </footer>
      `;
  }
}

customElements.define('set-footer', SetFooter);
