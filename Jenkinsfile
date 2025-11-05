pipeline {
    agent any

    environment {
        // Define common variables
        DEPLOY_USER = 'ubuntu'
        DEPLOY_SERVER = '54.234.171.1'
        DEPLOY_PATH = '/opt/apps/node-demo/nodejs-jenkins'
        PEM_PATH = 'C:\\Users\\Anmol Srivastava\\Downloads\\test.pem'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/S-keptic/nodejs-jenkins.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'echo Build successful'
            }
        }

        stage('Deploy to EC2') {
            steps {
                bat '''
                echo ====== Starting EC2 Deployment ======

                REM Copy project files to EC2 (non-interactive)
                "C:\\Windows\\System32\\OpenSSH\\scp.exe" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i "C:\\Users\\Anmol Srivastava\\Downloads\\test.pem" -r * ubuntu@54.234.171.1:/opt/apps/node-demo/nodejs-jenkins/

                REM Restart or start PM2 on EC2
                "C:\\Windows\\System32\\OpenSSH\\ssh.exe" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i "C:\\Users\\Anmol Srivastava\\Downloads\\test.pem" ubuntu@54.234.171.1 "cd /opt/apps/node-demo/nodejs-jenkins && npm install --production && pm2 restart node-demo || pm2 start server.js --name node-demo"

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
