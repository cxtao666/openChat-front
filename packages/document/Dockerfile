# 新建构建阶段build-stage，指定node为基础镜像，该阶段用于生成前端制品文件
FROM node:18-alpine as build-stage
# 指定工作目录/app用于存放前端制品，以便在COPY,RUN以及下一个构建阶段中使用。
WORKDIR /app
# 复制package.json、package-lock.json、yarn.lock到工作目录里，COPY最后一个参数dest如果是相对路径，则会以工作目录有作为基准，复制到WORKDIR/<dest>里
COPY package*.json  ./
# 下载依赖
RUN yarn install
COPY . .
# 生成制品
RUN yarn build

# 新建构建阶段deploy-stage，指定nginx为基础镜像，该阶段用于配置和运行nginx
FROM nginx:stable-alpine as deploy-stage
# 把build-stage阶段中的前端制品和nginx.conf配置文件复制到nginx的指定路径里
# 这样子就可以设置nginx的配置文件，而配置文件中的默认匹配路径是/usr/share/nginx/html，也就是存放前端制品的路径
COPY --from=build-stage /app/dist/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
# 指定容器在运行过程时监听80端口
EXPOSE 80
# 指定在容器开启运行时，通过运行以下命令行指令开启nignx
CMD ["nginx", "-g", "daemon off;"]