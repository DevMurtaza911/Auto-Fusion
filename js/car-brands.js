document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('brandSearch');
  const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
  const cards = Array.from(document.querySelectorAll('.brand-card'));
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  const applyFilters = () => {
    const query = searchInput?.value.trim().toLowerCase() || '';
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';

    cards.forEach((card) => {
      const brandName = card.dataset.brand.toLowerCase();
      const matchesFilter = activeFilter === 'all' || brandName === activeFilter.toLowerCase();
      const matchesSearch = !query || brandName.includes(query);
      card.style.display = matchesFilter && matchesSearch ? 'block' : 'none';
    });
  };

  searchInput?.addEventListener('input', applyFilters);

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      applyFilters();
    });
  });

  menuToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  const params = new URLSearchParams(window.location.search);
  const selectedBrand = params.get('brand');
  if (selectedBrand) {
    const target = cards.find((card) => card.dataset.brand.toLowerCase() === selectedBrand.toLowerCase());
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.classList.add('highlight-card');
      setTimeout(() => target.classList.remove('highlight-card'), 2200);
    }
  }
});
