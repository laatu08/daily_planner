# Daily Planner

A beautiful, interactive web-based daily planner that helps you organize your day from 6 AM to 2 AM. Plan your schedule, set priorities, manage tasks, and email yourself a snapshot of your planner.

## Features

- **Hourly Schedule**: Plan your day hour-by-hour from 6 AM to 2 AM (20 hours)
- **Personal Information**: Add your name, email, and date
- **Task Management**:
  - Priorities section for your most important tasks
  - To-Do list for tracking tasks
  - Notes section for additional information
- **Quote of the Day**: Automatically fetches an inspirational quote using API Ninjas
- **Auto-Save**: All data is automatically saved to browser's localStorage
- **Email Integration**: Send your completed planner as a PNG image via email
- **Clear Function**: Reset all fields with a single click
- **Responsive Design**: Works on desktop and mobile devices
- **Beautiful UI**: Custom background with frosted glass effect

## Technologies Used

### Frontend
- **HTML5**: Structure and semantic markup
- **CSS3**: Styling with backdrop filters and responsive design
- **Vanilla JavaScript**: Core functionality and DOM manipulation
- **html2canvas**: Convert planner to image for email
- **jsPDF**: PDF generation library (loaded)
- **EmailJS**: Email delivery service
- **API Ninjas**: Quote of the Day API

### Backend (Upload Server)
- **Node.js**: Runtime environment
- **Express.js**: Web server framework
- **Multer**: File upload handling
- **Cloudinary**: Cloud-based image storage and delivery
- **CORS**: Cross-Origin Resource Sharing support
- **Streamifier**: Stream conversion utility
- **dotenv**: Environment variable management

## Project Structure

```
daily-planner/
├── index.html              # Main HTML file
├── style.css               # Styling and responsive design
├── script.js               # Frontend JavaScript logic
├── config.js               # Configuration file (API keys - not in repo)
├── assets/                 # Images and static files
│   ├── pexels-eva-bronzini-5941766.jpg
│   ├── planner-template.png
│   └── OIP.jpeg
├── upload-server/          # Backend server for image uploads
│   ├── server.js           # Express server with Cloudinary integration
│   ├── package.json        # Server dependencies
│   └── .env                # Environment variables (not in repo)
└── README.md               # This file
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Web browser (Chrome, Firefox, Safari, Edge)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd daily-planner
```

### 2. Configure Frontend API Keys

Create a `config.js` file in the root directory:

```javascript
window.ENV = {
  // EmailJS Configuration
  EMAILJS_PUBLIC_KEY: "your_emailjs_public_key",
  EMAILJS_SERVICE_ID: "your_emailjs_service_id",
  EMAILJS_TEMPLATE_ID: "your_emailjs_template_id",

  // API Ninjas Quote API
  QUOTE_API_KEY: "your_api_ninjas_key"
};
```

#### Getting API Keys:

**EmailJS Setup:**
1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Create a new email service
4. Create an email template with these variables:
   - `{{to_email}}`: Recipient email
   - `{{user_name}}`: User's name
   - `{{planner_date}}`: Planner date
   - `{{image_url}}`: URL to planner image
   - `{{company_email}}`: Company email
5. Copy your Public Key, Service ID, and Template ID

**API Ninjas Setup:**
1. Go to [API Ninjas](https://api-ninjas.com/)
2. Sign up for a free account
3. Navigate to your dashboard and copy your API key

### 3. Configure Backend (Upload Server)

Navigate to the upload server directory:
```bash
cd upload-server
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the `upload-server` directory:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=3000
```

#### Getting Cloudinary Credentials:
1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for a free account
3. Navigate to your dashboard
4. Copy your Cloud Name, API Key, and API Secret

### 4. Run the Application

**Start the Upload Server:**
```bash
cd upload-server
npm start
```
The server will run on `http://localhost:3000`

**Start the Frontend:**

You can use any local development server. Options include:

**Using Live Server (VS Code Extension):**
1. Install the Live Server extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js http-server:**
```bash
npx http-server -p 8000
```

Access the application at `http://localhost:8000` (or your chosen port)

## Usage Guide

### Creating Your Daily Plan

1. **Enter Personal Information**:
   - Fill in your name
   - Enter your email address
   - Select the date

2. **Schedule Your Day**:
   - Click on any time slot in the schedule table
   - Type your planned activity or task
   - Tasks are editable inline

3. **Add Details**:
   - **Quote of the Day**: Automatically populated, or add your own
   - **Priorities**: List your top priorities for the day
   - **To Do**: Add tasks that need to be completed
   - **Notes**: Any additional information or reminders

4. **Auto-Save**:
   - All data is automatically saved to your browser's localStorage
   - Your planner persists even if you close the browser

5. **Send via Email**:
   - Click "Send Planner via Email"
   - The planner is converted to an image
   - Uploaded to Cloudinary
   - Sent to your email address via EmailJS

6. **Clear All**:
   - Click "Clear All Fields" to reset the planner
   - Confirmation prompt prevents accidental clearing

## API Integration Details

### EmailJS Integration
- **Purpose**: Send planner image via email
- **Endpoint**: EmailJS API
- **Method**: `emailjs.send()`
- **Template Variables**: to_email, user_name, planner_date, image_url, company_email

### Quote API (API Ninjas)
- **Purpose**: Fetch inspirational quotes
- **Endpoint**: `https://api.api-ninjas.com/v2/quotes`
- **Category**: Inspirational
- **Method**: GET
- **Headers**: `X-Api-Key`

### Cloudinary Upload
- **Purpose**: Host planner images for email delivery
- **Endpoint**: `/upload`
- **Method**: POST
- **Format**: PNG image
- **Folder**: `daily_planner`

## Dependencies

### Frontend Dependencies (CDN)
```html
<!-- HTML to Canvas conversion -->
<script src="https://cdn.jsdelivr.net/npm/html2canvas"></script>

<!-- PDF generation -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

<!-- Email sending -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
```

### Backend Dependencies
```json
{
  "cloudinary": "^2.8.0",
  "cors": "^2.8.5",
  "dotenv": "^17.2.3",
  "express": "^5.1.0",
  "multer": "^2.0.2",
  "streamifier": "^0.1.1"
}
```

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

**Note**: Some features like `backdrop-filter` may not work in older browsers.

## Responsive Design

The planner is fully responsive and adapts to different screen sizes:

- **Desktop**: Full two-column layout (schedule + details)
- **Tablet**: Stacked layout with optimized spacing
- **Mobile**: Single column layout with adjusted font sizes

### Breakpoints:
- `768px`: Tablet layout
- `480px`: Mobile layout

## Features Breakdown

### Auto-Save Functionality
All form fields are automatically saved to localStorage:
- Name, Email, Date
- Priorities, To-Do, Notes, Quote
- Schedule entries persist across browser sessions

### Image Generation Process
1. Clone planner DOM element
2. Replace textareas with styled divs
3. Convert to canvas using html2canvas
4. Convert canvas to PNG blob
5. Upload to Cloudinary via Express server
6. Return secure URL for email attachment

### Email Template
The email includes:
- User's name and selected date
- Embedded planner image
- Company support email

## Troubleshooting

### Email Not Sending
- Check EmailJS configuration in `config.js`
- Verify service ID and template ID are correct
- Check browser console for errors
- Ensure upload server is running

### Upload Server Errors
- Verify Cloudinary credentials in `.env`
- Check if port 3000 is available
- Ensure all dependencies are installed
- Check server logs for specific errors

### Quote Not Loading
- Verify API Ninjas key in `config.js`
- Check network tab for API request errors
- Ensure API quota is not exceeded

### Data Not Persisting
- Check browser's localStorage is enabled
- Clear localStorage if data is corrupted
- Try in a different browser

### CORS Errors
- Ensure upload server is running
- Check CORS configuration in server.js
- Verify frontend is making requests to correct port

## Security Considerations

⚠️ **Important Security Notes:**

1. **Never commit API keys**:
   - `config.js` should be in `.gitignore`
   - `.env` files should never be committed

2. **Environment Variables**:
   - Store all sensitive data in environment variables
   - Use different keys for development and production

3. **API Key Exposure**:
   - Frontend API keys are exposed in browser
   - Use EmailJS and API Ninjas free tiers with domain restrictions
   - For production, implement backend proxy for sensitive API calls

4. **Cloudinary Security**:
   - Use signed uploads in production
   - Implement folder organization and access controls
   - Set up automatic deletion for old uploads

## File Descriptions

### `index.html`
Main HTML structure containing:
- Form inputs for name, email, date
- Schedule table with hourly time slots
- Textareas for priorities, to-do, notes, quote
- Action buttons for sending and clearing
- Loading overlay and toast notifications

### `style.css`
Styling including:
- Frosted glass effect with backdrop-filter
- Responsive layout with flexbox
- Custom table styling
- Button styles and hover effects
- Loading spinner and toast animations
- Mobile breakpoints

### `script.js`
Core JavaScript functionality:
- EmailJS initialization
- Form field auto-save to localStorage
- Quote API integration
- HTML to canvas conversion
- Cloudinary upload handling
- Email sending logic
- Clear functionality
- Loading states and toast messages

### `upload-server/server.js`
Express backend server:
- Multer configuration for file uploads
- Cloudinary integration
- CORS middleware
- Stream handling for image uploads
- Error handling

## Performance Optimizations

- **localStorage**: Instant data persistence without backend calls
- **CDN Assets**: Fast loading of external libraries
- **Image Optimization**: PNG compression via Cloudinary
- **Lazy Loading**: Quote only fetched once
- **Minimal Dependencies**: Lightweight frontend

## Future Enhancements

Potential features for future versions:
- PDF export option
- Multiple planner templates
- Calendar view for multiple days
- Recurring tasks
- User authentication with Supabase
- Cloud sync across devices
- Mobile app version
- Dark mode toggle
- Print stylesheet
- Task completion tracking
- Time tracking per task
- Analytics and insights

## License

This project is provided as-is for personal and educational use.

## Support

For issues, questions, or contributions:
- Open an issue on the repository
- Contact: support@dailyplanner.com

## Credits

- Background Image: [Pexels - Eva Bronzini](https://www.pexels.com/)
- Icons: Standard HTML/CSS
- Fonts: Poppins (Google Fonts)

---

**Made with ❤️ for productive planning**
