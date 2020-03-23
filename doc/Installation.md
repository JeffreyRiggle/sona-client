# Installation
Installation only works using docker images. However you can clone and build the server yourself if you would like to run it as not a docker image.

## Prerequisit note
In order to run sona client you need to have an instance of sona server running. For directions on getting sona server running see [https://github.com/JeffreyRiggle/sona-server/blob/master/doc/Install.md](sona server installation).

## Docker
The easiest way to get up and running is to simply download the docker image and start it with your configuration file.

### Install Docker Image
`docker pull jeffriggle/sona-client:master`

### Run the Docker Image
Run the docker image. In order to do this make sure you have the correct sona server url and make sure that the client can reach that URL from within its network.

`docker run -e SONA_URL="http://sonaserver:8080" -p 80:80 --network mynet jeffriggle/sona-client:master`
