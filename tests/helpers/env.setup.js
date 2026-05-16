process.env.JWT_SECRET = 'test-secret-key-for-jest'
process.env.NODE_ENV = 'test'
process.env.PORT = '5001'

// OAuth stubs — strategies throw without these, even in test mode
process.env.GOOGLE_CLIENT_ID = 'test-google-client-id'
process.env.GOOGLE_SECRET_ID = 'test-google-secret'
process.env.GOOGLE_CALLBACK_URL = 'http://localhost:5001/auth/google/callback'

process.env.FACEBOOK_CLIENT_ID = 'test-facebook-client-id'
process.env.FACEBOOK_SECRET_ID = 'test-facebook-secret'
process.env.FACEBOOK_CALLBACK_URL = 'http://localhost:5001/auth/facebook/callback'

process.env.TWITTER_CLIENT_ID = 'test-twitter-client-id'
process.env.TWITTER_SECRET_ID = 'test-twitter-secret'
process.env.TWITTER_CALLBACK_URL = 'http://localhost:5001/auth/twitter/callback'

process.env.FRONTEND_URL = 'http://localhost:5173'
process.env.ALLOWED_ORIGINS = 'http://localhost:5173'
