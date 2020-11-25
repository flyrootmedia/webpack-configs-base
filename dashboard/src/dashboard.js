import NavigationBar from './components/NavigationBar/NavigationBar';

const navigationItems = [
  {
    url: '/hello-world-page',
    title: 'Hello World Page'
  },
  {
    url: '/image-page',
    title: 'Image Page'
  }
];

const navigationBar = new NavigationBar();
navigationBar.render(navigationItems);

const url = window.location.pathname;

// TODO: I tried reducing the duplicated logic by creating a reusable function
// for the imports, but the app was not able to import the modules this way.
// Investigate this...I must just be missing something

// use dynamic imports to get all the page modules from the different apps
// (import based on the URL)
// TODO: look into dynamic imports with named exports in lieu of the default
// we're using here
switch (url) {
  case '/hello-world-page':
    import('HelloWorldApp/HelloWorldPage').then(HelloWorldPageModule => {
      const HelloWorldPage = HelloWorldPageModule.default;
      const helloWorldPage = new HelloWorldPage();
      helloWorldPage.render();
    });
    break;
  case '/image-page':
    import('ImageApp/ImagePage').then(ImagePageModule => {
      const ImagePage = ImagePageModule.default;
      const imagePage = new ImagePage();
      imagePage.render();
    });
    break;
  default:
    import('HelloWorldApp/HelloWorldPage').then(HelloWorldPageModule => {
      const HelloWorldPage = HelloWorldPageModule.default;
      const helloWorldPage = new HelloWorldPage();
      helloWorldPage.render();
    });
    break;
}
