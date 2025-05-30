const stripHtml = require('./stripHtml');

const summarize = (htmlContent, maxLength = 200) => {
    const content = stripHtml(htmlContent)
    return content.length > maxLength
      ? content.slice(0, maxLength) + "..."
      : content;
} 



module.exports = summarize