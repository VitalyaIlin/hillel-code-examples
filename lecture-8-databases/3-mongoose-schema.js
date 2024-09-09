import mongoose from 'mongoose';
import 'dotenv/config'

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  runOperationsInOrder();
}).catch(err => console.error('Could not connect to MongoDB', err));

// Define the Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: Number
});

// Create a Model
const User = mongoose.model('User', userSchema);

// Create a new document (record) to trigger the creation of the collection
const newUser = new User({
  name: 'John Doe',
  email: 'john.doe@example.com',
  age: 30
});

async function runOperationsInOrder() {
    try {
      const newDoc = await newUser.save();
      console.log('newUser', newDoc);
      // 1. Read a user by email
      const user = await User.findOne({ email: 'john.doe@example.com' });
      if (user) {
        console.log('User found:', user);
      } else {
        console.log('No user found with this email');
        return; // Exit if user not found
      }
  
      // 2. Update the user's age
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $set: { age: 35 } },
        { new: true }  // Return the updated document
      );
      if (updatedUser) {
        console.log('User updated:', updatedUser);
      } else {
        console.log('Failed to update user');
        return; // Exit if update failed
      }
  
      // 3. Delete the user by ID
      const deletedUser = await User.findByIdAndDelete(updatedUser._id);
      if (deletedUser) {
        console.log('User deleted:', deletedUser);
      } else {
        console.log('Failed to delete user');
      }
    } catch (err) {
      console.error('Error during operations:', err);
    } finally {
      // Close the MongoDB connection when done
      mongoose.connection.close();
    }
  }
