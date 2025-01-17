async function send_message(result)
{
    const response = await chrome.runtime.sendMessage({state: result});
    // do something with response here, not outside the function
    console.log(response);
};

document.addEventListener("click", (event) => {
    console.log(event.target.id);
    send_message(event.target.id)

});