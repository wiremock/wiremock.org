var faqList = document.querySelector('.faq-list');

if (faqList) {
    document.querySelectorAll('.faq-list > dd').forEach(function (dd) {
        dd.style.display = 'none';
    });

    document.querySelector('.faq-list').addEventListener('click', function (event) {
        if (event.target.tagName === 'DT') {
            var definition = event.target.nextElementSibling;
            definition.style.display = definition.style.display === 'block' ? 'none' : 'block';
        }
    });
}
