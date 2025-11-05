pipeline {
    agent any

    environment {
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
                "C:\\Windows\\System32\\OpenSSH\\scp.exe" -i "%PEM_PATH%" -r * %DEPLOY_USER%@%DEPLOY_SERVER%:%DEPLOY_PATH%/
                "C:\\Windows\\System32\\OpenSSH\\ssh.exe" -i "%PEM_PATH%" %DEPLOY_USER%@%DEPLOY_SERVER% "cd %DEPLOY_PATH% && npm install --production && pm2 restart node-demo || pm2 start server.js --name node-demo"
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
