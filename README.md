<!-- @format -->

# AutoBizz Sales Dashboard

A modern, full-featured sales analytics dashboard built with Next.js 16, featuring real-time data filtering, interactive charts, and comprehensive sales tracking capabilities.

## 🚀 Features

### Core Functionality

- **Real-time Sales Analytics** - Track and visualize sales data with interactive charts
- **Advanced Filtering System** - Filter sales by date range, price, customer email, and phone
- **Data Visualization** - Dynamic charts powered by Recharts showing daily sales totals
- **Sortable Tables** - Sort sales data by date or price in ascending/descending order
- **Pagination Support** - Navigate through large datasets efficiently
- **Responsive Design** - Mobile-first design that works on all screen sizes

### Technical Highlights

- **State Management** - Redux Toolkit for predictable state management
- **Modern UI Components** - Radix UI primitives with custom styling
- **Type Safety** - Full TypeScript implementation
- **Performance Optimized** - Next.js 16 with React 19 for optimal performance
- **Styling** - Tailwind CSS 4 with custom theme configuration

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** - Version 20.x or higher
- **npm** - Version 10.x or higher (comes with Node.js)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Rahul-Mallik-CSE/AutoBizz-Task.git
   cd autobizz-task
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables** (if needed)
   - Create a `.env.local` file in the root directory
   - Add any required API endpoints or configuration

## 🚀 Getting Started

### Development Server

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The page auto-updates as you edit files. Start by modifying `src/app/page.tsx`.

### Build for Production

```bash
npm run build
```

### Run Production Server

```bash
npm start
```

### Linting

```bash
npm run lint
```

## 📁 Project Structure

```
autobizz-task/
├── src/
│   ├── app/                      # Next.js app directory
│   │   ├── page.tsx             # Main dashboard page
│   │   ├── layout.tsx           # Root layout
│   │   └── globals.css          # Global styles
│   ├── components/              # React components
│   │   ├── AllComponents/       # Dashboard-specific components
│   │   │   ├── DashboardSidebar.tsx
│   │   │   ├── NabBar.tsx
│   │   │   ├── sales-chart.tsx
│   │   │   ├── sales-table.tsx
│   │   │   └── filters/         # Filter components
│   │   │       ├── date-range-filter.tsx
│   │   │       └── other-filters.tsx
│   │   └── ui/                  # Reusable UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── table.tsx
│   │       └── ...
│   ├── redux/                   # State management
│   │   ├── store.ts            # Redux store configuration
│   │   ├── hooks.ts            # Typed Redux hooks
│   │   ├── provider.tsx        # Redux provider wrapper
│   │   └── slices/             # Redux slices
│   │       ├── authSlice.ts    # Authentication state
│   │       ├── salesSlice.ts   # Sales data state
│   │       └── filtersSlice.ts # Filter state
│   ├── hooks/                  # Custom React hooks
│   │   └── use-mobile.ts
│   └── lib/                    # Utility functions
│       └── utils.ts
├── public/                     # Static assets
├── package.json               # Project dependencies
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── next.config.ts           # Next.js configuration
```

## 🎯 Key Components

### Dashboard (`src/app/page.tsx`)

The main dashboard page that orchestrates all components and manages data flow.

### Sales Chart (`src/components/AllComponents/sales-chart.tsx`)

Interactive chart component displaying daily sales totals using Recharts.

### Sales Table (`src/components/AllComponents/sales-table.tsx`)

Paginated table showing detailed sales records with sorting capabilities.

### Filter Components

- **Date Range Filter** - Select start and end dates for sales data
- **Other Filters** - Filter by price, email, phone with sorting options

### Redux Slices

- **authSlice** - Manages authentication token and authorization
- **salesSlice** - Handles sales data fetching and state management
- **filtersSlice** - Manages all filter states and user preferences

## 🔧 Technologies Used

### Core

- **Next.js 16.0.6** - React framework for production
- **React 19.2.0** - UI library
- **TypeScript 5** - Type-safe JavaScript

### State Management

- **Redux Toolkit 2.11.0** - State management
- **React Redux 9.2.0** - React bindings for Redux

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Icon library
- **Recharts 3.5.1** - Charting library

### Utilities

- **class-variance-authority** - Component variant handling
- **clsx** - Conditional classNames utility
- **tailwind-merge** - Merge Tailwind classes efficiently

## 📊 Features in Detail

### Filtering System

- **Date Range**: Filter sales between specific dates
- **Price Filter**: Set minimum price threshold
- **Customer Filter**: Search by email or phone number
- **Sorting**: Sort by date or price in ascending/descending order

### Data Visualization

- Interactive line chart showing daily sales trends
- Responsive design that adapts to screen size
- Tooltip on hover showing exact values

### Table Features

- Pagination with before/after navigation
- Sortable columns
- Responsive design for mobile devices
- Real-time updates based on filter changes

## 🚢 Deployment

### Deploy on Vercel

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure environment variables (if any)
4. Deploy!

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more deployment options.

## 📝 Environment Variables

Create a `.env.local` file with the following variables (if needed):

```env
# Add your environment variables here
# NEXT_PUBLIC_API_URL=your_api_url
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👤 Author

**Rahul Mallik**

- GitHub: [@Rahul-Mallik-CSE](https://github.com/Rahul-Mallik-CSE)

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Recharts](https://recharts.org/)

---

**Note**: This project was created as part of the AutoBizz assessment task.
