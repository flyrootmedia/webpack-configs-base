import Heading from './components/Heading/Heading';
import AddImage from './components/AddImage/AddImage';

// modules exported using ModuleFederation are loaded async at runtime,
// so need a dynamic import (AppName/ComponentName)
import('HelloWorldApp/HelloWorldButton').then(HelloWorldButtonModule => {
  // in the HelloWorldButton module, we used a default export, so we need to get that here
  const HelloWorldButton = HelloWorldButtonModule.default;
  const helloWorldButton = new HelloWorldButton();
  helloWorldButton.render();
});

const heading = new Heading();
heading.render('road glide image');

const rgImage = new AddImage();
rgImage.render();
