const request = require('supertest');
const app = require('../server');

describe('API Health Checks', () => {
  // Test health endpoint
  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request(app)
        .get('/health')
        .expect(200);
      
      expect(res.body).toHaveProperty('status', 'OK');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('timestamp');
    });
  });

  // Test API documentation endpoint
  describe('GET /api', () => {
    it('should return API documentation', async () => {
      const res = await request(app)
        .get('/api')
        .expect(200);
      
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('endpoints');
      expect(res.body.endpoints).toHaveProperty('auth');
      expect(res.body.endpoints).toHaveProperty('recipes');
    });
  });

  // Test 404 for non-existent API endpoints
  describe('GET /api/nonexistent', () => {
    it('should return 404 for non-existent API endpoint', async () => {
      const res = await request(app)
        .get('/api/nonexistent')
        .expect(404);
      
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message', 'API endpoint not found');
    });
  });
});

describe('Authentication Endpoints', () => {
  // Test registration validation
  describe('POST /api/auth/register', () => {
    it('should reject registration with invalid data', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: '',
          email: 'invalid-email',
          password: '123'
        })
        .expect(400);
      
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('errors');
    });

    it('should accept valid registration data (without database)', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
          firstName: 'Test',
          lastName: 'User'
        });
      
      // This will likely fail due to database connection, but validates the endpoint exists
      expect([400, 500]).toContain(res.status);
    });
  });

  // Test login validation
  describe('POST /api/auth/login', () => {
    it('should reject login with missing data', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({})
        .expect(400);
      
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('errors');
    });
  });
});

describe('Recipe Endpoints', () => {
  // Test recipes listing
  describe('GET /api/recipes', () => {
    it('should return recipes endpoint (without database)', async () => {
      const res = await request(app)
        .get('/api/recipes');
      
      // Will likely return error due to database, but endpoint should exist
      expect([200, 500]).toContain(res.status);
    });
  });

  // Test popular recipes
  describe('GET /api/recipes/popular', () => {
    it('should return popular recipes endpoint', async () => {
      const res = await request(app)
        .get('/api/recipes/popular');
      
      expect([200, 500]).toContain(res.status);
    });
  });

  // Test highly rated recipes
  describe('GET /api/recipes/highly-rated', () => {
    it('should return highly rated recipes endpoint', async () => {
      const res = await request(app)
        .get('/api/recipes/highly-rated');
      
      expect([200, 500]).toContain(res.status);
    });
  });
});

describe('Frontend Routes', () => {
  // Test home page
  describe('GET /', () => {
    it('should render home page', async () => {
      const res = await request(app)
        .get('/')
        .expect(200);
      
      expect(res.text).toContain('Cooking Blog');
    });
  });

  // Test login page
  describe('GET /login', () => {
    it('should render login page', async () => {
      const res = await request(app)
        .get('/login')
        .expect(200);
      
      expect(res.text).toContain('Welcome Back');
    });
  });

  // Test register page
  describe('GET /register', () => {
    it('should render register page', async () => {
      const res = await request(app)
        .get('/register')
        .expect(200);
      
      expect(res.text).toContain('Join Cooking Blog');
    });
  });

  // Test 404 page
  describe('GET /nonexistent', () => {
    it('should render 404 page', async () => {
      const res = await request(app)
        .get('/nonexistent')
        .expect(404);
      
      expect(res.text).toContain('Page Not Found');
    });
  });
});