#!/bin/bash
# run the frontend pointed at a local server:

export API_PORT=8000
# run react locally against local server
export REACT_APP_DEV_URL=http://127.0.0.1:$API_PORT/api/

npm start