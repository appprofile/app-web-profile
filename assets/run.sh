#!/bin/bash

# Load environment.
export PUBLIC_HOST=${PUBLIC_HOST:-0.0.0.0}
export AUTH0_DOMAIN=${AUTH0_DOMAIN:-app-profile.auth0.com}
export AUTH0_CLIENT_ID=${AUTH0_CLIENT_ID:-lUnF8NKF9FBehcR3YcAxe4z0HQo3C2z3}
export CALLBACK=${CALLBACK:-callback}
export SCOPE=${SCOPE:-openid profile email}
export API_DOMAIN=${API_DOMAIN:-http://0.0.0.0}
export API_PORT=${API_PORT:-8081}
export API_VERSION=${API_VERSION:-v1}

# Generate environment.ts
echo "Generating environment.ts..."
envsubst < /.setup/environment.ts > $APP_DIR/src/environments/environment.ts

# Start app-ms-profile
cd $APP_DIR && ng build && ng serve --port 8080 --host 0.0.0.0 --public $PUBLIC_HOST
