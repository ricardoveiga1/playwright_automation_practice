pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.39.0-jammy'
            args '--user root'
        }
    }
    
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
        CI = 'true'
        HOME = '/root'
    }
    
    stages {
        stage('Verify Environment') {
            steps {
                echo 'Verifying Node.js and npm...'
                sh 'node --version'
                sh 'npm --version'
                sh 'npx playwright --version'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }
        
        stage('Run API Tests') {
            when {
            }
            steps {
                echo "Running API tests on ${params.ENVIRONMENT} environment..."
                sh "npm run api_tests_${params.ENVIRONMENT}"
            }
        }
        
        stage('Run E2E Tests') {
            when {
                expression { params.TEST_TYPE == 'all' || params.TEST_TYPE == 'e2e' }
            }
            steps {
                echo "Running E2E tests on ${params.ENVIRONMENT} environment..."
                sh "npm run e2e_tests_${params.ENVIRONMENT}"
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
