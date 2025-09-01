# Digital Wallet Frontend

This is the **frontend** of the Digital Wallet application, built with **React**, **TypeScript**, and **Tailwind CSS**. The application provides a user-friendly interface for managing users, editing profiles, and performing wallet-related actions.

---

## Live Deployment 

Live Deployment Link: https://programming-hero-level2-b5-a6-assig-five.vercel.app/

---

## Testing

Emails and Passwords given below for testing purpose:

#### Admin Role:

**email:** admin@gmail.com

**password:** admin_50@/50

#### Agent Role:

**email:** bob@example.com

**password:** hashed_@Password_2

#### User Role:

**email:** alice@example.com

**password:** 000.aA@.

---

## Features

- View a list of users with details like name, email, role, and wallet balance
- Search users by name, email, or phone
- Edit user profiles with a modal dialog
- Delete users with a confirmation dialog
- Dropdown menus for selecting user roles or other options
- Responsive UI using [shadcn/ui](https://ui.shadcn.com/)
- Notifications using [sonner](https://sonner.vercel.app/)

---

## Tech Stack

- **React**: Frontend library for building UI components
- **TypeScript**: Strongly typed JavaScript for better developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Headless UI components for React
- **RTK Query**: Data fetching and state management with Redux
- **Sonner**: Toast notifications

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/digital-wallet-frontend.git
cd digital-wallet-frontend
```

## Install dependencies:

```bash
bun install
```

Create a .env file in the root directory with the following variables:

```
REACT_APP_API_URL=http://localhost:5000/api/v1
```

Start the development server:

```
bun run dev
```

The app should now be running at http://localhost:5137.

## Project Structure

```
src/
├─ components/          # Reusable UI components (Card, Button, Input, Table, Dialog)
├─ pages/               # Application pages
├─ redux/               # Redux slices and RTK Query API
│  ├─ features/
│  │  ├─ admin/
│  │  ├─ user/
│  ... ...
├─ styles/              # Global Tailwind CSS styles
├─ App.tsx              # Main app component
├─ main.tsx             # Entry point
...
```

## Components

- **Card:** Container for content

- **Table:** Display users in tabular format

- **Dialog:** Modal for editing user information

- **AlertDialog:** Confirmation dialog for deletions

- **DropdownMenu:** Select options like user roles

- **Input:** Text fields for forms

- **Button:** Reusable button with multiple variants

## Usage

- **Manage Users:** Navigate to the users page to view all registered users.

- **Search Users:** Use the search input to filter users by name, email, or phone.

- **Edit User:** Click the Edit button on a user row to open the edit dialog. Update the name, username, or role and click Save changes.

- **Delete User:** Click the Delete button on a user row. Confirm the action in the alert dialog.


## Contact
For any questions or suggestions, feel free to open an issue or contact the maintainer:

Name: Romjan Ali

Email: 000romjanali@gmail.com