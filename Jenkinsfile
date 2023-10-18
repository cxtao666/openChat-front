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
      post {
        always {
          junit 'reports/**/*.xml'
        }
      }
       when {
          expression {
                // 判断当前分支是否是 master
                return env.GIT_BRANCH == 'master'
            }
        }
            steps {
                script {
                    // 在 master 分支上执行 npm run test
                    sh 'npm run test'
                }
      }   
  }

  stage('dev单元测试') {
      post {
        always {
          junit 'reports/**/*.xml'
        }
      }
       when {
          expression {
                // 判断当前分支是否是 master
                return env.GIT_BRANCH != 'master'
            }
        }
            steps {
                script {
                    // 在 master 分支上执行 npm run test
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
                // 判断当前分支是否是 master
                return env.GIT_BRANCH == 'master'
            }
        }
            steps {
                script {
                    // 在 master 分支上执行 npm run test
                    sh 'npm run build'
                }
      }   
  }

  stage('dev构建') {
       when {
          expression {
                // 判断当前分支是否是 master
                return env.GIT_BRANCH != 'master'
            }
        }
            steps {
                script {
                    // 在 master 分支上执行 npm run test
                    sh "pnpm --filter $APP run build"
                }
      }   
  }

  }
}


 