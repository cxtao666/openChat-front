pipeline {
  agent {
    docker {
      reuseNode 'true'
      registryUrl 'https://coding-public-docker.pkg.coding.net'
      image 'public/docker/nodejs:18-2022'
    }

  }
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

    stage('master单元测试') {
      when {
        expression {
          env.BRANCH_NAME == 'master'
        }

      }
      post {
        always {
          junit 'reports/**/*.xml'
        }

      }
      steps {
        script {
          sh 'npm run test'
        }

      }
    }

    stage('dev单元测试') {
      when {
        expression {
          env.BRANCH_NAME != 'master'
        }

      }
      post {
        always {
          junit 'reports/**/*.xml'
        }

      }
      steps {
        script {
          sh "pnpm --filter $APP run test"
        }

      }
    }

    stage('依赖漏洞扫描') {
      steps {
        npmAuditInDir(directory: '/', collectResult: true)
      }
    }

    stage('master构建') {
      when {
        expression {
          env.BRANCH_NAME == 'master'
        }

      }
      steps {
        script {
          sh 'npm run build'
        }

      }
    }

    stage('dev构建') {
      when {
        expression {
          env.BRANCH_NAME != 'master'
        }

      }
      steps {
        script {
          sh "pnpm --filter $APP run build"
        }

      }
    }

  }
}

 