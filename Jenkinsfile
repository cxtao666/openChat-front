pipeline {
     environment {
        PATH = "$PATH:/usr/local/bin"
    }
    agent any
    stages {
        stage('Deploy') {
            steps {
                sh 'docker-compose up -d --build'
            }
        }
    }
    post {
        success {
            // 如果流水线成功执行
            echo 'Frontend pipeline succeeded! Sending notifications...'
            // 在这里可以添加通知、触发后端部署等操作
        }
        failure {
            // 如果流水线执行失败
            echo 'Frontend pipeline failed! Sending notifications...'
            // 在这里可以添加通知、回滚部署等操作
        }
    }
}
