sap.ui.define([
	"de/lhind/material/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("de.lhind.material.controller.Page", {
		onInit: function(){
			var oView = this.getView();
			this.oSearchMaterial = oView.byId("searchMaterial");
			
			var	oPanel = this.getView().byId("objectPanel");
			oPanel.setVisible(false);
		},
		
		onSuggest: function (event) {
			var value = event.getParameter("suggestValue");
			var filters = [];
			if (value) {
				filters = [new sap.ui.model.Filter([	new sap.ui.model.Filter("ProductId", function(sText) {
			                                            	return (sText || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
			                                               }),
			                                        	new sap.ui.model.Filter("Name", function(sDes) {
				                                            return (sDes || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
				                                           })
		                                               ], false)];
			}
 
			this.oSearchMaterial.getBinding("suggestionItems").filter(filters);
			this.oSearchMaterial.suggest();
		},
		
		onSearch: function (oEvent) {
			var oSelectedItem = oEvent.getParameter("suggestionItem");
			if (oSelectedItem) {
				//var sProductId = oSelectedItem.getBindingContext().getProperty("ProductId");
				
				var oContext = oSelectedItem.getBindingContext();
				var sPath = oContext.getPath();
				
				var	oPanel = this.getView().byId("objectPanel");
				oPanel.bindElement( {path: sPath} );
				oPanel.setVisible(true);
			}
		}
	});

});