import Heading from './components/Heading/Heading';
import HelloWorldButton from './components/HelloWorldButton/HelloWorldButton';
import React from 'react';
// import _ from 'lodash';

const heading = new Heading();
// heading.render(_.upperFirst('hello world'));
heading.render('hello world');

const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();

// to demonstrate how prod/dev modes handle errors differently:
// if (process.env.NODE_ENV === 'production') {
//   console.log('Production Mode');
// } else if (process.env.NODE_ENV === 'development') {
//   console.log('Development Mode');
// } else {
//   console.log('No Mode Set');
// }

// helloWorldButton.methodThatDoesNotExist();
