import './AddImage.scss';
import RoadGlide from '../../images/RG1.jpg';

class AddImage {
  render() {
    const img = document.createElement('img');
    img.src = RoadGlide;
    img.alt = '2019 Road Glide Special';
    img.classList.add('roadglide-image');

    const bodyEl = document.querySelector('body');
    bodyEl.appendChild(img);
  }
}

export default AddImage;
