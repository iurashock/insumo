# Insumo

A simple budget and net worth tracking app built with React Native and Expo Router, meant to be **fully self-hosted** **FOSS** on any device via **Docker** as data privacy is becoming extremely important in the current age of technology, and all spending trackers continuously ask for premium subscriptions and bank account access.

On this project I used modern technologies, like **Nativewind** (TailwindCSS for React Native, for fast inline styling with a consistent feel), **TypeScript** for type safety, **Expo Router** for app flows and simplified navigation, and multi-platform support within the same project (using React Native for the web version as well).

The app is still in the prototyping phase, a "complete" vision will include:
- complete transation tracking with automatic statistics generation on mobile and web;
- automatic net worth tracker based on transactions (like savings, loan payments, and asset/liability increase/depreciation, etc;
- a fully private database (and back-end built in **Go/Rust**), and feature all-in-one Docker deployment.

To run in offline mode (avoid VPN issues with npm install) first do:
```
$env:EXPO_OFFLINE="1"
```
then start the server:
```
npx expo start --web --clear
```

A few screenshots from the app:
<img width="1912" height="1017" alt="image" src="https://github.com/user-attachments/assets/b0c0b5d3-c9e0-4552-bf60-6fa9ae101884" />
The landing page is a simple login form with a dynamic background (generated as a random matrix of pre-defined symbols on a gradient), with basic form validation.
The same page loads a different form for registration, to simplify the app flow.

<img width="1916" height="1018" alt="image" src="https://github.com/user-attachments/assets/b827e8d4-0322-48a2-9db4-3293cd9759cf" />
Home Page with filters (drop-down menus) for transactions, a text search bar and custom time picker with a few preset intervals.
<img width="301" height="389" alt="image" src="https://github.com/user-attachments/assets/a0b48c15-e9ae-4766-b52d-382319415865" /> <img width="399" height="375" alt="image" src="https://github.com/user-attachments/assets/17637272-2f7e-42a1-ab7f-633587608280" /><br>
Drop down filters with dynamic headers (the number displays how many items are selected), and the time picker allows for selecting any interval length, even spanning across different months/years.  

<img width="1305" height="558" alt="image" src="https://github.com/user-attachments/assets/b5423318-3258-4066-8acc-780bbe679613" />
Selecting a transaction opens up the detailed view on the right, where the user can edit details or delete the entry.

<img width="361" height="276" alt="image" src="https://github.com/user-attachments/assets/f1cbbde7-c4e8-42c5-b073-3a106de7c5a1" /> <br>
The Cog icon opens up a functional drop-down menu for basic navigation, common app preferences and a log out button.

