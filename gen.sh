#!/bin/bash

SCRIPT_DIR=`echo ${0} | rev | cut -c 8- | rev`
CURRENT_DIR=`pwd`
NAME=`cat package.json | jq '.name' | sed s.\\"."".g`
echo "> found app name: $NAME"

_help() {
  cat << EOF

Usage:
  gen.sh [options]

  options
   -h             help
   --init
   --init-server

EOF
}

_sanity_check() {
  if [[ -f package.json ]]; then
    return 0
  else
    return 1
  fi
}

_copy() {
  src=${2}
  echo "Copy $1 into app/$src"
  cp $SCRIPT_DIR/templates/$1 $CURRENT_DIR/$src$1
}
_rm() {
  echo "Remove $1"
  rm $CURRENT_DIR/src/$1 2> /dev/null
}
_mkdir() {
  echo "Create dir $1"
  mkdir -p $CURRENT_DIR/$1
}
_mv() {
  echo "Moving $1 to $2"
  mv $1 $2
}
_yarn() {
  list='
material-ui
react-tap-event-plugin
react-router-dom
axios
redux
redux-logger
redux-freeze
react-redux
'
  yarn add $list
}

_init() {
  if [[ _sanity_check ]]; then
    _rm logo.svg
    _rm registerServiceWorker.js
    _rm App.css
    _rm App.js
    _rm App.test.js
    
    _mkdir deploy
    _mkdir docker
    _mkdir src/components
    _mkdir src/ducks
    _mkdir src/utils
    _mkdir src/config
    _mkdir src/routes
    _mkdir src/utils/__tests__
    
    _copy Router.js src/
    _copy index.js src/
    _copy Dockerfile docker/
    _copy db.js src/utils/
    _copy db.test.js src/utils/__tests__/
    _copy util.js src/utils/
    _copy index.css src/
    _copy Container.js src/components/
    _copy Layout.js src/components/
    _copy ducks.js src/ducks/
    _copy theme.js src/config/
    _copy messages.js src/
    _copy .dockerignore
    _copy package-scripts.js
    _copy appui.js src/ducks/
    _copy index.js
    _copy store.js src/
    
    _mv src/utils/util.js src/utils/index.js
    _mv src/ducks/ducks.js src/ducks/index.js

    _create_docker_compose $NAME
    _create_deploy_file $NAME

    _yarn
    
    _hint

    code .
    code public/index.html
  else
    echo "UH OH! No package.json found, are you sure you're in the correct dir"
  fi
}

_hint() {
  echo -e "
Add this to your index.html file"
  echo -e "
<meta name=\"apple-mobile-web-app-capable\" content=\"yes\">
<!-- <link rel='apple-touch-icon', sizes='180x180', href='/180x180.png' /> -->
<meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black-translucent\">
"
  echo -e '<meta name="apple-mobile-web-app-capable" content="yes">
    <!-- <link rel='apple-touch-icon', sizes='180x180', href='/180x180.png' /> -->
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">' | pbcopy
}

_create_docker_compose() {
  echo -e "
version: '2'
services:
  app:
    image: \"registry.jorgeadolfo.com/$1:latest\"
    ports:
      - 8080:80
" > docker/docker-compose.yml
}

_create_deploy_file() {
  echo -e "
---
- hosts: web
  remote_user: george
  tasks:
    - name: Pull new image
      shell: docker pull registry.jorgeadolfo.com/$1:latest

    - name: Stop $1
      shell: cd /opt/g3org3/$1 && docker-compose stop && docker-compose rm -f
      ignore_errors: yes

    - name: Start $1
      shell: cd /opt/g3org3/$1 && docker-compose up -d
      ignore_errors: yes
" > deploy/update.yml
}

_init_server() {
  if [[ -n "$NAME" ]]; then
    echo "ssh -> to server"
    ssh jorgeadolfo.com "mkdir /opt/g3org3/$NAME"
    echo "[ssh] -> created directory"
    scp docker/docker-compose.yml jorgeadolfo.com:/opt/g3org3/$NAME/
    echo "[scp] -> copy compose"
    _create_deploy_file $NAME
  else
    echo "please provide a project name, did not found package.json on root"
  fi
}

_generate_component() {
  case $3 in
    simple)
      echo -e "import React from 'react';

const User = (props) => (
  <div>
    text
  </div>
)

export default User;" > $1/$2.js
      ;;
    state)
      echo -e "import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>text
    </div>
  }
}

export default User;" > $1/$2.js
      ;;
    *)
    echo -e "import React from 'react';

const User = (props) => {
  return <div>text
  </div>
};

export default User;" > $1/$2.js
  esac
}

_check_port() {
  cat ~/Documents/personal-work/ja-prod-compose/default.conf| grep ':[0-9]\{4\}' | sed s.:.\ .g | sed s.\;.. | awk '{print $4}' | grep $1
}

case $1 in
  -p)
    _check_port $2
    ;;
  -c)
    _generate_component $2 $3 $4
    ;;
  --init-server)
    _init_server
    ;;
  --init)
    _init
    ;;
  -h)
    _help
    ;;
  *)
    _help
esac