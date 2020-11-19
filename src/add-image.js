import RG1 from './RG1.jpg';

function addImage() {
  const img = document.createElement('img');
  img.alt = 'Road Glide';
  img.width = 300;
  img.style.display = 'block';
  img.src = RG1;

  const body = document.querySelector('body');
  body.appendChild(img);
}

export default addImage;
