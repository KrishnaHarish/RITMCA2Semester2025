# RIT MCA 2nd Semester 2025 Repository

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Repository Overview

This is a comprehensive MCA (Master of Computer Applications) educational repository containing:
- **3 Node.js Web Applications**: Full-stack applications with MongoDB backend
- **Java Programming Examples**: Demonstration files covering OOP concepts, design patterns, multithreading, collections, and JDBC
- **Python Network Programming**: TCP/UDP client-server examples
- **Database Scripts**: SQL files for various database systems
- **Educational Materials**: Course answers, notes, and documentation
- **React Components**: Educational JavaScript/React examples

## Working Effectively

### Bootstrap and Dependencies
**CRITICAL**: Always run these exact commands in order. NEVER CANCEL any long-running operations.

1. **Start MongoDB (Required for all Node.js apps)**:
   ```bash
   docker run --name mongodb -d -p 27017:27017 mongo:7.0
   # NEVER CANCEL: MongoDB startup takes 2-3 minutes. Set timeout to 5+ minutes.
   ```

2. **Install Node.js dependencies** (takes 1-3 minutes per project):
   ```bash
   cd cooking-blog && npm install          # Takes ~60 seconds
   cd ../crop-yield-prediction && npm install  # Takes ~2 seconds (already cached)
   cd ../recipe-management && npm install      # Takes ~3 seconds (already cached)
   ```

3. **Set up environment files**:
   ```bash
   cd cooking-blog && cp .env.example .env
   cd ../crop-yield-prediction && cp .env.example .env
   cd ../recipe-management && cp .env.example .env
   ```

### Building and Running Applications

#### Node.js Web Applications
All three applications require MongoDB to be running first.

**Cooking Blog** (Port 3001):
```bash
cd cooking-blog
npm start
# NEVER CANCEL: Application starts in 3-5 seconds
# Access at http://localhost:3001
```

**Crop Yield Prediction** (Port 3000):
```bash
cd crop-yield-prediction
npm start  
# NEVER CANCEL: Application starts in 3-5 seconds
# Access at http://localhost:3000
```

**Recipe Management** (Port 3000):
```bash
cd recipe-management
npm start
# NEVER CANCEL: Application starts in 3-5 seconds  
# Access at http://localhost:3000
```

**IMPORTANT**: Only run one application at a time as crop-yield-prediction and recipe-management both use port 3000.

#### Java Programs
**Individual compilation and execution**:
```bash
javac ClassFundamentalsDemo.java  # Takes ~0.5 seconds
java Person                       # Runs the main class
```

**NEVER compile all Java files together** - there are naming conflicts. Always compile individual files.

**Common Java files and their main classes**:
- `ClassFundamentalsDemo.java` → `java Person`
- `InheritanceDemo.java` → `java Dog` (compile individually)
- `MultithreadingDemo.java` → `java MultithreadingDemo`
- `CollectionsDemo.java` → `java CollectionsDemo`
- `LambdaDemo.java` → `java LambdaDemo`

#### Python Network Scripts
**The Python scripts have hardcoded IP addresses that won't work in sandboxed environments**:
- `TCP-Server.py` - Server with hardcoded IP "172.1.27.11"
- `TCP-Client.py` - Client script
- `UDP-Server.py` - UDP server implementation  
- `UDP-Client.py` - UDP client implementation

**Do not attempt to run these scripts** - they are for educational reference only.

### Testing

#### Node.js Application Tests
```bash
cd cooking-blog
npm run test
# NEVER CANCEL: Tests take 1-2 seconds, may have 1 expected failure due to database validation
# Expected output: 12 passed, 1 failed (database-related failure is normal)
```

**Linting is not configured** - `npm run lint` will fail with configuration errors.

#### Manual Validation Scenarios
Always perform these validation steps after making changes:

**Cooking Blog Application**:
1. Start the application: `npm start`
2. Access homepage: `curl http://localhost:3001` - should return HTML
3. Test API health: `curl http://localhost:3001/health` - should return JSON status
4. Navigate to login/register pages via browser
5. Always test the recipe browsing functionality

**Java Programs**:
1. Compile individual files: `javac [filename].java`
2. Run with correct main class name
3. Verify output matches expected behavior (e.g., Person object creation, inheritance examples)

### Common Build Issues and Solutions

**MongoDB Connection Issues**:
- Problem: Applications fail to start with MongoDB connection errors
- Solution: Ensure MongoDB Docker container is running: `docker ps | grep mongodb`
- If not running: `docker start mongodb` or recreate with the docker run command

**Port Conflicts**:
- Problem: "Port already in use" errors
- Solution: Only run one application at a time, or kill existing processes: `pkill -f node`

**Java Compilation Errors**:
- Problem: Class conflicts when compiling multiple files
- Solution: Compile files individually, never use `javac *.java`
- Check main class name in the file - it may differ from filename

**Node.js Module Issues**:
- Problem: Module not found errors
- Solution: Re-run `npm install` in the specific project directory
- Ensure you're in the correct subdirectory (cooking-blog, crop-yield-prediction, or recipe-management)

### Project Structure Reference

```
RITMCA2Semester2025/
├── cooking-blog/              # Full-featured cooking blog (Port 3001)
│   ├── controllers/           # Request handlers
│   ├── models/               # MongoDB schemas
│   ├── routes/               # API endpoints
│   ├── views/                # EJS templates
│   ├── public/               # Static assets
│   └── server.js             # Main application
├── crop-yield-prediction/     # Agricultural prediction system (Port 3000)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── recipe-management/         # Recipe management system (Port 3000)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── views/
│   └── server.js
├── *.java                    # Java demonstration files (compile individually)
├── *.py                      # Python networking examples (reference only)
├── *.sql                     # Database scripts
├── *.md                      # Educational materials and answers
└── drive_*.js                # React component examples
```

### Key Features by Application

**Cooking Blog**:
- User authentication with JWT
- Recipe CRUD operations
- Rating and favorites system
- Bootstrap responsive design
- API endpoints at `/api`

**Crop Yield Prediction**:
- Environmental data input
- Yield prediction algorithms
- Analytics dashboard
- REST API at `/api/v1`

**Recipe Management**:
- User authentication
- Recipe management with image uploads
- EJS templating
- Favorites system

### Validation Requirements

**ALWAYS test applications end-to-end**:
1. Start MongoDB container
2. Start application
3. Access both web interface and API endpoints
4. Test user registration/login flows if applicable
5. Take screenshots of working applications when making UI changes

**For Java programs**:
1. Compile individual files successfully
2. Execute with correct main class
3. Verify expected console output

### Expected Timing Information

- **MongoDB startup**: 2-3 minutes (NEVER CANCEL)
- **npm install** (first time): 60 seconds for cooking-blog, 2-3 seconds for others (cached)
- **Application startup**: 3-5 seconds each
- **Java compilation**: 0.5 seconds per file
- **Tests**: 1-2 seconds for cooking-blog test suite

### Do Not Do

- Do not run `npm run lint` - ESLint configuration is incomplete
- Do not compile all Java files together with `javac *.java`
- Do not attempt to run Python network scripts - they have hardcoded IPs
- Do not cancel MongoDB startup or long operations
- Do not run multiple Node.js apps simultaneously (port conflicts)
- Do not try to run applications without MongoDB running first