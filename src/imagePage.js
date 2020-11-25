import Heading from './components/Heading/Heading';
import AddImage from './components/AddImage/AddImage';
// import React from 'react';
// import _ from 'lodash';

const heading = new Heading();
// heading.render(_.upperFirst('road glide image'));
heading.render('road glide image');

const rgImage = new AddImage();
rgImage.render();
