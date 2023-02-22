REACT_APP = frontend
REQ_DIR = .

FORCE:

all_tests: FORCE
	npm init @eslint/config
	npx eslint .

dev_env: FORCE
	cd $(REACT_APP)
	npm install – -save react-router-dom
	npm install react-bootstrap bootstrap

run: FORCE
	cd $(REACT_APP); npm start