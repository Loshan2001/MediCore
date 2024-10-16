
const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Controller for user authentication
const userAuthController = {
  // Signup function
  signup: async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
     
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }


      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

  
      user = new User({
        fullName,
        email,
        password: hashedPassword,
      });

      await user.save();

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(201).json({
        msg: 'User registered successfully',
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  },

  // Placeholder for login function
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

     
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
     
      // Respond with token
      res.status(200).json({ token , userType : user.userType , username : user.fullName , userId : user._id});
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  },

  getProfile: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId).select('-password');
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Profile Error:', error);
      res.status(500).json({ msg: 'Server error '+error });
    }
  },
  updateUser : async (req, res) => {
    const { userId } = req.params;
    const { fullName, email, address, phoneNo } = req.body;
  
    try {
      // Find the user by ID and update their information
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          fullName,
          email,
          address,
          phoneNo,
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      // Fetch all users while excluding the password field.
      const users = await User.find().select('-password');
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error); // Log the error for debugging.
      res.status(500).json({ message: 'Error fetching users', error });
    }
  },
  
  getUser : async (req, res) => {
    try {
      const id = req.params.id; 
      const users = await User.findById({_id : id})
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  },


};



module.exports = userAuthController; 
