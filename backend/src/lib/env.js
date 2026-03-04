import "dotenv/config";

export const ENV = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM,
  EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
  CLIENT_URL: process.env.CLIENT_URL
};

// PORT = 3000
// MONGO_URI=mongodb+srv://abhiramkarapuri_db_user:3cTMA7o00qWF2Jwq@cluster0.udecpoo.mongodb.net/messengerX_db?appName=Cluster0
// NODE_ENV=development
// JWT_SECRET=your_jwt_secret_key

// RESEND_API_KEY=re_cvJNvLFi_QKFnZnPKrR2rESShrk4ey1Mm

// EMAIL_FROM="onboarding@resend.dev"
// EMAIL_FROM_NAME="Abhiram"

// CLIENT_URL=http://localhost:5173