const TabsBtn = document.querySelectorAll('.nav_item-btn');
const TabsItems = document.querySelectorAll('.tab-content')

TabsBtn.forEach(function(item){
    item.addEventListener('click', function(){
        let currentBtn = item;
        let tabId = currentBtn.getAttribute('data-tab');
        let currentTab = document.querySelector(tabId);
        
        if( ! currentBtn.classList.contains('active')){

        TabsBtn.forEach(function(item){
            item.classList.remove('active')
        })

        TabsItems.forEach(function(item){
            item.classList.remove('active')
        })

        currentBtn.classList.add('active');
        currentTab.classList.add('active');
    }
    })
})

document.querySelector('.nav_item-btn').click();