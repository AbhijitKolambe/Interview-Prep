# Jenkins Pipeline for React Native (Android)

## 1. Jenkins Pipeline with Branch Selection (Basic)

This pipeline:
- Allows branch selection
- Installs dependencies
- Builds Android APK
- Can be extended for iOS

### Jenkinsfile

```groovy
pipeline {
    agent any

    parameters {
        string(
            name: 'GIT_BRANCH',
            defaultValue: 'develop',
            description: 'Enter the Git branch to build'
        )
    }

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: "${params.GIT_BRANCH}",
                    url: 'https://github.com/your-org/your-repo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Android') {
            steps {
                sh '''
                cd android
                ./gradlew clean assembleRelease
                '''
            }
        }
    }

    post {
        success {
            echo 'Build completed successfully'
        }
        failure {
            echo 'Build failed'
        }
    }
}
```

### How Branch Selection Works (Important for Interview)
Jenkins job shows an input field: `GIT_BRANCH`. You can enter:
- `main`
- `develop`
- `feature/login`

**Pipeline dynamically checks out that branch.**

**Interview explanation:**
We use Jenkins parameters to dynamically select the Git branch, which allows building feature branches, hotfixes, or release branches without modifying the pipeline.

### Android Output Location
After build:
`android/app/build/outputs/apk/release/app-release.apk`

You can later:
- Upload to Firebase App Distribution
- Upload to Play Store
- Archive as Jenkins artifact

### Optional: Archive APK (Good Practice)
Add inside `post` block:

```groovy
post {
    success {
        archiveArtifacts artifacts: 'android/app/build/outputs/**/*.apk', fingerprint: true
    }
}
```

---

## 2. Installing Required Tools for React Native Android CI/CD

These steps apply to **Linux / Ubuntu Jenkins server** (most common).
The same concepts apply to macOS with path differences.

### 2.1 Install Node.js (for React Native)
**Why Needed:**
- Runs Metro bundler
- Executes build scripts
- Required for npm / yarn

**Install Node.js (LTS Recommended):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Verify:**
```bash
node -v
npm -v
```

**Best practice:**
- Use LTS version only
- Same Node version across local + CI

### 2.2 Install npm or Yarn
npm comes with Node. Optional: install Yarn (recommended for lock consistency).

```bash
npm install -g yarn
```

**Verify:**
```bash
yarn -v
```

### 2.3 Install Java JDK (Mandatory for Android)
**Why Needed:**
- Android Gradle builds require Java
- React Native Android build fails without it

**Recommended Version:** Java 11 (most stable for Android).

```bash
sudo apt update
sudo apt install openjdk-11-jdk -y
```

**Verify:**
```bash
java -version
```

**Set JAVA_HOME:**
```bash
echo 'export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64' >> ~/.bashrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### 2.4 Install Android SDK (Most Important Part)

**Step 1: Download Command Line Tools**
```bash
mkdir -p ~/Android/cmdline-tools
cd ~/Android/cmdline-tools

wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip
unzip commandlinetools-linux-*.zip
mv cmdline-tools latest
```
*Final structure:*
`Android/cmdline-tools/latest/`

**Step 2: Set Android Environment Variables**
```bash
echo 'export ANDROID_HOME=$HOME/Android' >> ~/.bashrc
echo 'export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin' >> ~/.bashrc
echo 'export PATH=$PATH:$ANDROID_HOME/platform-tools' >> ~/.bashrc
source ~/.bashrc
```

**Verify:**
```bash
sdkmanager --version
```

**Step 3: Install Required Android SDK Components**
```bash
sdkmanager "platform-tools" \
           "platforms;android-34" \
           "build-tools;34.0.0"
```

**Accept licenses:**
```bash
yes | sdkmanager --licenses
```

**Verify:**
```bash
adb version
```

### 2.5 Validate React Native Android Build
```bash
cd android
./gradlew assembleDebug
```
If this passes, Jenkins Android environment is ready.

---

## 3. Separate Pipelines: Feature, Release, Hotfix

This is enterprise-grade CI/CD practice.

### 3.1 Feature Pipeline
- **Purpose**: Build and test feature branches
- **No signing**
- **No store uploads**
- **Triggers**: `feature/*` branches, Pull requests
- **Actions**: `npm install`, unit tests, debug build
- **Example branch**: `feature/login-improvement`

### 3.2 Release Pipeline
- **Purpose**: Prepare production-ready builds
- **Triggers**: `release/*` branches, manual approval
- **Actions**: Release build, Version bump, Signed AAB/APK, QA distribution
- **Example branch**: `release/1.2.0`

### 3.3 Hotfix Pipeline
- **Purpose**: Emergency production fixes
- **Triggers**: `hotfix/*` branches
- **Actions**: Minimal changes, Fast-track build, Signed release, Immediate deployment
- **Example branch**: `hotfix/payment-crash`

---

## 4. How to Secure Secrets in Jenkins (Critical Interview Topic)

### 4.1 Environment Variables (Basic Level)
Used for non-sensitive config, build flags.
**Example:**
```groovy
environment {
  NODE_ENV = 'production'
}
```
*Limitation: Not suitable for secrets.*

### 4.2 Jenkins Credentials Store (Best Practice)
Used for API keys, Keystore passwords, Tokens, Certificates.

**Steps:**
1. Jenkins → Manage Jenkins
2. Credentials → Global
3. Add credentials (Secret Text, Username/Password, File)

**Using Credentials in Jenkinsfile:**
```groovy
environment {
  KEYSTORE_PASSWORD = credentials('android_keystore_password')
}
```

**Or:**
```groovy
withCredentials([
  string(credentialsId: 'api_key', variable: 'API_KEY')
]) {
  sh 'echo "Using secured key"'
}
```

**Rules:**
- Never echo secrets
- Never commit secrets
- Rotate regularly

---

## 5. Handling Multiple Environments (Dev / QA / Prod)

### 5.1 Using .env Files
File contents (`.env.dev`, `.env.qa`, `.env.prod`):
```bash
API_BASE_URL=https://api.dev.example.com
```

**Usage:** Loaded during build for environment-specific behavior.

### 5.2 Build-Time Variables
**Android:**
```bash
./gradlew assembleRelease -Penv=prod
```

**React Native:**
```bash
ENVFILE=.env.prod npm run build
```

### 5.3 Backend URLs per Branch (Common Pattern)

| Branch | Environment |
| :--- | :--- |
| `feature/*` | dev |
| `develop` | qa |
| `release/*` | staging |
| `main` | production |

**Example Jenkins logic:**
```groovy
if (params.GIT_BRANCH.startsWith('release')) {
  env.ENVFILE = '.env.staging'
}
```

---

## 6. Interview-Ready Summary Statements

**Tools Setup:**
For React Native CI/CD, I install Node.js, Java JDK, and Android SDK command-line tools on Jenkins agents. I configure `ANDROID_HOME`, accept SDK licenses, and validate builds using Gradle.

**Pipeline Separation:**
I maintain separate Jenkins pipelines for feature, release, and hotfix branches to ensure safe development, controlled releases, and fast emergency fixes.

**Secrets Management:**
All secrets are stored in **Jenkins Credentials Store** and injected securely at runtime. I never hardcode keys or expose them in logs.

**Environment Handling:**
I manage multiple environments using `.env` files, build-time variables, and branch-based configuration to ensure correct backend connectivity per stage.

**Final FinTech CI/CD Principle:**
> Reproducible builds + secure secrets + controlled releases = production-grade mobile CI/CD