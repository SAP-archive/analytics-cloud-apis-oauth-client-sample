sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";

	return Controller.extend("sap.ui.demo.embeddedanalytics.controller.Detail", {

		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function (oEvent) {

			var storyid = oEvent.getParameter("arguments").storyId;
			var iframe = this.getView().byId("attachmentframe");
			var sId = "SAMLTOAUTH"; 		
			var sURL = "https://embedsacoauth2samli055049trial.hanatrial.ondemand.com/embedsac-oauth2saml/api/v1/destination/" +sId +"/oauth";
			
			var storyURL = "https://analytics-hybrid-prod.eu1.sapanalytics.cloud/sap/fpa/ui/tenants/040/bo/story/"+storyid+"?mode=embed";
			var iframeId = this.getView().createId("attachmentframe");
			document.getElementById(iframeId).src = storyURL;
         	
		},

		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("story", {}, true);
		}
	});
});
