sap.ui.define([
               "sap/ui/core/mvc/Controller",
               "sap/ui/model/json/JSONModel",
               "sap/ui/model/Filter",
               "sap/ui/model/FilterOperator"
               ], function (Controller, JSONModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("sap.ui.demo.embeddedanalytics.controller.StoryListMaster", {

		onInit: function () {
			var oControl = this; 	
			var sId = "SAMLTOAUTH"; 		
			var sURL = "https://embedsacoauth2samli055049trial.hanatrial.ondemand.com/embedsac-oauth2saml/api/v1/destination/" +sId +"/oauth"; 		

			$.ajax({
				type: 'GET',
				contentType: 'application/json',
				url: sURL,						
				success: function(data) {
					var access_token = data;
					var postheaders = {
							'Authorization' : 'Bearer '  + access_token,
							'X-CSRF-Token' : 'Fetch'
					}

					$.ajax({
						type: 'GET',
						url : 'https://analytics-hybrid-prod.eu1.sapanalytics.cloud/api/stories/v1/',
						contentType: 'application/json',
						headers: postheaders,
						xhrFields: {
							withCredentials: true
						},
						success: function(data,status,settings) {
							var model = new sap.ui.model.json.JSONModel(data);
							oControl.getView().setModel(model);
						}
					});		


				},
				error: function (xhr, ajaxOptions, thrownError) {
					alert(xhr.status);
					alert(thrownError);
				}
			}); 

		},

		handlePress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oItem.getParent().getParent().getParent().getParent().setLayout(sap.f.LayoutType.TwoColumnsMidExpanded);
			oRouter.navTo("detail", {
				storyId: oItem.getBindingContext().getObject().id
			});
		},
		
		onNavBack: function () {
//			var oHistory = History.getInstance();
//			var sPreviousHash = oHistory.getPreviousHash();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("overview", {}, true);
		}
	});

});
