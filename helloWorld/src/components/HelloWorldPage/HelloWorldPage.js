import Heading from '../Heading/Heading';
import HelloWorldButton from '../HelloWorldButton/HelloWorldButton';

// for a Micro Frontent architecture, pages are exported as components that can be shared
class HelloWorldPage {
  render() {
    const heading = new Heading();
    heading.render('hello world');
    const helloWorldButton = new HelloWorldButton();
    helloWorldButton.render();
  }
}

export default HelloWorldPage;
