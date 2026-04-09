pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Install dependencies') {
      steps {
        script {
          if (isUnix()) {
            sh 'npm ci'
          } else {
            bat 'npm ci'
          }
        }
      }
    }
    stage('Install Playwright browsers') {
      steps {
        script {
          if (isUnix()) {
            sh 'npx playwright install --with-deps'
          } else {
            bat 'npx playwright install --with-deps'
          }
        }
      }
    }
    stage('Run tests') {
      steps {
        script {
          if (isUnix()) {
            sh 'npm test'
          } else {
            bat 'npm test'
          }
        }
      }
    }
    stage('Archive report') {
      steps {
        archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true, fingerprint: true
      }
    }
  }
  post {
    always {
      script {
        if (isUnix()) {
          sh 'echo Build completed'
        } else {
          bat 'echo Build completed'
        }
      }
    }
  }
}
