import './index.scss';

// to use fontawesome icons, import the core library...
import { library, dom } from '@fortawesome/fontawesome-svg-core';
// ...then you can import only the icons you need from the svg icon packages
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import Heading from './components/Heading/Heading';
import HelloWorldButton from './components/HelloWorldButton/HelloWorldButton';

// import React from 'react';
// import _ from 'lodash';

// add imported icons to the Fontawesome library
library.add(faSpinner);

// the fontawesome dom.watch() method replaces any elements with fas classes with the actual icon.
// It also sets up an observer so icons can be added to the dom dynamically.
dom.watch();

const heading = new Heading();
// heading.render(_.upperFirst('hello world'));
heading.render('hello world');

const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();

// to demonstrate how prod/dev modes handle errors differently:
if (process.env.NODE_ENV === 'production') {
  console.log('Production Mode');
} else if (process.env.NODE_ENV === 'development') {
  console.log('Development Mode');
} else {
  console.log('No Mode Set');
}

// helloWorldButton.methodThatDoesNotExist();
