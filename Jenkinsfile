pipeline {
    agent any

    environment {
        EC2_USER = "ubuntu"
        EC2_HOST = "54.234.171.1"
        EC2_KEY = "C:\\ProgramData\\Jenkins\\.ssh\\test.pem"
        EC2_PATH = "/opt/apps/node-demo/nodejs-jenkins"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/S-keptic/nodejs-jenkins.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                echo Installing Node.js dependencies...
                npm install
                '''
            }
        }

        stage('Build') {
            steps {
                bat '''
                echo Build successful
                '''
            }
        }

        stage('Deploy to EC2') {
            steps {
                bat '''
                echo ====== Starting EC2 Deployment ======

                REM Copy only essential files to EC2 (skip node_modules)
                "C:\\Windows\\System32\\OpenSSH\\scp.exe" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ^
                    -i "%EC2_KEY%" ^
                    package.json server.js ^
                    %EC2_USER%@%EC2_HOST%:%EC2_PATH%/

                REM SSH into EC2 to install dependencies and restart app
                "C:\\Windows\\System32\\OpenSSH\\ssh.exe" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ^
                    -i "%EC2_KEY%" ^
                    %EC2_USER%@%EC2_HOST% ^
                    "cd %EC2_PATH% && npm install --production && pm2 restart node-demo || pm2 start server.js --name node-demo"

                echo ====== Deployment Complete ======
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Deployment Failed!'
        }
    }
}
