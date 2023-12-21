# Mama Recipe BackEnd using Express 🍽️🔧

## Project Description 🚀

This is a RESTful API for a mama recipes app built using Express.js. The API allows users to perform CRUD operations on user data and recipe data, and also provides authentication using JWT (JSON Web Tokens). Users can also retrieve their own profile data.

## Technologies Used 💻🛠️

The Mama Recipe BackEnd project is built using the following technologies:

- JavaScript
- Express.js (Backend framework)
- PostgreSQL (Relational Database)
- Redis (In-memory data store)
- Cloudinary (Cloud-based image and video management)

## Project Structure 📂🛠️

```
└── be-recipe-prisma
   |── prisma                          # Database ORM
   |    |── migrations                 # Query log 
   |    └── schema.prisma              # Database schema
   |
   |── public                          # Public assets (images, etc.)
   |
   |── src                             # Project source code
   |    |── config                     # Configuration files
   |    |    |── cloundinaryConfig.js  # Cloud configuration file settings 
   |    |    |── db.js                 # Database configuration settings 
   |    |    |── jwt.js                # Token configuration settings 
   |    |    └── redisConfig.js        # Data store configuration settings
   |    |   
   |    |── controller                 # Request handlers and route controllers
   |    |   ├── userController.js      # User-related logic
   |    |   └── recipeController.js    # Recipe-related logic
   |    |
   |    |── middlewares                # Request handler with access to the application's request-response cycle
   |    |   ├── authMiddleware.js      # Authorization function
   |    |   ├── multerProfile.js       # Upload picture function
   |    |   ├── multerRecipe.js        # Upload image and video recipe function
   |    |   ├── redis.js               # Data store function
   |    |   └── verifyRole.js          # Verification role user function
   |    |
   |    |── model                      # Database models and schema definitions
   |    |   ├── userModel.js           # User model schema
   |    |   └── recipeModel.js         # Recipe model schema
   |    |
   |    |── router                     # Route definitions and API endpoints
   |    |   ├── userRouter.js          # User-related routes
   |    |   └── recipeRouter.js        # Recipe-related routes
   |    |
   |    |── helper                     # Helper functions and utilities
   |    |   └── extractString.js       # Function for extract file name.
   |    |   └── response.js            # Response function to generate status, result, etc.
   |    |
   |    └── index.js                   # Server routing
   |
   |── .eslintrc.json                  # A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript
   |── .gitattributes                  # Simple text file that gives attributes to pathnames
   |── .gitignore                      # List of files to be ignored by Git
   |── README.md                       # Project documentation for GitHub
   |── package-lock.json               # File to ensure that the same dependencies are installed consistently across different environments, such as development and production environments
   └── package.json                    # Records important metadata about the project

  

```

## Postman Documentation 📚📝

For detailed information about the API endpoints and how to use them, please refer to our Postman documentation:

[![Mama Recipe API Postman Documentation](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/29237155/2s9YkrZyjX)

## Features ✨🍔🍰

- RESTful API endpoints for user data (CRUD operations)
- RESTful API endpoints for recipe data (CRUD operations)
- JWT-based authentication and authorization for user access
- PostgreSQL database for storing user and recipe data
- In-memory data caching with Redis for improved performance
- Cloudinary integration for managing images and videos

## Getting Started 🏁🚀

To set up the Mama Recipe BackEnd project locally, follow these steps:

1. Clone the repository from the provided link.
2. Install the required dependencies using npm.
3. Set up your PostgreSQL database and update the configuration accordingly.
4. Set up Cloudinary account and update the credentials in the project.
5. Ensure you have Node.js and npm installed on your system.
6. Start the server using the command `npm start`.
7. Access the API endpoints through your preferred API testing tool.

## Contributions 🤝🌟

Contributions to the Food Recipe BackEnd project are welcome. If you find any issues or have suggestions for improvements, please feel free to open an issue or create a pull request in the repository.

## License 📜📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact 📞📧

If you have any questions or inquiries regarding this project, feel free to contact me at [fajaradiprasetio@gmail.com](mailto:fajaradiprasetio@gmail.com).

---

Thank you for exploring the Mama Recipe BackEnd using Express portfolio. This API serves as the backbone of the Mama recipes app, providing essential functionality for users to interact with the platform. Happy coding and developing! 🍳🥗👩‍🍳👨‍🍳
