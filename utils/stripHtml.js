const stripHtml = (html) => {
    return html.replace(/<[^>]*>?/gm, "");
}


module.exports = stripHtml