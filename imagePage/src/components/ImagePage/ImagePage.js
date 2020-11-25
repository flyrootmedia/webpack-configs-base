import Heading from '../Heading/Heading';
import AddImage from '../AddImage/AddImage';

// for a Micro Frontent architecture, pages are exported as components that can be shared
class ImagePage {
  render() {
    const heading = new Heading();
    heading.render('road glide image');
    const rgImage = new AddImage();
    rgImage.render();
  }
}

export default ImagePage;
