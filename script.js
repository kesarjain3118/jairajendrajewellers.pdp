document.addEventListener('DOMContentLoaded', () => {

// Mobile Menu Toggle
const menuIcon = document.querySelector('.menu-icon');
const mobileMenu = document.getElementById('mobile-menu');
if (menuIcon && mobileMenu) {
    menuIcon.addEventListener('click', () => {
        const isExpanded = menuIcon.getAttribute('aria-expanded') === 'true';
        menuIcon.setAttribute('aria-expanded', String(!isExpanded));
        // This now toggles the class for the slide animation
        mobileMenu.classList.toggle('is-open');
    });
}

    // GSAP Scroll Animations (for elements with .animate-on-scroll)
    // Checks if GSAP is available before running
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray('.animate-on-scroll').forEach(element => {
            gsap.from(element, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                }
            });
        });
    }


    // --------------------------------------------------
    // ---------- PRODUCT PAGE SPECIFIC SCRIPT ----------
    // --------------------------------------------------
    const productGrid = document.getElementById('product-grid-container');
    if (productGrid) {

        const products = [
            { id: 1, name: "Antique Gold Ring", price: 85000, category: "rings", desc: "A timeless gold ring with intricate hand-carved patterns, perfect for every celebration.", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/99df5ba9-e12d-4974-b0e8-47afbcd9de21.png" },
            { id: 2, name: "Diamond Choker", price: 280000, category: "necklaces", desc: "An exquisite choker adorned with hand-picked diamonds for unmatched elegance.", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/911d5d00-60ff-4480-b148-0049f5779331.png" },
            { id: 3, name: "Emerald Drop Earrings", price: 150000, category: "earrings", desc: "Lustrous emeralds in a delicate drop design that speaks of luxury and grace.", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/70083816-5b05-4e53-97b8-258c64b3d26e.png" },
            { id: 4, name: "Solitaire Engagement Ring", price: 310000, category: "rings", desc: "A brilliant solitaire diamond ring symbolizing eternal love and commitment.", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/081a4169-71b1-4049-be65-d5ace18aa45e.png" },
            { id: 5, name: "Gold Bead Necklace", price: 85000, category: "necklaces", desc: "Classic gold beads strung with precision, adding warmth to any attire.", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e944f249-cd17-49d8-94e8-97def6f301c4.png" },
            { id: 6, name: "Teardrop Diamond Earrings", price: 175000, category: "earrings", desc: "Radiant diamonds shaped like teardrops for a refined, sparkling look.", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e88ae5d9-9757-4d7c-b170-e6d4e04d9705.png" },
            { id: 7, name: "Pearl Bracelet", price: 95000, category: "bracelets", desc: "Natural pearls set in a fine gold frame, a symbol of grace and sophistication.", image: "https://images.unsplash.com/photo-1598979842524-3f0b4a7e3d68?crop=entropy&cs=tinysrgb&fit=max&w=400" },
            { id: 8, name: "Custom Jewelry Set", price: 400000, category: "custom", desc: "A one-of-a-kind jewelry set tailored to your vision, crafted by master artisans.", image: "https://images.unsplash.com/photo-1589227365531-3d98766f0e86?crop=entropy&cs=tinysrgb&fit=max&w=400" }
        ];

        let currentFilter = 'all';

        function renderProducts() {
            const filteredProducts = products.filter(p => currentFilter === 'all' || p.category === currentFilter);
            productGrid.innerHTML = '';
            filteredProducts.forEach(p => {
                const card = document.createElement('div');
                card.className = 'product-card animate-on-scroll';
                card.innerHTML = `
                  <button class="heart-icon" aria-label="Favorite ${p.name}" onclick="toggleLike(this)">
                      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                  </button>
                  <img src="${p.image}" alt="${p.name}" class="w-full h-64 object-cover" />
                  <div class="p-5">
                    <h2 class="font-playfair text-lg mb-1">${p.name}</h2>
                    <p class="font-semibold mb-2">₹${p.price.toLocaleString('en-IN')}</p>
                    <a href="javascript:void(0);" onclick='showDetails(${JSON.stringify(p)})' class="text-rich-brown hover:text-elegant-gold underline text-sm">View Details</a>
                  </div>
                `;
                productGrid.appendChild(card);
            });
        }

        renderProducts();

        // Add event listeners to filter buttons
        document.querySelectorAll('.filter-button').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('.filter-button.active').classList.remove('active');
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                renderProducts();
            });
        });

        // Modal Logic
        const modal = document.getElementById('product-modal');
        const modalBody = document.getElementById('modal-body');
        const closeModalBtn = document.getElementById('close-modal-btn');

        window.showDetails = function(product) {
            modalBody.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover mb-4 rounded">
                <h2 class="text-2xl font-playfair mb-2">${product.name}</h2>
                <p class="font-semibold text-lg mb-2">₹${product.price.toLocaleString('en-IN')}</p>
                <p class="capitalize mb-2"><strong>Category:</strong> ${product.category}</p>
                <p>${product.desc}</p>
            `;
            modal.classList.remove('hidden');
        }

        function closeModal() {
            modal.classList.add('hidden');
        }

        closeModalBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });

        // Toggle Like function
        window.toggleLike = function(button) {
            button.classList.toggle('liked');
        }
    }
});