package com.sap.sac.samples.api;


import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.sap.core.connectivity.api.authentication.AuthenticationHeader;
import com.sap.core.connectivity.api.authentication.AuthenticationHeaderProvider;
import com.sap.core.connectivity.api.configuration.ConnectivityConfiguration;
import com.sap.core.connectivity.api.configuration.DestinationConfiguration;
import javax.ws.rs.core.Response;

@Path("/destination")
@Produces({ MediaType.APPLICATION_JSON })
public class OAuthService
{
	@GET
	@Path("/{id}/oauth")
	@Produces({ MediaType.TEXT_PLAIN })
	public Response getOAuth2SamlToken(@PathParam(value = "id") String id)
	{
	    String destinationName = id;
		String token = null;
		DestinationConfiguration destConfiguration;
		List<AuthenticationHeader> authHeaders;
		
				try {
			
			Context ctx = new InitialContext();
			ConnectivityConfiguration configuration = (ConnectivityConfiguration) ctx.lookup("java:comp/env/ConnectivityConfiguration");
			destConfiguration = configuration.getConfiguration(destinationName);
			
			AuthenticationHeaderProvider authHeaderProvider = (AuthenticationHeaderProvider) ctx.lookup("java:comp/env/AuthenticationHeaderProvider");
			authHeaders = authHeaderProvider.getOAuth2SAMLBearerAssertionHeaders(destConfiguration);
			for (AuthenticationHeader authHeader : authHeaders) {
				if (authHeader.getName().equals("Authorization")) {
					String headerValue = authHeader.getValue();
					token = headerValue.substring(headerValue.lastIndexOf(" ") + 1);
				}
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		//return token;
				return Response
					      .status(200)
					      .header("Access-Control-Allow-Origin", "*")
					      .header("Access-Control-Allow-Credentials", "true")
					      .header("Access-Control-Allow-Headers",
					        "origin, content-type, accept, authorization")
					      .header("Access-Control-Allow-Methods", 
					        "GET, POST, PUT, DELETE, OPTIONS, HEAD")
					      .entity(token)
					      .build();

	}
}

