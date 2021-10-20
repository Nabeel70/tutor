let addonsData = _tutorobject.addons_data;

const addonsList = document.getElementById('tutor-free-addons');
const searchBar = document.getElementById('free-addons-search');
let freeAddonsList = _tutorobject.addons_data || [];
let searchString = '';
const emptyStateImg = `${_tutorobject.tutor_url}assets/images/empty-state.svg`;

if (null !== searchBar) {
    searchBar.addEventListener('input', (e) => {
        searchString = e.target.value.toLowerCase();
        const filteredAddons = freeAddonsList.filter((addon) => {
            return (
                addon.name.toLowerCase().includes(searchString)
            );
        });
    
        if (filteredAddons.length > 0) {
            displayAddons(filteredAddons);
        } else {
            emptySearch();
        }
    });
}

const emptySearch = () => {
    const nothingFound = `
        <div class="tutor-addons-card empty-state tutor-py-20">
            <div class="card-body">
                <img src=${emptyStateImg} alt="empty state illustration" />
                <div class="text-medium-caption tutor-mb-20">Nothing Found!</div>
            </div>
        </div>`;
       if ( null !== addonsList ) {
           addonsList.innerHTML = nothingFound;
       }
};

const displayAddons = (addons) => {
    const htmlString = addons.map((addon) => {
        const { name, url, description } = addon;
        const themeumUrl = 'https://www.themeum.com';
        const author = 'Themeum'
        return `
            <div class="tutor-addons-card">
                <div class="card-body tutor-px-30 tutor-py-40">
                    <div class="addon-logo">
                        <img src="${url}" alt="${name}" /> 
                    </div>
                    <div class="addon-title tutor-mt-20">
                        <h5 class="text-medium-h5 color-text-primary">${name}</h5>
                        <p class="text-medium-small color-text-hints tutor-mt-5">
                            By <a href="${themeumUrl}" class="color-brand-wordpress">${author}</a>
                        </p>
                    </div>
                    <div class="addon-des text-regular-body color-text-subsued tutor-mt-20">
                        <p>${description}</p>
                    </div>
                </div>
            </div>`;
    }).join('');
    if ( null !== addonsList ) {
        addons.length < 3 ? addonsList.classList.add('is-less-items') : addonsList.classList.remove('is-less-items');
        addonsList.innerHTML = htmlString;
    }
};

displayAddons(freeAddonsList);