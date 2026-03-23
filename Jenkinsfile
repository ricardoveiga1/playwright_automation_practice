pipeline {
    agent {
        docker {
            // Official Playwright Docker image with Node.js and browsers pre-installed
            image 'mcr.microsoft.com/playwright:v1.39.0-jammy'
            args '-u root:root'
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
    
    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }
        
        stage('Run API Tests') {
            when {
                expression { params.TEST_TYPE == 'all' || params.TEST_TYPE == 'api' }
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
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'html-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report',
                    reportTitles: 'Playwright Tests'
                ])
            }
        }
    }
    
    post {
        always {
            // Archive HTML report and test results
            archiveArtifacts artifacts: 'html-report/**/*', allowEmptyArchive: true, followSymlinks: false
            archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true, followSymlinks: false
        }
    }
}
