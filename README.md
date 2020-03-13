# sona-client
This is a client used to display incidents tracked in sona. Sona is a support oriented notification application used for tracking issues tied to a project or product. More information on sona-server can be found here https://github.com/JeffreyRiggle/sona-server

## Getting Started
### Prerequisists
Nodejs and npm should be installed.

### Building
* download dependencies `npm install`
* run dev server `npm run dev`

### Testing
* run `npm test`

### E2E Testing
In order to run the e2e tests you will need to have both the sona-client running and the sona-server running.

1. Start the sona-server using these [instructions](https://github.com/JeffreyRiggle/sona-server/blob/master/doc/Install.md).
2. Start the web server. The easiest way to do this is just `npm run dev`
3. In another shell session run `npm run test:e2e`