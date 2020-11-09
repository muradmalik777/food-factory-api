const codes = {
  20: {
    code: 20,
    message: "Invalid email or Password",
  },
  21: {
    code: 21,
    message: "Unauthorized action",
  },
  22: {
    code: 22,
    message: "Session expired!",
  },
  23: {
    code: 23,
    message: "User not found",
  },
  24: {
    code: 24,
    message: "Missing required fields",
  },
  25: {
    code: 25,
    message: "Invalid token",
  },
  26: {
    code: 26,
    message: "Token missing!",
  },
};

exports.generateError = (code) => {
  return codes[code];
};
