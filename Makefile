run:
	docker-compose exec server bash -c "npm install && npm run start:dev"

init:
	docker-compose up -d

kill:
	docker-compose kill

bash:
	docker-compose exec server bash

db-bash:
	docker-compose exec db bash

reset-nginx:
	docker-compose restart nginx

