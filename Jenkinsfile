pipeline {
     environment {
        PATH = "$PATH:/usr/local/bin"
    }
    agent any
    stages {
      stage("检出") {
      steps {
        checkout(
          [$class: 'GitSCM',
          branches: [[name: GIT_BUILD_REF]],
          userRemoteConfigs: [[
            url: GIT_REPO_URL,
              credentialsId: CREDENTIALS_ID
            ]]]
        )
      }
    }
        
    stage('安装依赖') {
      steps {
        sh "npm install pnpm -g"
        sh "pnpm install"
      }
    }
    
    stage('单元测试') {
      steps {
        sh "pnpm --filter ${env.App} run test"
      }
      post {
        always {
          // 收集测试报告
          junit 'reports/**/*.xml'
        }
      }
    }
    
    stage('依赖漏洞扫描') {
      steps {
        npmAuditInDir(directory: '/', collectResult: true)
      }
    }

    stage('构建') {
      steps {
        sh "pnpm --filter ${env.App} run build"
      }
    }
    }
}
