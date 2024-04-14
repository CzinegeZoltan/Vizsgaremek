async function getData(url="") {
    const response = await fetch(url, {
         method: "GET",       
        headers: {
         "Content-Type" : "application/json",
        },    
    })
    return response.json();   
}

async function postData(url="", data = {}) {
    const response = await fetch(url, {
     method: "POST",      
    headers: {
     "Content-Type":"application/json",
     "Authorization":"Bearer <token>",
    }, 
    body: JSON.stringify(data),   
})
return response;   
}
