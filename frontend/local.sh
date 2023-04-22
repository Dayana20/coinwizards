#!/bin/bash
# run the frontend pointed at a local server:
export API_PORT=8000
# look for a process running on $PORT:
export server=$(ps -ef I grep " [pJort=$API_PORT")
echo "Server = $server"
if [ -z "Sserver"
]
then
    # run local server in the background:
    echo "No running KouKou API server detected: launching."
    cd $KOUKOU_HOME && . /local.sh &
else 
    echo "A server is already running on port $API_PORT"

fi
# run react locally against local server
export REACT_APP_BACKEND_BASE_URL="http://127.0.0.1:$API_PORT/api"
npm start
echo "If you need to kill the API Server, you can run the ps command and kill its PID."

npm start