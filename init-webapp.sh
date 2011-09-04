#arguments
HEROKU=false
JOYENT=false
DIR=/tmp
MIN_GIT_VER="1.7"
MIN_NPM_VER="1.0"
MIN_HEROKU_VER="2.5.2"

if [ $# == 0 ]; then
  echo "Usage: init-webapp.sh target-dir <joyent|heroku> <Joyent-node-name>"
  echo "Examples: "
  echo "  ./init-webapp.sh /tmp/app Heroku"
  echo "  ./init-webapp.sh /tmp/app Joyent my-awesome-node"
  exit 1
fi

#check if required software is installed
echo "Verifying local requirements"
hash git 2>&- || { echo >&2 "git is required but is not installed.  Aborted.."; exit 1; }
hash npm 2>&- || { echo >&2 "npm is required but is not installed.  Aborted.."; exit 1; }

#see http://fitnr.com/bash-comparing-version-strings.html
check_version()
{
    local version=$1 check=$2
    local winner=$(echo -e "$version\n$check" | sed '/^$/d' | sort -nr | head -1)
    [[ "$winner" = "$version" ]] && return 0
    return 1
}

GIT_VER=`git --version|grep -o '[^ ]*$'`
check_version $GIT_VER $MIN_GIT_VER
if [ $? == 1 ]; then
  echo "Fatal: git version must be" $MIN_GIT_VER "or greater but found" $GIT_VER. ""
  exit 1
fi

NPM_VER=`npm -v|grep -o '[^ ]*$'`
check_version $NPM_VER $MIN_NPM_VER
if [ $? == 1 ]; then
  echo "Fatal: npm version must be" $MIN_NPM_VER "or greater but found" $NPM_VER. "Aborted."
  exit 1
fi

DIR=$1
if [ -d "$DIR" ]; then
  echo "Directory $DIR already exists. Choose another one"
  exit 1
fi

if [ "$2" == "heroku" ]; then
  hash heroku 2>&- || { echo >&2 "heroku is required but is not installed.  Aborted.."; exit 1; }
  HEROKU_VER=`heroku version|grep -o '[^ /]*$'`
  check_version $HEROKU_VER $MIN_HEROKU_VER
  if [ $? == 1 ]; then
    echo "Fatal: heroku version must be" $MIN_HEROKU_VER "or greater but found" $HEROKU_VER. "Aborted."
    exit 1
  fi
  HEROKU=true
elif [ "$2" == "joyent" ]; then
  if [ $# != 3 ]; then
    echo "You also have to provide the no.de machine name. See http://bit.ly/nmCjhQ"
    exit 1
  fi
  JOYENT=true
else
  echo "Environment not supported or not supplied. Skpping cloud deployment"
fi

#copy assets
cp -r assets $DIR;
cd $DIR;

#init git repo
git init
git add .
git commit -m"initial web application boostrapped via http://github.com/florind/bootstrap.js"

#install modules
echo "Installing modules..."
npm install
npm install nodeunit
npm install zombie

#test
echo "Running tests..."
node_modules/nodeunit/bin/nodeunit spec/*.js

#deploy to heroku
if [ $HEROKU == true ]; then
  echo "Deploying to Heroku"
  heroku create --stack cedar
  git push heroku master
fi

#deploy to joyent
if [ $JOYENT == true ]; then
  echo "Deploying to Joyent"
  git remote add joyent $3.no.de:repo
  git push joyent master
fi
