const passportStrategy = require('passport');
const UserSchema = require('../models/user');

passportStrategy.use(UserSchema.createStrategy()); // Uses passport-local-mongoose to authenticate with username and password

passportStrategy.serializeUser(UserSchema.serializeUser()); // Serialize user into session
passportStrategy.deserializeUser(UserSchema.deserializeUser()); // Deserialize user from session
