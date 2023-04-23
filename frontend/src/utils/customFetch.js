import Cookies from "js-cookie";

// required params = {url, callback_with_data, method}
// not required params = {callback_error_response, content_type}
async function baseFetch(params) {
    let fetch_params = {
        headers: {'Authorization': 'Token ' + Cookies.get('token')},
        method: params.method,
    }

    if (params.content_type !== undefined) {
        fetch_params.headers['Content-Type'] = params.content_type;
    }

    if (params.body !== undefined) {
        fetch_params.body = params.body
    }

    await fetch(params.url, fetch_params)
        .then(response => {
            if (Math.floor(response.status / 100) === 2 ) {
                return response.json()
            }
            else {
                if (params.callback_error_response !== undefined) {
                    params.callback_error_response(response)
                }
            }
        })
        .then(response => params.callback_with_data(response))
    }


// required params = {url, callback_with_data}
// not required params = {callback_error_response}
async function customFetchGet(params) {
    await baseFetch({
        'url': params.url,
        'method': 'GET',
        'callback_with_data': params.callback_with_data,
        'callback_error_response': params.callback_error_response,
    })
}


// required params = {url, callback_with_data}
// not required params = {callback_error_response, content_type}
async function customFetchPatch(params) {
    await baseFetch({
        'url': params.url,
        'method': 'PATCH',
        'callback_with_data': params.callback_with_data,
        'callback_error_response': params.callback_error_response,
        'content_type': params.content_type,
    })
}


// required params = {url, callback_with_data}
// not required params = {callback_error_response, content_type}
async function customFetchPost(params) {
    await baseFetch({
        'url': params.url,
        'method': 'POST',
        'callback_with_data': params.callback_with_data,
        'callback_error_response': params.callback_error_response,
        'content_type': params.content_type,
    })
}


// required params = {url, callback_with_data}
// not required params = {callback_error_response}
async function customFetchDelete(params) {
    await baseFetch({
        'url': params.url,
        'method': 'DELETE',
        'callback_with_data': params.callback_with_data,
        'callback_error_response': params.callback_error_response,
    })
}


export { customFetchGet, customFetchPatch, customFetchDelete, customFetchPost }
