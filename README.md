# Vehicle Maintenance Tracker

A comprehensive web application for tracking maintenance, parts, and shops for your vehicles - perfect for cars, motorcycles, boats, and other DIY/hobby vehicles.

## Features

- 🚗 **Vehicle Management** - Track all your vehicles with details like make, model, year, VIN, odometer
- 🔧 **Maintenance Records** - Log services, repairs, oil changes, and track costs
- 📦 **Parts Inventory** - Manage parts, quantities, costs, and locations
- 🏪 **Shop Directory** - Keep track of preferred mechanics and service shops
- 📊 **Dashboard** - Overview with statistics and upcoming maintenance
- 💰 **Cost Tracking** - Monitor spending across all maintenance activities
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Icons**: Heroicons

## Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd vehicle-maintenance
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## Data Models

The application includes the following main entities:

### Vehicle
- Basic info (make, model, year, type)
- VIN, license plate, color
- Odometer reading
- Purchase/sale dates

### Maintenance Records
- Service type (oil change, repair, inspection, etc.)
- Date and odometer
- Costs and labor hours
- Associated shop and parts used

### Parts Inventory
- Part details (name, number, manufacturer)
- Quantity and minimum stock alerts
- Cost tracking
- Location and vehicle assignment

### Shops
- Contact information
- Specialties and notes
- Service history

## Usage Guide

### 1. Add Your First Vehicle
1. Navigate to the **Vehicles** page
2. Click **"Add Vehicle"**
3. Fill in the vehicle details
4. Save to start tracking

### 2. Log Maintenance
1. Go to **Maintenance** page
2. Click **"Add Service"**
3. Select the vehicle and service type
4. Add details like date, cost, and notes
5. Save to create the record

### 3. Manage Parts Inventory
1. Visit the **Parts** page
2. Click **"Add Part"**
3. Enter part details and quantity
4. Assign to a vehicle or keep as general inventory
5. Set minimum stock for alerts

### 4. Track Shops
1. Go to **Shops** page
2. Click **"Add Shop"**
3. Enter shop details and specialties
4. Keep track of preferred service providers

## Project Structure

```
vehicle-maintenance/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── api/            # API routes
│   │   ├── vehicles/       # Vehicles page
│   │   ├── maintenance/    # Maintenance page
│   │   ├── parts/          # Parts page
│   │   └── shops/          # Shops page
│   ├── components/         # Reusable components
│   └── lib/               # Utilities (Prisma client)
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── dev.db            # SQLite database
└── public/               # Static assets
```

## Database Schema

The application uses a comprehensive schema with the following relationships:

- **Vehicles** have many maintenance records, parts, projects, and notes
- **Maintenance Records** belong to vehicles and can have associated shops, parts, notes, and documents
- **Parts** can be associated with vehicles or kept as general inventory
- **Shops** have many maintenance records
- **Projects** belong to vehicles for tracking larger tasks

## Development

### Adding New Features

1. **Update the Prisma schema** if you need new data models
2. **Generate and migrate** the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
3. **Create API routes** in `src/app/api/`
4. **Build UI components** and pages
5. **Test** your changes

### Database Management

```bash
# View database
npx prisma studio

# Reset database
npx prisma migrate reset

# Deploy migrations
npx prisma migrate deploy
```

## Future Enhancements

- 📸 Photo/document upload for maintenance records
- 🔍 Advanced search and filtering
- 📈 Maintenance scheduling and reminders
- 📊 Reports and analytics
- 👥 Multi-user support with authentication
- 📱 Mobile app
- 🔔 Email notifications for upcoming maintenance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

If you run into any issues or have questions:

1. Check the [documentation](#usage-guide)
2. Review the [project structure](#project-structure)
3. Open an issue with details about your problem

---

Happy maintaining! 🎉