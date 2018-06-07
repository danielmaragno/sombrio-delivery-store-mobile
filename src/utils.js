import Moment from 'moment';

export function formatMonetary(price){
	return (price/100).toFixed(2).replace(".",",")
}

export function formatDateTime(date){
	return Moment(date).format('DD/MM/YYYY HH:mm');
}

export function formatDate(date){
	return Moment(date).format('DD/MM/YYYY');	
}
export function formatTime(date){
	return Moment(date).format('HH:mm');
}

export function formatAddress(address) {
	let formatedString = "";
	
	if(address){
		formatedString  = address.rua+", "+address.numero+"\n";
		
		if(address.complemento){
			formatedString += address.complemento+"\n"
		}
		if(address.referencia){
			formatedString += address.referencia+"\n"
		}

		formatedString += address.bairro+"\n"
		formatedString += address.cidade;

		return formatedString.trim();
	}
	
}