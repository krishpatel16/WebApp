# Smart Home System WebApp

This project is a Smart Home System web application built with Next.js and React. It allows users to manage rooms, devices, schedules, notifications, and view device usage history. The app integrates with AWS Lambda and DynamoDB for backend operations and supports role-based access (Admin, Family, Guest).

## File Structure

```
WebApp/
│
├── amplify/                  # AWS Amplify and Lambda integration
│   ├── config.js             # Amplify configuration
│   └── lambda-device-usage-logs-fixed.js # Lambda function for device usage logs
│
├── components/               # Reusable React components
│   ├── AddDeviceButton.js
│   ├── AddModal.js
│   ├── AddRoomButton.js
│   ├── BillEstimation.js
│   ├── DateFilter.js
│   ├── DeleteLogsConfirmationModal.js
│   ├── DeleteRoomButton.js
│   ├── DeviceItem.js
│   ├── DeviceList.js
│   ├── GuestNoAccessModal.js
│   ├── Hamburger.js
│   ├── Layout.js
│   ├── PowerConsumptionChart.js
│   ├── ScheduleModal.js
│   ├── SelectRoom.js
│   ├── Sidebar.js
│   └── UsageHistoryTable.js
│
├── pages/                    # Next.js pages (routes)
│   ├── _app.js               # App wrapper
│   ├── _document.js          # Custom document
│   ├── chart.js              # Usage charts page
│   ├── home.js               # Main dashboard/home page
│   ├── index.js              # Login page
│   ├── notifications.js      # Notifications page
│   └── api/                  # API routes (serverless functions)
│       └── schedule-device.js
│
├── styles/                   # CSS files
│   └── global.css            # Main global styles
│
├── package.json              # Project dependencies and scripts
├── README.md                 # Project documentation (this file)
└── ...                       # Other config and support files
```

### Prerequisites
- Node.js (v18 or later recommended)
- npm (v9 or later recommended)

### Installation

1. **Clone the repository:**
   ```sh
   git clone
   cd WebApp
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment/configuration:**
   - Ensure your AWS Amplify and Lambda endpoints are correctly set in `amplify/config.js` and any API URLs in the code.
   - Update any environment variables or API keys as needed.

4. **Run the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

5. **Build for production:**
   ```sh
   npm run build
   npm start
   ```

## Usage
- Visit the login page (`/`) to select a role and log in.
- Use the dashboard to add rooms, devices, and schedules.
- View device usage charts and manage notifications.
- Admins have access to additional settings.

## Notes
- The app uses localStorage for some client-side state (e.g., login activities).
- AWS Lambda endpoints are used for persistent backend operations (e.g., logging device usage, scheduling).
- For full functionality, ensure AWS backend is deployed and accessible.
