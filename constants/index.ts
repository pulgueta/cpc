export const CREATE_USER = {
  email: {
    invalid_type_error: "El correo electrónico debe ser texto válido",
    required_error: "El correo electrónico es obligatorio",
    minLength: {
      value: 4,
      message: "El correo electrónico debe tener al menos 4 caracteres",
    },
    maxLength: {
      value: 64,
      message: "El correo electrónico debe tener como máximo 64 caracteres",
    },
    email: "Debes proporcionar un correo electrónico válido",
  },
  password: {
    invalid_type_error: "La contraseña debe ser texto válido",
    required_error: "La contraseña es obligatoria",
    minLength: {
      value: 4,
      message: "La contraseña debe tener al menos 4 caracteres",
    },
    maxLength: {
      value: 32,
      message: "La contraseña debe tener como máximo 32 caracteres",
    },
  },
  confirmPassword: {
    invalid_type_error: "La confirmación de la contraseña debe ser texto válido",
    required_error: "La confirmación de la contraseña es obligatoria",
    message: "Las contraseñas no coinciden",
  },
  name: {
    invalid_type_error: "Tu nombre completo debe ser texto válido",
    required_error: "Tu nombre completo es obligatorio",
    minLength: {
      value: 8,
      message: "Tu nombre completo debe tener al menos 8 caracteres",
    },
    maxLength: {
      value: 128,
      message: "Tu nombre completo debe tener como máximo 128 caracteres",
    },
  },
} as const;

export const authRoutes = ["/login", "/register", "/verify", "forgot-password"];

export const appHeaderKeys = {
  geo: "x-geo",
  ip: "x-ip",
  url: "x-url",
} as const;
