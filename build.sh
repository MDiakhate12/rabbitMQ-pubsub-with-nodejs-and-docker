docker build -t $DOCKER_USERNAME/rabbitmq-publisher publisher/
docker push $DOCKER_USERNAME/rabbitmq-publisher

docker build -t $DOCKER_USERNAME/rabbitmq-subscriber subscriber/
docker push $DOCKER_USERNAME/rabbitmq-subscriber