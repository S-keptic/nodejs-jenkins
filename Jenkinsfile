pipeline {
  agent any

  environment {
    DEPLOY_USER = 'ubuntu'
    DEPLOY_SERVER = '54.234.171.1'   
    DEPLOY_PATH = '/opt/apps/node-demo/nodejs-jenkins'
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/S-keptic/nodejs-jenkins.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'echo "Build successful (no compilation needed)"'
      }
    }

    stage('Deploy to EC2') {
      steps {
        sshagent (credentials: ['deploy-ssh']) {
          sh '''
            scp -r * ${DEPLOY_USER}@${DEPLOY_SERVER}:${DEPLOY_PATH}/
            ssh ${DEPLOY_USER}@${DEPLOY_SERVER} "
              cd ${DEPLOY_PATH} &&
              npm install --production &&
              pm2 restart node-demo || pm2 start server.js --name node-demo
            "
          '''
        }
      }
    }
  }

  post {
    success { echo " Deployment Successful!" }
    failure { echo " Deployment Failed!" }
  }
}
