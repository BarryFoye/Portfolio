const delayInMilliseconds = 500; //1 second

function updateTitle(data) {
    document.getElementById('headline').innerHTML = data;
}
/*  TODO: make this function generic for typing in a document 
    TODO: make the typing seem more real. Branch out to setInterval split i.e. cursor constant and typing slightly erratic.
*/
function typeTitle() {
    const title = "Hello World!";
    const cursor_show = "_";
    const cursor_hide = " ";
    var count = -1;
    var show_cursor = true;
    var typed = "";
    var idShowCursor = setInterval(() => {
        if (show_cursor) {
            document.getElementById('headline').innerHTML = typed + cursor_show;
            count++;
            show_cursor = false;
        } else {
            document.getElementById('headline').innerHTML = typed + cursor_hide;
            count++;
            show_cursor = true;
        }
        typed += addChar(title[count], Math.random() * 10); //slows down typing. 
        if (count == title.length) { clearInterval(idShowCursor); }
    }, delayInMilliseconds);
}

function addChar(data, time) {
    var typed = "";
    if (data == " ") {
        typed = data;
    } else {
        for (i = 0; i < time; i++);
        typed = data;
    }
    return typed;
}
