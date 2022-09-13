const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
// const {OBJtoXML, getDataFromXml} = require('../utils/formatData')

async function post(url, data,headers, isAddLog = false){
	const request = {url, request: data, method: 'POST'};
	try {
		const rawResult = await fetch(url, { method: 'POST', body: data , headers});
		const text = await rawResult.text();
		const result = text[0] === "{" ? JSON.parse(text) : text;
		if (isAddLog)
			addLog({ ...request, response: result });
		return result;
	} catch (e) {
		if (isAddLog)
			addLog({ ...request, response: result });
		throw e;
	}
}

async function get(baseurl, data, headers, isAddLog = false){
	const params = new URLSearchParams(data);
	const url = baseurl + (data ? '?' + params : '')
	const request = {url, request: params, method: 'GET' };
	try {
		 const result = await fetch(url, { method: 'GET', headers });
		 const text = await result.text();
		 const result_1 = text[0] === "{" ? JSON.parse(text) : text;
		 if (isAddLog)
			 addLog({ ...request, response: result_1 });
		 return result_1;
	 } catch (e) {
		 if (isAddLog)
			 addLog({ ...request, response: result });
		 throw e;
	 }
}


module.exports = {
	post,
	get
};
