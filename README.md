
# djangovue

A minimal Django project with Vue, Babel and Webpack installed. Intended to be used as a convenient template for starting frontend-oriented projects.

## Quickstart guide
Requires git, python3, pip3, virtualenv and npm

    # Set up virtual environment and source...
    
    virtualenv -p python3 venv
    source venv/bin/activate
    pip install django
    git clone https://github.com/benjarmstrong/djangovue.git venv/src
    
    # ...then compile static assets...
    
    cd venv/src/static
    npm install # Install JS dependencies
    npm run dev # Compile JS/CSS in developer mode
    
    # ...then test.
    
    python ../manage.py runserver 8080 # Now visit 127.0.0.1:8080

## Directory overview

 - **djangoapp**
 - - Default module for the app
 - **static**
 - - Contains uncompiled javascript and SASS
 - - Supports the following commands:
 - - - npm run dev
 - - - npm run watch
 - - - npm run production
 - - Commands perform various levels of minification and trans-compilation for maximum cross-browser support and compile javascript and SASS to separate files
 - - Compiles to **public** subdirectory
 - - - This directory are used in Django's collectstatic command
 - - - Compilation output files are ignored by git
 - **static_root**
 - - Target for 'python manage.py collectstatic' (You probably want to run npm in production first)
 - - Ignored by version control
 - **user**
 - - Module containing logic and views for authentication