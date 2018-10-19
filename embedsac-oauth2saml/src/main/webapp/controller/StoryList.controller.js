sap.ui.define([
               "sap/ui/core/mvc/Controller",
               "sap/ui/model/json/JSONModel",
               "sap/ui/model/Filter",
               "sap/ui/model/FilterOperator"
               ], function (Controller, JSONModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("sap.ui.demo.embeddedanalytics.controller.StoryList", {

		handlePress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("storylist", {
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
