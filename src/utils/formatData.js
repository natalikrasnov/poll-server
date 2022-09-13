const {} = require('./enums');

module.exports = {

    fomJsonToCSVText(data){
        const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
		const header = Object.keys(data[0])
		const csv = [
		header.join(','), // header row first
		...data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
		].join('\r\n')

		console.log(csv)
        return csv
    },
    OBJtoXML,
    replaceCreditCardNumber,
    getDataFromXml
}

function getDataFromXml(rawResult){
	//System.InvalidOperationException: Missing parameter: CustomerID.\r\n 
	if (rawResult == '0' || rawResult.startsWith('System.')) {
		const error = rawResult.split("Exception:")[1].split('.')[0]
		throw new Error( error);
	}
	let simplifiedXml = getJsonFromXML(rawResult)
	let responseClass = Object.keys(simplifiedXml).find(key => key.startsWith('Cls'));
	if(! responseClass) return {response: simplifiedXml}
	var error = simplifiedXml[responseClass].ErrorMessage;
	if (error != '' && error != undefined) {
		throw new Error(error);
	}
	let response = simplifiedXml[responseClass];
	response.raw = rawResult;
	return {response , doc_number: response.DocNumber};
}

function getJsonFromXML(json){
    const baseXml = xml.parse(json); // the dom can be JSON.stringified
    return xml.simplify(baseXml)// this will return the dom into an xml-string
}

function OBJtoXML(obj) {
    if(obj instanceof String && obj[0] === '{') obj = JSON.parse(obj)
	var xml = '';
	for (var prop in obj) {
	  xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
	  if (obj[prop] instanceof Array) {
		for (var array in obj[prop]) {
		  xml += "<" + prop + ">";
		  xml += OBJtoXML(new Object(obj[prop][array]));
		  xml += "</" + prop + ">";
		}
	  } else if (typeof obj[prop] == "object") {
		xml += OBJtoXML(new Object(obj[prop]));
	  } else {
		xml += obj[prop];
	  }
	  xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
	}
	var xml = xml.replace(/<\/?[0-9]{1,}>/g, '').replace(/(?:\\[rn])+/g, "");
	return xml
  }

function replaceCreditCardNumber(text){
    try{
        let stringifyText = text instanceof String ? text : (text instanceof URLSearchParams? text.toString():JSON.stringify(text));
        if(!stringifyText.includes("CreditCardNumber")) return text;
        if(stringifyText[0] === '{') stringifyText = OBJtoXML(text)
        let SplitedText = stringifyText.split("CreditCardNumber>")
        let finalText = ""
        for (let index = 0; index < SplitedText.length; index++) {
            if(index%2 === 0) 
                finalText += SplitedText[index] + (index < SplitedText.length-1 ?"CreditCardNumber></CreditCardNumber>":"")    
        }

         return text instanceof String? finalText: getJsonFromXML(finalText) 
    }catch(e){
        console.error("error delete credit card number")
        return text
    }
   return text;
}