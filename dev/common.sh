set -e


# install all dependencies specified in the requiments.txt file using pip

install_deps () {
    echo " ---> install deps"

    # use pip to install or upgrade the dependencies quietly
    pip -q install -r requirements.txt --upgrade
}



clean () {
    echo " ---> clean"

    # Temporarily disable script exit on errors to ensure cleanup continues
    set +e

    # Remove any remaining artifcats
    rm -rf site/

    # Re-enable script exit on errors
    set -e 

}