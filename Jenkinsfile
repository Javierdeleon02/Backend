pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/Javierdeleon02/Backend.git'
            }
        }
        stage('Build') {
            steps {
                sh 'mvn clean install'  // o npm install, gradle build, etc. según tu proyecto
            }
        }
        stage('SonarQube Analysis') {
            environment {
                scannerHome = tool 'SonarQubeScanner'
            }
            steps {
                withSonarQubeEnv('SonarQubeServer') {
                    sh "${scannerHome}/bin/sonar-scanner \
                        -Dsonar.projectKey=Backend \
                        -Dsonar.sources=src \
                        -Dsonar.java.binaries=target/classes"
                }
            }
        }
        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}
