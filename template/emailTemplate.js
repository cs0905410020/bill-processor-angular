(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['email.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <tr> \r\n            <td>"
    + alias4(((helper = (helper = helpers.billNumber || (depth0 != null ? depth0.billNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"billNumber","hash":{},"data":data}) : helper)))
    + "</td> \r\n            <td>"
    + alias4((helpers.formatDate || (depth0 && depth0.formatDate) || alias2).call(alias1,(depth0 != null ? depth0.billReceivedDate : depth0),{"name":"formatDate","hash":{},"data":data}))
    + "</td>\r\n            <td>"
    + alias4(((helper = (helper = helpers.billAmount || (depth0 != null ? depth0.billAmount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"billAmount","hash":{},"data":data}) : helper)))
    + "</td>\r\n            <td>"
    + alias4(((helper = (helper = helpers.status || (depth0 != null ? depth0.status : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"status","hash":{},"data":data}) : helper)))
    + "</td>\r\n            <td>"
    + alias4((helpers.formatDate || (depth0 && depth0.formatDate) || alias2).call(alias1,(depth0 != null ? depth0.dueDateForPayment : depth0),{"name":"formatDate","hash":{},"data":data}))
    + "</td>\r\n            <td>"
    + alias4((helpers.isApplicable || (depth0 && depth0.isApplicable) || alias2).call(alias1,(depth0 != null ? depth0.remark : depth0),{"name":"isApplicable","hash":{},"data":data}))
    + "</td>\r\n            <td>"
    + alias4(((helper = (helper = helpers.statusAsOnDate || (depth0 != null ? depth0.statusAsOnDate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"statusAsOnDate","hash":{},"data":data}) : helper)))
    + "</td>\r\n        </tr> \r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "<script id=\"entry-template\" type=\"text/x-handlebars-template\">\r\n<html>\r\n<head></head>\r\n<link rel=\"stylesheet\" href=\"/email.css\">\r\n<script>\r\nHandlebars.registerHelper('formatDate', function(inputDate) {\r\n  if(inputDate) {\r\n  	let dateStr = inputDate.split(\"-\");\r\n    return dateStr[2].substring(0,2)+\"/\"+dateStr[1]+\"/\"+dateStr[0];\r\n  } else {\r\n  	return 'NA';\r\n  }\r\n});\r\nHandlebars.registerHelper('isApplicable', function(remark) {\r\n  	return remark ? remark: 'NA';\r\n});\r\n</script>\r\n<body>\r\n<span class=\"span-margin\">Dear Sir/Madam,</span>\r\n<table>\r\n    <thead> \r\n        <th>Bill Number</th> \r\n        <th>Bill Received Date</th> \r\n        <th>Bill Amount</th> \r\n		<th>Bill Status </th>\r\n		<th>Due Date for Payment</th>\r\n		<th>Remarks</th>\r\n        <th>Status As on Date</th>\r\n    </thead> \r\n    <tbody> \r\n";
  stack1 = ((helper = (helper = helpers.emails || (depth0 != null ? depth0.emails : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"emails","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),options) : helper));
  if (!helpers.emails) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </tbody> \r\n</table>\r\n<span class=\"span-margin\">Thanks & Regards,</span><br>\r\n<span class=\"span-margin\">BPC Team</span>\r\n</body>\r\n</html>\r\n</script>\r\n";
},"useData":true});
})();