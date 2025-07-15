// Gallery navigation functionality
document.addEventListener("DOMContentLoaded", function () {
	const gallery = document.querySelector(".image-gallery");
	const leftBtn = document.querySelector(".gallery-nav-left");
	const rightBtn = document.querySelector(".gallery-nav-right");

	if (!gallery || !leftBtn || !rightBtn) return;

	// Calculate scroll amount based on image width + gap
	const scrollAmount = 187; // 180px image width + 7px gap

	// Check if we need to show navigation buttons
    function updateButtonVisibility() {
		const canScrollLeft = gallery.scrollLeft > 0;
		const canScrollRight =
			gallery.scrollLeft < gallery.scrollWidth - gallery.clientWidth;

		leftBtn.disabled = !canScrollLeft;
		rightBtn.disabled = !canScrollRight;
	}

	// Scroll left
	leftBtn.addEventListener("click", function () {
		gallery.scrollBy({
			left: -scrollAmount,
			behavior: "smooth",
		});
	});

	// Scroll right
	rightBtn.addEventListener("click", function () {
		gallery.scrollBy({
			left: scrollAmount,
			behavior: "smooth",
		});
	});

	// Update button states on scroll
	gallery.addEventListener("scroll", updateButtonVisibility);

	// Initial button state
	updateButtonVisibility();

	// Update button states on window resize
	window.addEventListener("resize", updateButtonVisibility);
});
