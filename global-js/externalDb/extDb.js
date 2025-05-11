async function sendFeedback(title, message) {
    let response = await fetch("https://pzqiqnbzcmmmxrovnnit.supabase.co/functions/v1/feedback", {
    method: "POST",
    body: JSON.stringify({
        title: title,
        message: message
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
    }
    }).then((response) => response.json());
    console.log(response);
    
    return response;
}

async function sendFirmware(rm, country_code, country_info, fw_info, file_name, link, credits, notes) {
    let response = await fetch("https://pzqiqnbzcmmmxrovnnit.supabase.co/functions/v1/firmware-receive", {
    method: "POST",
    body: JSON.stringify({
        rm: rm,
        country_code: country_code,
        country_info: country_info,
        fw_info: fw_info,
        file_name: file_name,
        link: link,
        credits: credits,
        notes: notes
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
    }
    }).then((response) => response.json());
    
    return response;
}