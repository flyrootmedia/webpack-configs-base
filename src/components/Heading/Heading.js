import './Heading.scss';

class Heading {
  render(pageName) {
    const h1 = document.createElement('h1');
    const body = document.querySelector('body');

    h1.innerHTML = `Webpack is Awesome. This is the "${pageName}" page.`;
    body.appendChild(h1);
  }
}

export default Heading;
