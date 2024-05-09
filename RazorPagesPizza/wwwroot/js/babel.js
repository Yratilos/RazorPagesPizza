var cookie = document.cookie.split('; ');
var language = cookie.find(s => s.includes('.AspNetCore.Culture'));
if (language) {
    $('input:radio[name=language]').each(function (i, e) {
        if (language.includes(e.value)) {
            e.checked = true;
        }
    });
} else {
    $('input:radio[name=language]:first').attr('checked', true)
}
$('input:radio[name=language]').click(function (e) {
    var value = e.target.value;
    if (value) {
        var content;
        if (value == 'en-US') {
            content = '.AspNetCore.Culture=c=en-US|uic=en-US';
        } else {
            content = '.AspNetCore.Culture=c=zh-CN|uic=zh-CN';
        }
        if (!cookie.some(s => s == content)) {
            document.cookie = content;
        }
    }
});