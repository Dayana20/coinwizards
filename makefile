REACT_APP = frontend
REQ_DIR = .

FORCE:

all_tests: FORCE
	npx eslint .

dev_env: FORCE
	cd $(REACT_APP)
	npm install react-scripts
	npm install -save react-router-dom
	npm install react-bootstrap bootstrap
	npm i axios

run: FORCE
	cd $(REACT_APP); 
	npm install react-scripts
	npm start
