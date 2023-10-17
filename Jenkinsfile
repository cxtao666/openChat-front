pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([$class: 'GitSCM',
        branches: [[name: GIT_BUILD_REF]],
        userRemoteConfigs: [[
          url: GIT_REPO_URL,
          credentialsId: CREDENTIALS_ID
        ]]])
      }
    }

    stage('安装依赖') {
      steps {
        sh 'npm install pnpm -g'
        sh 'pnpm install'
      }
    }

    stage('单元测试') {
      post {
        always {
          junit 'reports/**/*.xml'
        }

      }
      steps {
        sh "pnpm --filter ${$APP} run test"
      }
    }

    stage('依赖漏洞扫描') {
      steps {
        npmAuditInDir(directory: '/', collectResult: true)
      }
    }

    stage('构建') {
      steps {
        sh "pnpm --filter ${$APP} run build"
      }
    }

  }
}
