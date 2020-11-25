## A base project with sample Webpack configs that can be modified based on project needs

- This project was created for the Udemy course, "Webpack 5: The Complete Guide For Beginners", then modified for my needs
- This branch has simplified and cleaned up configs to demonstrate how to integrate Webpack with Module Federation (new to Webpack 5) to allow multiple applications to share code at runtime, and uses a common dashboard application which loads the contents of each separate app from a unique URL.
- This architecture is called a "Micro Frontend" and is useful when different pages are develeoped by different teams. It allows large teams to share common modules for flexibility and ease of maintenance without creating a monolithic front end
