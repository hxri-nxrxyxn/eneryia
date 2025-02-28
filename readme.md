# 🍽️ Savr - Your AI-Powered Food Waste Reduction App ♻️

## 🚀 Overview

Savr is a mobile application built with Svelte, Capacitor, Go, and PostgreSQL, designed to help you reduce food waste and discover delicious recipes. 🧑‍🍳 Using AI-powered scanning, Savr effortlessly adds your pantry items to your inventory. Based on the near-expiry dates of your ingredients, the app suggests tasty recipes, ensuring nothing goes to waste. 🍎🥦🥕

## 🛠️ Tech Stack

* **Frontend:** Svelte (for a reactive and performant user interface) 💻
* **Mobile Framework:** Capacitor (for cross-platform deployment to iOS and Android) 📱
* **Backend:** Go (for efficient and scalable API development) ⚙️
* **Database:** PostgreSQL (for robust and reliable data storage) 🐘
* **AI:** Custom AI model for item scanning and recognition 🤖

## ✨ Features

* **📸 AI-Powered Inventory Scanning:** Effortlessly add items to your inventory by simply scanning them with your phone's camera. 🔍
* **📅 Near-Expiry Tracking:** Savr monitors the expiry dates of your ingredients, alerting you when items are about to expire. ⏰
* **🍲 Recipe Suggestions:** Get personalized recipe suggestions based on your available ingredients and near-expiry items. 😋
* **📝 Inventory Management:** Easily manage your pantry inventory, adding, editing, and deleting items as needed. 📦
* **📱 Cross-Platform Compatibility:** Deployable to both iOS and Android devices using Capacitor. 🌐

## ⚙️ Setup Instructions

1.  **Prerequisites:**
    * Node.js and npm installed.
    * Go installed and configured.
    * PostgreSQL installed and running.
    * Capacitor CLI installed (`npm install -g @capacitor/cli`).
    * Android Studio or Xcode (for building native apps).
      
2.  **Clone the Repository:**
   
    ```bash
    git clone https://github.com/hxri-nxrxyxn/savr
    cd Savr
    ```
4.  **Backend Setup (Go):**
   
    * Navigate to the `api` directory.
    * Configure your PostgreSQL connection details in the `.env` file.
    * Run `go mod tidy` to install dependencies.
    * Run `go build` to compile the backend.
    * Run the backend: `./main`.
      
6.  **Database Setup (PostgreSQL):**
    * Create a PostgreSQL database for Savr.
      
7.  **Frontend Setup (Svelte):**
    * Navigate to the `src` directory.
    * Run `npm install` to install dependencies.
    * Run `npm run dev` to start the development server.
      
8.  **Capacitor Setup:**
    * In the `src` directory, run `npx cap init`.
    * Add platforms: `npx cap add android` or `npx cap add ios`.
    * Build the Svelte app: `npm run build`.
    * Copy the built files to the Capacitor web directory: `npx cap copy`.
    * Open the native IDE: `npx cap open android` or `npx cap open ios`.
      
9.  **AI Model Setup:**
    * We couldn't complete setting up our model, so used [Google AI Studio](https://makersuite.google.com) instead.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to suggest improvements or report bugs. 🐛

## 📜 License

This project is licensed under the MIT License. 📝

## 📧 Contact

For any questions or inquiries, please contact [me](hari@laddu.cc). 📬
