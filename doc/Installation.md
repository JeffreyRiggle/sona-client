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


### Run the Docker image with https
By default the docker image runs using http. However using the correct environment variables you can get the docker image to run using https. In order to do this you will need a certificate and a key.

Once you have a certificate and a key you will need to store those as base64 encoded strings

Using bash
```bash
CERT=`base64 server.crt` # Note server.crt is the certificate file on your machine.
Key=`base64 server.key` # Note server.key is the key file on your machine.
```

Once you have these values stored you can run the following to get the client running in https.

```bash
docker run -e SONA_URL="http://sonaserver:8080" -e KEY="$KEY" -e CERT="$CERT" -p 443:443 --network mynet jeffriggle/sona-client:master
```