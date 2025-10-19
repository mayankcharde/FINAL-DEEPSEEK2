// import genToken from "../config/token.js";
// import User from "../models/auth.model.js";
// import bcrypt from "bcryptjs";

// export const signUp = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const existEmail = await User.findOne({ email });
//     if (existEmail) {
//       return res.status(400).json({ message: "email already exists !" });
//     }
//     if (password.length < 6) {
//       return res
//         .status(400)
//         .json({ message: "password must be at least 6 characters !" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       password: hashedPassword,
//       email,
//     });

//     const token = await genToken(user._id);

//     res.cookie("token", token, {
//       httpOnly: true,
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//       sameSite: "strict",
//       secure: false,
//     });

//     return res.status(201).json(user);
//   } catch (error) {
//     return res.status(500).json({ message: `sign up error ${error}` });
//   }
// };

// export const Login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "email does not exists !" });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: "incorrect password" });
//     }

//     const token = await genToken(user._id);

//     res.cookie("token", token, {
//       httpOnly: true,
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//       sameSite: "strict",
//       secure: false,
//     });

//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(500).json({ message: `login error ${error}` });
//   }
// };

// export const logOut = async (req, res) => {
//   try {
//     res.clearCookie("token");
//     return res.status(200).json({ message: "log out successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: `logout error ${error}` });
//   }
// };

// export const getCurrentUser = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const user = await User.findById(userId).select("-password");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(500).json({ message: `Error fetching user: ${error}` });
//   }
// };


import genToken from "../config/token.js";
import User from "../models/user.model.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, profilePhoto } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Create user (password will be hashed by pre-save middleware)
    const user = await User.create({ name, email, password, profilePhoto });

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    });

    // Remove password from response
    const userResponse = { ...user.toObject() };
    delete userResponse.password;

    return res.status(201).json({ user: userResponse, token });
  } catch (error) {
    return res.status(500).json({ message: `Sign up error: ${error.message}` });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    });

    // Remove password from response
    const userResponse = { ...user.toObject() };
    delete userResponse.password;

    return res.status(200).json({ user: userResponse, token });
  } catch (error) {
    return res.status(500).json({ message: `Login error: ${error.message}` });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Logout error: ${error.message}` });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: `Error fetching user: ${error.message}` });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, profilePhoto } = req.body;
    const userId = req.user._id;

    // Validation
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Check if email is already taken by another user
    const existingUser = await User.findOne({ email, _id: { $ne: userId } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, profilePhoto },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: `Error updating profile: ${error.message}` });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const deletedUser = await User.findByIdAndDelete(userId);
    
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    });

    return res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Error deleting profile: ${error.message}` });
  }
};
        