// get all items from blog carousel
function removeDuplicatePost () {
    const carouselItems = document.querySelectorAll(".carousel__grid--blog .carousel__list .carousel__list-item");
    const pagePathname = window.location.pathname
    
    for (let i = 0; i < carouselItems.length; i++) {
        const item = carouselItems[i];
        const link = item.querySelector('a'); // Find the <a> tag within the item
    
        if (link && link.pathname === pagePathname) {
            item.remove(); // Remove the item if the link matches the pagePathname
            break; // Exit the loop after removing the item
        }
    }
}
setTimeout(removeDuplicatePost, 1000)