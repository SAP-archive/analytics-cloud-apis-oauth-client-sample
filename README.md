# analytics-cloud-apis-oauth-client-sample
Sample embedding SAP Analytics Cloud (SAC) in to third party websites using the SAC API

## Description
This web application exemplifies how SAP Analytics Cloud (SAC) stories can be embedded in third-party websites using SAC API. SAC content is accessed via OAuth 2.0.  A guide for using SAC APIs can be found [here](https://blogs.sap.com/2018/04/20/sap-analytics-cloud-apis-getting-started-guide/).

This demo app is programmed in [Node.js](https://nodejs.org/en/download/) and uses the [simple-oauth2 library](https://www.npmjs.com/package/simple-oauth2).
### Project Structure
* analytics-cloud-apis-oauth-client-sample
	* node modules
	* public
		* css
		* img
		* js - *client program*
		* rsrc
			* **config.js** - *configuration for the client program i.e., tenant configuration (tenant URL & ID), demo parameters (demo stories/ filters/ variables)*
	* server-config
		* **config.properties** - *OAuth configuration for the server program (ID of the client, secret, token & authorization URL, redirect URI)*  
	* views - *html files*
	* **server-app.js** - *server program (routing etc.)*

## Requirements
1. To run the [express- app](http://expressjs.com/) locally, you need to install [Node.js](https://nodejs.org/en/download/) on your computer.
2. Furthermore, you need to have access to an [SAP Analytics Coud](https://www.sapanalytics.cloud/) system.

## Download and Configuration
Please clone the repository:
`git clone https://github.com/SAP/analytics-cloud-apis-oauth-client-sample.git`

### Configuration of the SAC Tenant
1. Please make sure to have enabled iframe embedding on your tenant (cf. [2.1. Enable iFrame Embedding](https://blogs.sap.com/2018/04/20/sap-analytics-cloud-apis-getting-started-guide/#iframe_embedding)).
2. Please make sure to have registered the demo app as OAuth client in SAC (cf. [1.1. Client Registration](https://blogs.sap.com/2018/04/20/sap-analytics-cloud-apis-getting-started-guide/#oauth2_config) and [1.2.1. Registration Details](https://blogs.sap.com/2018/04/20/sap-analytics-cloud-apis-getting-started-guide/#3legged_reg)).

### Configuration of the Application
To start using the application, it needs to be configured.
1. For one, you have to configure the server program. Please define the configuration in the file [config.properties](https://github.com/SAP/analytics-cloud-apis-oauth-client-sample/blob/master/server-config/config.properties).
	1. Enter the client ID for your OAuth client. It has to be the ID you defined in SAC's administration page (cf. [1.1. Client Registration](https://blogs.sap.com/2018/04/20/sap-analytics-cloud-apis-getting-started-guide/#oauth2_config)).
	2. Enter the secret you specified in SAC (cf. [1.2.1. Registration Details](https://blogs.sap.com/2018/04/20/sap-analytics-cloud-apis-getting-started-guide/#3legged_reg)).
	3. Enter the token & authorization URL (cf. [1.2.2. Obtaining the Access Token](https://blogs.sap.com/2018/04/20/sap-analytics-cloud-apis-getting-started-guide/#3legged_impl)).
	4. Enter the redirect URI (cf. [1.2.1. Registration Details](https://blogs.sap.com/2018/04/20/sap-analytics-cloud-apis-getting-started-guide/#3legged_reg)).  
2. For two, you have to configure the client program. Please define the configuration in the file [config.js](https://github.com/SAP/analytics-cloud-apis-oauth-client-sample/blob/master/public/rsrc/config.js).
	1. Enter your tenant's URL and ID (cf. [2.2. Compose the URL](https://blogs.sap.com/2018/04/20/sap-analytics-cloud-apis-getting-started-guide/#url_composition)).
	2. [**Optional**] Enter demo display parameters (cf. [2.2.1. Display Parameters](https://blogs.sap.com/2018/04/20/sap-analytics-cloud-apis-getting-started-guide/#display_params)).
	3. [**Optional**] Enter demo filter parameters (cf. [2.2.2. Filter Parameters](https://blogs.sap.com/2018/04/20/sap-analytics-cloud-apis-getting-started-guide/#filter_params)).
	4. [**Optional**] Enter demo variable parameters (cf. [2.2.3. Variable Parameters](https://blogs.sap.com/2018/04/20/sap-analytics-cloud-apis-getting-started-guide/#variable_params)).
 
## Usage
1. As can be seen from the source code in [server-app.js](https://github.com/SAP/analytics-cloud-apis-oauth-client-sample/blob/master/server-app.js), the application runs on `localhost:8080`. Please start the server (e.g., in the folder *analytics-cloud-apis-oauth-client-sample* execute the console command `npm start` or `node server-app`).
2. Navigating to `localhost:8080` in your Google Chrome browser, opens the login page.
3. Clicking on login sends you to the authorization server’s authorization endpoint.
4. After entering your user credentials for the IdP, please click on authorize to get an access token. Once you have the access token, you can access protected resources on SAC.
5. Please enter parameter values (or, if specified, choose demo parameters by clicking on *Demo Parameters*). The tooltip next to a parameter provides an explanation for the corresponding parameter. It may also be helpful to read [2. SAC URL API](https://blogs.sap.com/2018/04/20/sap-analytics-cloud-apis-getting-started-guide/#url_api).
6. After having entered parameter values, click on *Generate URL*. In the text area above of the iframe, you see the URL that has been generated.
7. Click on *Load URL* to visualize the SAC story within the iframe.

### Trouble Shooting
In case the story is not visualized in the iframe (i.e., the iframe's background remains white), it is very likely that some cookies have been blocked. Make sure to have allowed cookies for the domain of your IdP. If necessary, allow additional cookies by clicking on the cookies-icon in Chrome's address bar.

## Support
Should you have any problems, please create a [new issue](https://github.com/SAP/analytics-cloud-apis-oauth-client-sample/issues/new).

## Contributions
Currently we do not accept any external contributions to this project. 

## License
Copyright (c) 2017 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under SAP SAMPLE CODE LICENSE AGREEMENT, v. 1.0 except as noted otherwise in the [LICENSE file](https://github.com/SAP/analytics-cloud-apis-oauth-client-sample/blob/master/LICENSE).
