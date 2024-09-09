import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(process.env.MONGO_DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define a schema for an order
const orderSchema = new mongoose.Schema({
  customerId: mongoose.Types.ObjectId,
  amount: Number,
  date: { type: Date, default: Date.now }
});

// Create a model from the schema
const Order = mongoose.model('Order', orderSchema);

// Function to create 10 sample orders
async function createSampleOrders() {
  try {
    // Sample customer IDs
    const customerIds = [
      new mongoose.Types.ObjectId(),
      new mongoose.Types.ObjectId(),
      new mongoose.Types.ObjectId()
    ];

    // Create 10 sample orders
    const orders = [
      { customerId: customerIds[0], amount: 100 },
      { customerId: customerIds[0], amount: 150 },
      { customerId: customerIds[1], amount: 200 },
      { customerId: customerIds[1], amount: 50 },
      { customerId: customerIds[1], amount: 300 },
      { customerId: customerIds[2], amount: 400 },
      { customerId: customerIds[2], amount: 120 },
      { customerId: customerIds[2], amount: 80 },
      { customerId: customerIds[0], amount: 90 },
      { customerId: customerIds[2], amount: 130 }
    ];

    // Insert the orders into the database
    await Order.insertMany(orders);
    console.log('Sample orders created successfully');
  } catch (err) {
    console.error('Error creating sample orders:', err);
  }
}

// Function to aggregate total sales by customer
async function getTotalSaleByCustomer() {
  try {
    const result = await Order.aggregate([
      // Group by customerId and sum the amount for each customer
      {
        $group: {
          _id: '$customerId',
          totalSales: { $sum: '$amount' }
        }
      },
      // Sort the results by totalSales in descending order
      {
        $sort: { totalSales: -1 }
      }
    ]);

    console.log('Total sales by customer:', result);
  } catch (err) {
    console.error('Error during aggregation:', err);
  }
}

async function getAverageSalesByCustomer() {
    try {
      const result = await Order.aggregate([
        // Group by customerId and calculate the average amount for each customer
        {
          $group: {
            _id: '$customerId',
            averageSale: { $avg: '$amount' }  // Calculate average of the amount
          }
        },
        // Sort the results by averageSale in descending order
        {
          $sort: { averageSale: -1 }
        }
      ]);
  
      console.log('Average sales by customer:', result);
    } catch (err) {
      console.error('Error during aggregation:', err);
    }
  }

async function filterOrdersByAmount() {
    try {
        const result = await Order.aggregate([
        // Step 1: Filter orders where amount is greater than 200
        {
            $match: { amount: { $gt: 200 } }
        },
        // Step 2: Group by customerId and sum the amount for each customer
        {
            $group: {
            _id: '$customerId',
            totalSales: { $sum: '$amount' }
            }
        },
        // Step 3: Sort the results by total sales in descending order
        {
            $sort: { totalSales: -1 }
        }
        ]);

        console.log('Total sales for orders above $200:', result);
    } catch (err) {
        console.error('Error during aggregation:', err);
    }
}

async function mostRecentOrderByCustomer() {
    try {
      const result = await Order.aggregate([
        // Group by customerId and find the latest order date
        {
          $group: {
            _id: '$customerId',
            latestOrder: { $max: '$date' }  // Find the maximum date
          }
        },
        // Sort the results by the most recent order date in descending order
        {
          $sort: { latestOrder: -1 }
        }
      ]);
  
      console.log('Most recent order by customer:', result);
    } catch (err) {
      console.error('Error during aggregation:', err);
    }
  }
  

async function main() {
  await createSampleOrders();  // Create the sample orders
  await getTotalSaleByCustomer();
  await getAverageSalesByCustomer();  
  await filterOrdersByAmount();
  await mostRecentOrderByCustomer();
  mongoose.connection.close();  // Close the database connection
}

main();
