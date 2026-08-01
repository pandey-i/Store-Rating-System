import {
  registerUser,
  loginUser,
  getProfileService,
  changeUserPassword,
} from "../services/auth.service.js";

import {
  successResponse,
  errorResponse,
} from "../utils/apiResponse.js";

// Register
export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    return successResponse(
      res,
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      "User registered successfully",
      201
    );
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { token, user } = await loginUser(email, password);

    return successResponse(
      res,
      {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      "Login successful"
    );
  } catch (error) {
    return errorResponse(res, error.message, 401);
  }
};

// Profile
export const getProfile = async (req, res) => {
  try {
    const user = await getProfileService(req.user.id);

    return successResponse(
      res,
      user,
      "Profile fetched successfully"
    );
  } catch (error) {
    return errorResponse(res, error.message, 404);
  }
};

// Change Password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    await changeUserPassword(
      req.user.id,
      currentPassword,
      newPassword
    );

    return successResponse(
      res,
      null,
      "Password updated successfully"
    );
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};