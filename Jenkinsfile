pipeline {
    agent any
    
    parameters {
        choice(
            name: 'ENVIRONMENT',
            choices: ['stage', 'prod'],
            description: 'Select the environment to run tests against'
        )
        choice(
            name: 'TEST_TYPE',
            choices: ['all', 'api', 'e2e'],
            description: 'Select which tests to run'
        )
        booleanParam(
            name: 'GENERATE_REPORT',
            defaultValue: true,
            description: 'Generate and publish HTML test report'
        )
    }
    
    environment {
        NODE_VERSION = '18'
        PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = '0'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm
            }
        }
        
        stage('Setup Environment') {
            steps {
                echo "Setting up Node.js ${NODE_VERSION}..."
                script {
                    // Use Node.js version from tool configuration
                    nodejs(nodeJSInstallationName: "Node ${NODE_VERSION}") {
                        sh 'node --version'
                        sh 'npm --version'
                    }
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                nodejs(nodeJSInstallationName: "Node ${NODE_VERSION}") {
                    sh 'npm ci'
                    sh 'npx playwright install --with-deps'
                }
            }
        }
        
        stage('Run API Tests') {
            when {
                expression { params.TEST_TYPE == 'all' || params.TEST_TYPE == 'api' }
            }
            steps {
                echo "Running API tests on ${params.ENVIRONMENT} environment..."
                nodejs(nodeJSInstallationName: "Node ${NODE_VERSION}") {
                    script {
                        sh "npm run api_tests_${params.ENVIRONMENT}"
                    }
                }
            }
        }
        
        stage('Run E2E Tests') {
            when {
                expression { params.TEST_TYPE == 'all' || params.TEST_TYPE == 'e2e' }
            }
            steps {
                echo "Running E2E tests on ${params.ENVIRONMENT} environment..."
                nodejs(nodeJSInstallationName: "Node ${NODE_VERSION}") {
                    script {
                        sh "npm run e2e_tests_${params.ENVIRONMENT}"
                    }
                }
            }
        }
        
        stage('Publish Test Results') {
            when {
                expression { params.GENERATE_REPORT }
            }
            steps {
                echo 'Publishing test results...'
                script {
                    // Publish HTML report
                    publishHTML([
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'html-report',
                        reportFiles: 'index.html',
                        reportName: 'Playwright Test Report',
                        reportTitles: 'Playwright Tests'
                    ])
                    
                    // Archive test results
                    archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
                    archiveArtifacts artifacts: 'html-report/**/*', allowEmptyArchive: true
                }
            }
        }
    }
    
    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs(
                deleteDirs: true,
                disableDeferredWipeout: true,
                patterns: [
                    [pattern: 'node_modules', type: 'EXCLUDE'],
                    [pattern: '.git', type: 'EXCLUDE']
                ]
            )
        }
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
        unstable {
            echo '⚠️ Pipeline is unstable!'
        }
    }
}
