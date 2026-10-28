const directoryCategories = [
    {
        id: 'programming', title: 'البرمجة', icon: 'fa-code', description: 'مسارات وقنوات لتعلّم البرمجة من الأساسيات إلى التطبيق.', keywords: 'Python HTML CSS JavaScript تطبيقات ويب قواعد بيانات ذكاء اصطناعي',
        items: [
            ['مسار Python مع أكاديمية الزيرو','أكاديمية الزيرو','دورة مرتبة من أساسيات بايثون إلى موضوعات متقدمة، ومعها خطة دراسة وتمارين.','https://elzero.org/category/courses/mastering-python/','مسار رسمي'],
            ['أساسيات البرمجة مع الزيرو','Elzero Web School','مدخل للمفاهيم الأساسية وطريقة التفكير البرمجي قبل اختيار التخصص.','https://elzero.org/category/courses/before-programming/','مسار رسمي'],
            ['تعلّم HTML','Elzero Web School','ابدأ ببناء هيكل صفحات الويب، ثم طبّق بإنشاء صفحة بسيطة.','https://elzero.org/category/courses/html-course/','مسار رسمي'],
            ['تعلّم CSS وتصميم الويب','Elzero Web School','تعرّف على تنسيق الصفحات والألوان والتخطيطات المتجاوبة.','https://elzero.org/category/courses/css-course/','مسار رسمي'],
            ['تعلّم JavaScript','Elzero Web School','ابدأ بأساسيات اللغة ثم أضف التفاعل إلى صفحات الويب.','https://elzero.org/category/courses/javascript/','مسار رسمي'],
            ['تطوير الويب من الواجهة إلى الخلفية','مصادر متنوعة','مسار مقترح: HTML وCSS وJavaScript، ثم خادم وقاعدة بيانات ومشروع تطبيقي.','https://www.youtube.com/results?search_query=تطوير+ويب+كامل+بالعربي+HTML+CSS+JavaScript','بحث يوتيوب'],
            ['تطوير تطبيقات الجوال','Flutter / Android','استكشف أساسيات Flutter أو Android، واختر مسارًا واحدًا للتطبيق العملي.','https://www.youtube.com/results?search_query=تعلم+Flutter+بالعربي+كورس+كامل','بحث يوتيوب'],
            ['قواعد البيانات وSQL','مصادر متنوعة','تعلّم الجداول والعلاقات والاستعلامات، وجرّب SQL على قاعدة بيانات تدريبية.','https://elzero.org/category/courses/mysql-essential-training/','دورة رسمية'],
            ['Git وGitHub','Elzero Web School','تعلّم حفظ نسخ المشاريع ومتابعة التغييرات ومشاركة الكود.','https://elzero.org/category/courses/git-and-github/','دورة رسمية'],
            ['الذكاء الاصطناعي وعلوم البيانات','مسار إضافي مقترح','بعد أساسيات البرمجة، استكشف Python وتحليل البيانات ومفاهيم الذكاء الاصطناعي.','https://www.youtube.com/results?search_query=مقدمة+الذكاء+الاصطناعي+علوم+البيانات+بالعربي','بحث يوتيوب']
        ]
    },
    {
        id: 'secondary', title: 'مواد المرحلة الثانوية', icon: 'fa-school', description: 'مصادر المواد الأساسية للمرحلة الثانوية، مع روابط بحث تساعد على اختيار الصف والمسار.', keywords: 'ثانوي أحياء فيزياء كيمياء رياضيات إنجليزي عربي أحياء تقنية',
        items: [
            ['الأحياء','عين دروس — المنهج السعودي','ابحث عن شرح الأحياء حسب الصف والفصل الدراسي.','https://www.youtube.com/results?search_query=عين+دروس+أحياء+ثانوي+السعودية','بحث يوتيوب'],
            ['شرح الأحياء مع قناة شاطرة','قناة شاطرة','ابحث عن سلسلة الشرح الكاملة، وتأكد من مطابقتها للصف والمنهج.','https://www.youtube.com/results?search_query=قناة+شاطرة+شرح+الأحياء+كامل+ثانوي','بحث يوتيوب'],
            ['الفيزياء','عين دروس — المنهج السعودي','مصادر شرح ومراجعة الفيزياء للمرحلة الثانوية.','https://www.youtube.com/results?search_query=عين+دروس+فيزياء+ثانوي+السعودية','بحث يوتيوب'],
            ['الكيمياء','عين دروس — المنهج السعودي','ابحث باسم الوحدة أو الدرس للوصول إلى الشرح المناسب.','https://www.youtube.com/results?search_query=عين+دروس+كيمياء+ثانوي+السعودية','بحث يوتيوب'],
            ['الرياضيات','عين دروس — المنهج السعودي','شرح موضوعات الرياضيات للصفوف والمسارات الثانوية.','https://www.youtube.com/results?search_query=عين+دروس+رياضيات+ثانوي+السعودية','بحث يوتيوب'],
            ['اللغة الإنجليزية','عين دروس — المنهج السعودي','مراجعات اللغة الإنجليزية بحسب الصف والفصل.','https://www.youtube.com/results?search_query=عين+دروس+انجليزي+ثانوي+السعودية','بحث يوتيوب'],
            ['اللغة العربية والكفايات','عين دروس — المنهج السعودي','مصادر للنحو والقراءة والكتابة والكفايات اللغوية.','https://www.youtube.com/results?search_query=عين+دروس+كفايات+لغوية+ثانوي+السعودية','بحث يوتيوب'],
            ['التقنية الرقمية','عين دروس — المنهج السعودي','ابحث عن دروس التقنية والمهارات الرقمية للمرحلة الثانوية.','https://www.youtube.com/results?search_query=عين+دروس+تقنية+رقمية+ثانوي+السعودية','بحث يوتيوب'],
            ['كل المواد وقوائم الدروس','عين دروس','بوابة رسمية للدروس؛ تأكد من تحديد الصف والمنهج المطلوب.','https://www.ientv.edu.sa/ar/doros','بوابة عين الرسمية']
        ]
    },
    {
        id: 'cybersecurity', title: 'الأمن السيبراني', icon: 'fa-shield-halved', description: 'ابدأ بالتوعية والحماية، ثم انتقل إلى أساسيات الشبكات والتدريب القانوني.', keywords: 'أمن سيبراني حماية حسابات تصيد شبكات اختراق قانوني Saudi CERT',
        items: [
            ['مدخل إلى الأمن السيبراني','المركز الوطني الإرشادي للأمن السيبراني','مقطع تعريفي عن مفهوم الأمن السيبراني وأهميته للأفراد والجهات.','https://www.youtube.com/watch?v=teKrdbM-gJ0','مقطع توعوي'],
            ['حماية الحسابات والتعرّف على التصيّد','Saudi CERT ومصادر توعوية','تعرّف على كلمات المرور القوية، التحقق المتعدد، والرسائل والروابط المشبوهة.','https://www.youtube.com/results?search_query=المركز+الوطني+الإرشادي+للأمن+السيبراني+التصيد+حماية+الحسابات','بحث يوتيوب'],
            ['أساسيات الشبكات','مسار تمهيدي','افهم عناوين IP وDNS وHTTP ومكوّنات الشبكة قبل التخصص.','https://www.youtube.com/results?search_query=أساسيات+الشبكات+للمبتدئين+بالعربي','بحث يوتيوب'],
            ['مبادئ الأمن الدفاعي','مسار تمهيدي','استكشف إدارة الثغرات والاستجابة للحوادث ومبادئ حماية الأنظمة.','https://www.youtube.com/results?search_query=مقدمة+الأمن+السيبراني+الدفاعي+بالعربي','بحث يوتيوب'],
            ['تدريب عملي قانوني','مختبرات تعليمية','تدرّب فقط في مختبرات تملكها أو تملك تصريحًا صريحًا لاختبارها.','https://tryhackme.com/','منصة تدريب']
        ]
    },
    {
        id: 'middle', title: 'مواد المرحلة المتوسطة', icon: 'fa-book-open', description: 'بطاقات للمواد الأساسية، ويمكن لاحقًا إضافة روابط أدق لكل صف وفصل.', keywords: 'متوسط علوم رياضيات لغتي إنجليزي اجتماعيات إسلامية تقنية',
        items: [
            ['الرياضيات','عين دروس — المنهج السعودي','اختر الصف والدرس، ثم راجع الأمثلة وحل أسئلة إضافية.','https://www.youtube.com/results?search_query=عين+دروس+رياضيات+متوسط+السعودية','بحث يوتيوب'],
            ['العلوم','عين دروس — المنهج السعودي','شروحات العلوم ومراجعة المفاهيم والتجارب.','https://www.youtube.com/results?search_query=عين+دروس+علوم+متوسط+السعودية','بحث يوتيوب'],
            ['لغتي الخالدة','عين دروس — المنهج السعودي','دروس القراءة والنحو والكتابة بحسب الصف.','https://www.youtube.com/results?search_query=عين+دروس+لغتي+الخالدة+متوسط+السعودية','بحث يوتيوب'],
            ['اللغة الإنجليزية','عين دروس — المنهج السعودي','مراجعة المفردات والقواعد والاستماع للمرحلة المتوسطة.','https://www.youtube.com/results?search_query=عين+دروس+انجليزي+متوسط+السعودية','بحث يوتيوب'],
            ['الدراسات الاجتماعية','عين دروس — المنهج السعودي','ابحث عن تاريخ وجغرافيا ومواطنة بحسب الوحدة الدراسية.','https://www.youtube.com/results?search_query=عين+دروس+دراسات+اجتماعية+متوسط+السعودية','بحث يوتيوب'],
            ['الدراسات الإسلامية','عين دروس — المنهج السعودي','مصادر الدروس والمراجعة حسب المادة والصف.','https://www.youtube.com/results?search_query=عين+دروس+دراسات+إسلامية+متوسط+السعودية','بحث يوتيوب'],
            ['المهارات الرقمية','عين دروس — المنهج السعودي','مفاهيم الحاسب والمهارات الرقمية والتطبيق العملي.','https://www.youtube.com/results?search_query=عين+دروس+مهارات+رقمية+متوسط+السعودية','بحث يوتيوب'],
            ['كل المواد وقوائم الدروس','عين دروس','بوابة الدروس التعليمية للمناهج؛ اختر المرحلة والصف.','https://www.ientv.edu.sa/ar/doros','بوابة عين الرسمية']
        ]
    },
    {
        id: 'primary', title: 'مواد المرحلة الابتدائية', icon: 'fa-pencil', description: 'مصادر تأسيسية للمراحل والمواد الابتدائية، بروابط بحث حسب الصف.', keywords: 'ابتدائي رياضيات لغتي علوم انجليزي إسلامية مهارات رقمية',
        items: [
            ['لغتي','عين دروس — المنهج السعودي','قراءة وكتابة ومفردات وتدريبات مناسبة للصف.','https://www.youtube.com/results?search_query=عين+دروس+لغتي+ابتدائي+السعودية','بحث يوتيوب'],
            ['الرياضيات','عين دروس — المنهج السعودي','تأسيس في الأعداد والعمليات والهندسة وحل المسائل.','https://www.youtube.com/results?search_query=عين+دروس+رياضيات+ابتدائي+السعودية','بحث يوتيوب'],
            ['العلوم','عين دروس — المنهج السعودي','دروس مبسطة في العلوم والطبيعة والتجارب.','https://www.youtube.com/results?search_query=عين+دروس+علوم+ابتدائي+السعودية','بحث يوتيوب'],
            ['اللغة الإنجليزية','عين دروس — المنهج السعودي','مفردات ومحادثات وقواعد تأسيسية.','https://www.youtube.com/results?search_query=عين+دروس+انجليزي+ابتدائي+السعودية','بحث يوتيوب'],
            ['الدراسات الإسلامية','عين دروس — المنهج السعودي','مصادر تعليمية بحسب الصف والوحدة.','https://www.youtube.com/results?search_query=عين+دروس+دراسات+إسلامية+ابتدائي+السعودية','بحث يوتيوب'],
            ['المهارات الرقمية','عين دروس — المنهج السعودي','أساسيات التقنية والاستخدام الآمن للأجهزة والإنترنت.','https://www.youtube.com/results?search_query=عين+دروس+مهارات+رقمية+ابتدائي+السعودية','بحث يوتيوب'],
            ['كل المواد وقوائم الدروس','عين دروس','بوابة الدروس التعليمية للمناهج؛ اختر المرحلة والصف.','https://www.ientv.edu.sa/ar/doros','بوابة عين الرسمية']
        ]
    },
    {
        id: 'english', title: 'اللغة الإنجليزية', icon: 'fa-language', description: 'مسارات وقنوات مقترحة حسب مستوى اللغة، من البداية إلى المحتوى المتقدم.', keywords: 'إنجليزي إنجليزي English مبتدئ متوسط متقدم A1 B1 C1 ZAmericanEnglish BBC TED',
        items: [
            ['مبتدئ — من الصفر إلى A2','ZAmericanEnglish','ابدأ بالحروف والنطق والمفردات والقواعد الأساسية، وتقدم درسًا بعد درس.','https://www.youtube.com/@ZAmericanEnglish','قناة يوتيوب'],
            ['متوسط — B1 إلى B2','BBC Learning English','تدرب على الاستماع والمفردات والقواعد من مقاطع قصيرة باللغة الإنجليزية.','https://www.youtube.com/user/bbclearningenglish','قناة يوتيوب'],
            ['متقدم — C1 وما فوق','TED-Ed ومواد باللغة الأصلية','وسّع مفرداتك واستيعابك عبر محاضرات وموضوعات متنوعة باللغة الإنجليزية.','https://www.youtube.com/@TEDEd','قناة يوتيوب'],
            ['تحديد المستوى وخطة التعلّم','British Council LearnEnglish','مواد وتمارين منظمة تساعد على اختيار نقطة البداية المناسبة.','https://learnenglish.britishcouncil.org/','موقع تعليمي']
        ]
    },
    {
        id: 'podcasts', title: 'البودكاست', icon: 'fa-podcast', description: 'اختر موضوع الحلقة: نفسي، ثقافي، تقني، أو تطوير ذات.', keywords: 'بودكاست نفسي مقابلات ثقافة برمجة تقنية تطوير ذات محمد الخالدي',
        items: [
            ['بودكاست نفسي وتوازن','موضوعات الصحة النفسية','ابحث عن حلقات توعوية يقدمها مختصون، وتحقق من مؤهلات المتحدث عند تناول موضوع صحي.','https://www.youtube.com/results?search_query=بودكاست+الصحة+النفسية+مختص','بحث يوتيوب'],
            ['حوارات وثقافة','بودكاست فنجان — ثمانية','حوارات طويلة مع ضيوف من مجالات وثقافية وتجارب مختلفة.','https://www.youtube.com/@thmanyah','قناة ثمانية'],
            ['تقنية وبرمجة','حوارات تقنية','حلقات عن التقنية والبرمجة والذكاء الاصطناعي وتجارب العاملين في المجال.','https://www.youtube.com/results?search_query=بودكاست+برمجة+تقنية+عربي','بحث يوتيوب'],
            ['تطوير الذات والمهارات','تطوير الذات','استكشف حلقات عن العادات والتواصل والتعلّم والعمل، وانتقِ ما يناسبك.','https://www.youtube.com/results?search_query=بودكاست+تطوير+الذات+عربي','بحث يوتيوب'],
            ['حلقات محمد الخالدي','بحث بالاسم','اسم محمد الخالدي يعود لأكثر من شخص؛ تحقق من المقدم والبرنامج قبل متابعة الحلقات.','https://www.youtube.com/results?search_query=بودكاست+محمد+الخالدي','بحث يوتيوب']
        ]
    }
];

const categoryGrid = document.getElementById('categoryGrid');
const landing = document.getElementById('categoryLanding');
const resourcesView = document.getElementById('resourcesView');
const searchResultsView = document.getElementById('searchResultsView');
const directorySearch = document.getElementById('directorySearch');
const resourcesGrid = document.getElementById('resourcesGrid');
const searchResultsGrid = document.getElementById('searchResultsGrid');
const searchEmpty = document.getElementById('searchEmpty');
const categoriesEmpty = document.getElementById('categoriesEmpty');
const resourceEmpty = document.getElementById('resourceEmpty');
const futureSections = document.getElementById('futureSections');
let currentCategory = null;

function makeResourceCard(resource, category) {
    const [title, source, summary, url, type, thumbnail] = resource;
    const article = document.createElement('article');
    article.className = 'course-card';
    article.dataset.search = `${title} ${source} ${summary} ${category.title} ${category.keywords}`.toLocaleLowerCase('ar');
    const top = document.createElement('div');
    top.className = 'course-card-top';
    const tag = document.createElement('span');
    tag.className = 'course-tag';
    tag.textContent = source;
    const icon = document.createElement('i');
    icon.className = `fas ${category.icon}`;
    top.append(tag, icon);
    const coverLink = document.createElement('a');
    coverLink.className = 'course-cover-link';
    coverLink.href = url;
    coverLink.target = '_blank';
    coverLink.rel = 'noopener noreferrer';
    coverLink.setAttribute('aria-label', `فتح ${source}: ${title}`);
    const cover = document.createElement('div');
    cover.className = 'course-cover';
    const youtubeVideoId = url.match(/[?&]v=([\w-]+)/)?.[1];
    const imageUrl = thumbnail || (youtubeVideoId ? `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg` : '');
    if (imageUrl) {
        const image = document.createElement('img');
        image.src = imageUrl;
        image.alt = `صورة مرتبطة بـ ${source}`;
        image.loading = 'lazy';
        image.referrerPolicy = 'no-referrer';
        image.addEventListener('error', () => {
            cover.classList.add('course-cover-fallback');
            image.remove();
        }, { once: true });
        cover.append(image);
    } else {
        cover.classList.add('course-cover-fallback');
    }
    const coverBadge = document.createElement('span');
    coverBadge.className = 'course-cover-badge';
    coverBadge.innerHTML = `<i class="fas ${category.icon}" aria-hidden="true"></i>`;
    const coverLabel = document.createElement('span');
    coverLabel.className = 'course-cover-label';
    coverLabel.textContent = source;
    cover.append(coverBadge, coverLabel);
    coverLink.append(cover);
    const heading = document.createElement('h3');
    heading.textContent = title;
    const text = document.createElement('p');
    text.className = 'course-summary';
    text.textContent = summary;
    const link = document.createElement('a');
    link.className = 'watch-course link-button';
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.innerHTML = '<i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>';
    link.append(document.createTextNode(` ${type}`));
    article.append(coverLink, top, heading, text, link);
    return article;
}

function renderCategories() {
    categoryGrid.replaceChildren();
    directoryCategories.forEach(category => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'directory-category-card';
        button.dataset.search = `${category.title} ${category.description} ${category.keywords}`.toLocaleLowerCase('ar');
        const icon = document.createElement('span');
        icon.className = 'directory-category-icon';
        icon.innerHTML = `<i class="fas ${category.icon}" aria-hidden="true"></i>`;
        const title = document.createElement('strong');
        title.textContent = category.title;
        const description = document.createElement('span');
        description.textContent = category.description;
        const count = document.createElement('small');
        count.textContent = `${category.items.length} بطاقات`;
        button.append(icon, title, description, count);
        button.addEventListener('click', () => openCategory(category.id));
        categoryGrid.append(button);
    });
}

function openCategory(id) {
    currentCategory = directoryCategories.find(category => category.id === id);
    if (!currentCategory) return;
    document.getElementById('resourceCategoryTitle').textContent = currentCategory.title;
    document.getElementById('resourceCategoryDescription').textContent = currentCategory.description;
    document.getElementById('resourceCount').textContent = `${currentCategory.items.length} بطاقات`;
    resourcesGrid.replaceChildren(...currentCategory.items.map(item => makeResourceCard(item, currentCategory)));
    landing.hidden = true;
    searchResultsView.hidden = true;
    resourcesView.hidden = false;
    futureSections.hidden = true;
    directorySearch.value = '';
    resourceEmpty.hidden = true;
    document.getElementById('backToCategories').focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showSearchResults(query) {
    const normalized = query.toLocaleLowerCase('ar');
    const matching = [];
    directoryCategories.forEach(category => {
        category.items.forEach(item => {
            const haystack = `${category.title} ${category.keywords} ${item.join(' ')}`.toLocaleLowerCase('ar');
            if (haystack.includes(normalized)) matching.push({ item, category });
        });
    });
    searchResultsGrid.replaceChildren(...matching.map(({ item, category }) => makeResourceCard(item, category)));
    landing.hidden = true;
    resourcesView.hidden = true;
    searchResultsView.hidden = false;
    futureSections.hidden = true;
    searchEmpty.hidden = matching.length > 0;
}

renderCategories();

directorySearch.addEventListener('input', () => {
    const query = directorySearch.value.trim();
    currentCategory = null;
    if (query) {
        showSearchResults(query);
        return;
    }
    searchResultsView.hidden = true;
    resourcesView.hidden = true;
    landing.hidden = false;
    futureSections.hidden = false;
    [...categoryGrid.children].forEach(card => { card.hidden = false; });
    categoriesEmpty.hidden = true;
});

directorySearch.addEventListener('keydown', event => {
    if (event.key === 'Enter' && directorySearch.value.trim()) showSearchResults(directorySearch.value.trim());
    if (event.key === 'Escape') {
        directorySearch.value = '';
        directorySearch.dispatchEvent(new Event('input'));
    }
});

document.getElementById('backToCategories').addEventListener('click', () => {
    currentCategory = null;
    resourcesView.hidden = true;
    landing.hidden = false;
    futureSections.hidden = false;
    directorySearch.value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('clearSearch').addEventListener('click', () => {
    directorySearch.value = '';
    directorySearch.dispatchEvent(new Event('input'));
    directorySearch.focus();
});
