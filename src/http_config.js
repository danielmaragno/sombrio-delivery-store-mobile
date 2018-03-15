// export const base_url = "scdelivery.com.br:8080"
// export const http_url = "https://"+base_url

export const base_url = "192.168.0.111"
export const http_url = "http://"+base_url

export function request(url, method, body, token=null) {
	return fetch( http_url+'/api'+url,
			{
				method: method,
				headers: {
				    Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': token
				},
				body: JSON.stringify(body)
			}
		)
}

export function request_get(url, token=null){
	return fetch( http_url+'/api'+url,
			{
				method: 'GET',
				headers: {
				    Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': token
				}
			}
		)
}