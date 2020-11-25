import Heading from './components/Heading/Heading';
import HelloWorldButton from './components/HelloWorldButton/HelloWorldButton';

const heading = new Heading();
heading.render('hello world');

const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();

if (process.env.NODE_ENV === 'production') {
  console.log('Production Mode');
} else if (process.env.NODE_ENV === 'development') {
  console.log('Development Mode');
} else {
  console.log('No Mode Set');
}
