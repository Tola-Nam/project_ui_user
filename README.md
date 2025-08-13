# 🎣 Fishing Store

A modern, responsive e-commerce web application built with Vue.js for fishing enthusiasts. This application provides a complete online shopping experience for fishing gear, equipment, and accessories.

## 📋 Table of Contents

- [🎣 Fishing Store](#-fishing-store)
  - [📋 Table of Contents](#-table-of-contents)
  - [✨ Features](#-features)
    - [🛒 E-commerce Functionality](#-e-commerce-functionality)
    - [👤 User Management](#-user-management)
    - [🎨 User Experience](#-user-experience)
  - [🚀 Tech Stack](#-tech-stack)
    - [Frontend](#frontend)
    - [Build Tools](#build-tools)
    - [Development](#development)
  - [📁 Project Structure](#-project-structure)
  - [📋 Prerequisites](#-prerequisites)
  - [🛠️ Installation](#️-installation)
  - [🚦 Development](#-development)
    - [Start Development Server](#start-development-server)
    - [Available Scripts](#available-scripts)
  - [🏗️ Building for Production](#️-building-for-production)
  - [🧩 Project Components](#-project-components)
    - [Core Components](#core-components)
    - [Views](#views)
    - [Authentication](#authentication)
    - [Features](#features)
  - [📱 Screenshots](#-screenshots)
  - [🤝 Contributing](#-contributing)
    - [Development Guidelines](#development-guidelines)
  - [📄 License](#-license)
  - [📞 Support](#-support)
  - [🙏 Acknowledgments](#-acknowledgments)

## ✨ Features

### 🛒 E-commerce Functionality

- **Product Catalog**: Browse fishing equipment and gear
- **Shopping Cart**: Add, remove, and manage items
- **Order Processing**: Complete purchase workflow
- **Customer Receipts**: Digital receipt generation
- **Size Guide**: Interactive sizing modal for products

### 👤 User Management

- **User Authentication**: Secure login and registration
- **User Profiles**: Personal account management
- **Favorites System**: Save preferred products
- **Order History**: Track past purchases

### 🎨 User Experience

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Modals**: Smooth user interactions
- **Category Navigation**: Organized product browsing
- **Modern UI/UX**: Clean and intuitive interface

## 🚀 Tech Stack

### Frontend

- **Vue.js 3** - Progressive JavaScript framework
- **Vue Router** - Official routing library
- **Pinia/Vuex** - State management
- **Tailwind CSS** - Utility-first CSS framework

### Build Tools

- **Vite** - Next generation frontend tooling
- **Node.js** - JavaScript runtime

### Development

- **ES6+** - Modern JavaScript features
- **Component-based Architecture** - Modular development
- **Single File Components** - Vue SFC structure

## 📁 Project Structure

```
fishing-store/
├── 📄 README.md                    # Project documentation
├── 📄 index.html                   # Main HTML template
├── 📦 package.json                 # Dependencies and scripts
├── ⚙️ vite.config.js               # Vite configuration
├── ⚙️ tailwind.config.js           # Tailwind CSS configuration
├── 📁 public/                      # Static assets
│   ├── 🖼️ fishingLogo.png         # Application logo
│   └── 🖼️ vite.svg                # Vite logo
└── 📁 src/                         # Source code
    ├── 📄 App.vue                  # Root component
    ├── 📄 main.js                  # Application entry point
    ├── 🎨 style.css                # Global styles
    ├── 📁 assets/                  # Project assets
    │   ├── 🖼️ vue.svg             # Vue logo
    │   ├── 🖼️ preview.png         # Preview images
    │   └── 🖼️ preview_add.png
    ├── 📁 components/              # Reusable components
    │   ├── 🧩 navbar.vue          # Navigation bar
    │   ├── 🧩 footer.vue          # Footer component
    │   └── 🧩 modal_form.vue      # Modal form component
    ├── 📁 router/                  # Routing configuration
    │   └── 📄 index.js            # Route definitions
    ├── 📁 stores/                  # State management
    │   └── 📄 auth.js             # Authentication store
    └── 📁 views/                   # Page components
        ├── 🏠 homePage.vue         # Home page
        ├── 🛒 card.vue             # Shopping cart
        ├── 📋 order_product.vue    # Order processing
        ├── 🧾 customer_receipt.vue # Receipt view
        ├── 📏 Size_Guide_Modal.vue # Size guide modal
        ├── 🔧 modal.vue            # Generic modal
        ├── 📁 categories/          # Category-related views
        │   ├── ❤️ add_favorite.vue # Add to favorites
        │   ├── 📋 cate_demo.vue    # Category demo
        │   └── 📄 cate_detail.vue  # Category details
        └── 📁 mod/                 # Module components
            ├── 🔐 AuthModal.vue    # Authentication modal
            ├── 🔐 AuthView.vue     # Authentication view
            ├── ❤️ FavoriteButton.vue # Favorite button
            └── 👤 Registration_user.vue # User registration
```

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn**
- **Git** for version control

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/fishing-store.git
   cd fishing-store
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment setup** (if needed)
   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```

## 🚦 Development

### Start Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🏗️ Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist/` directory, ready for deployment.

## 🧩 Project Components

### Core Components

| Component        | Description                |
| ---------------- | -------------------------- |
| `App.vue`        | Root application component |
| `navbar.vue`     | Main navigation bar        |
| `footer.vue`     | Site footer                |
| `modal_form.vue` | Reusable modal form        |

### Views

| View                   | Purpose                             |
| ---------------------- | ----------------------------------- |
| `homePage.vue`         | Landing page with featured products |
| `card.vue`             | Shopping cart management            |
| `order_product.vue`    | Order processing and checkout       |
| `customer_receipt.vue` | Order confirmation and receipt      |

### Authentication

| Component               | Functionality          |
| ----------------------- | ---------------------- |
| `AuthModal.vue`         | Login/signup modal     |
| `AuthView.vue`          | Authentication page    |
| `Registration_user.vue` | User registration form |

### Features

| Component              | Feature                    |
| ---------------------- | -------------------------- |
| `add_favorite.vue`     | Add products to favorites  |
| `FavoriteButton.vue`   | Toggle favorite status     |
| `Size_Guide_Modal.vue` | Product sizing information |

## 📱 Screenshots

_Add screenshots of your application here_

- Homepage
- Product catalog
- Shopping cart
- User authentication
- Mobile responsive views

## 🤝 Contributing

We welcome contributions to the Fishing Store project! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines

- Follow Vue.js best practices
- Use Tailwind CSS for styling
- Write clear, descriptive commit messages
- Add comments for complex logic
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 📞 Support

If you have any questions or need help getting started:

- 📧 Email: support@fishingstore.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/fishing-store/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/fishing-store/discussions)

## 🙏 Acknowledgments

- Vue.js community for the amazing framework
- Tailwind CSS team for the utility-first CSS framework
- All contributors who help improve this project

---

**Happy Fishing! 🎣**

_Built with ❤️ for the fishing community_
