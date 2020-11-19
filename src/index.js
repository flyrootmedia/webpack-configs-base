import Heading from './components/Heading/Heading';
import HelloWorldButton from './components/HelloWorldButton/HelloWorldButton';
import addImage from './add-image';

const heading = new Heading();
heading.render();

const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();

addImage();
