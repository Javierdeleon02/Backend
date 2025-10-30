pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // Debe estar configurado en Global Tool Configuration
    }

    environment {
        SCANNER_HOME = tool 'SonarQubeScanner' // Nombre configurado en Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Usando el código del workspace local o repositorio Git'
                // Si tienes repositorio Git, puedes usar esto:
                // git branch: 'main', url: 'https://github.com/usuario/Proyecto_ACS.git'
            }
        }

        stage('Instalar dependencias') {
            steps {
                script {
                    if (fileExists('package.json')) {
                        bat 'npm install'
                    } else {
                        echo 'No se encontró package.json, se omite instalación de dependencias'
                    }
                }
            }
        }

        stage('Build o Linter') {
            steps {
                script {
                    if (fileExists('package.json')) {
                        bat 'npm run build || echo No se encontró script build'
                        bat 'npm run lint || echo No se encontró script lint'
                    } else {
                        echo 'No se ejecutó build ni lint (no hay package.json)'
                    }
                }
            }
        }

        stage('Análisis con SonarQube') {
            steps {
                withSonarQubeEnv('SonarQubeServer') { // Nombre del servidor configurado en Jenkins
                    bat """
                        "%SCANNER_HOME%\\bin\\sonar-scanner.bat" ^
                            -Dsonar.projectKey=Proyecto_ACS ^
                            -Dsonar.projectName="Proyecto ACS" ^
                            -Dsonar.sources=Backend ^
                            -Dsonar.exclusions=Backend\\node_modules/**,Backend\\dist/**,Backend\\**/*.min.js ^
                            -Dsonar.language=js ^
                            -Dsonar.sourceEncoding=UTF-8
                        """
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
