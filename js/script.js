document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'home.html';

  document.querySelectorAll('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href.toLowerCase() === currentPage.toLowerCase()) {
      link.classList.add('active');
    }
  });

  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  const clearFieldError = (field) => {
    field.classList.remove('input-error');
    const errorField = document.getElementById(`${field.id}Error`);
    if (errorField) {
      errorField.textContent = '';
    }
  };

  const setFieldError = (field, message) => {
    field.classList.add('input-error');
    const errorField = document.getElementById(`${field.id}Error`);
    if (errorField) {
      errorField.textContent = message;
    }
  };

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      let valid = true;

      if (nameInput) {
        clearFieldError(nameInput);
        if (!nameInput.value.trim()) {
          setFieldError(nameInput, 'Please enter your name.');
          valid = false;
        }
      }

      if (emailInput) {
        clearFieldError(emailInput);
        const emailValue = emailInput.value.trim();
        if (!emailValue) {
          setFieldError(emailInput, 'Please enter your email address.');
          valid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(emailValue)) {
          setFieldError(emailInput, 'Please enter a valid email address.');
          valid = false;
        }
      }

      if (messageInput) {
        clearFieldError(messageInput);
        if (!messageInput.value.trim()) {
          setFieldError(messageInput, 'Please enter your message.');
          valid = false;
        }
      }

      if (!valid) {
        if (formStatus) {
          formStatus.textContent = 'Please fix the errors above before sending.';
          formStatus.classList.add('error');
        }
        return;
      }

      if (formStatus) {
        formStatus.textContent = 'Thank you! Your message has been sent successfully.';
        formStatus.classList.remove('error');
      }

      contactForm.reset();
    });
  }

  const modelSearch = document.getElementById('modelSearch');
  const brandFilter = document.getElementById('brandFilter');
  const priceFilter = document.getElementById('priceFilter');
  const fuelFilter = document.getElementById('fuelFilter');
  const transmissionFilter = document.getElementById('transmissionFilter');
  const clearFilters = document.getElementById('clearFilters');
  const cards = Array.from(document.querySelectorAll('.car-card'));
  const modal = document.getElementById('vehicleModal');
  const closeModal = document.getElementById('closeModal');

  const applyFilters = () => {
    const searchValue = modelSearch ? modelSearch.value.trim().toLowerCase() : '';
    const brandValue = brandFilter ? brandFilter.value : '';
    const priceValue = priceFilter ? priceFilter.value : '';
    const fuelValue = fuelFilter ? fuelFilter.value : '';
    const transmissionValue = transmissionFilter ? transmissionFilter.value : '';

    cards.forEach((card) => {
      const matchesSearch = card.dataset.model.toLowerCase().includes(searchValue);
      const matchesBrand = !brandValue || card.dataset.brand === brandValue;
      const matchesFuel = !fuelValue || card.dataset.fuel === fuelValue;
      const matchesTransmission = !transmissionValue || card.dataset.transmission === transmissionValue;

      let matchesPrice = true;
      if (priceValue === 'under25') {
        matchesPrice = Number(card.dataset.price) < 25000;
      } else if (priceValue === '25to40') {
        matchesPrice = Number(card.dataset.price) >= 25000 && Number(card.dataset.price) <= 40000;
      } else if (priceValue === 'over40') {
        matchesPrice = Number(card.dataset.price) > 40000;
      }

      const shouldShow = matchesSearch && matchesBrand && matchesFuel && matchesTransmission && matchesPrice;
      card.style.display = shouldShow ? 'block' : 'none';
    });
  };

  [modelSearch, brandFilter, priceFilter, fuelFilter, transmissionFilter].forEach((element) => {
    element?.addEventListener('input', applyFilters);
    element?.addEventListener('change', applyFilters);
  });

  clearFilters?.addEventListener('click', () => {
    if (modelSearch) modelSearch.value = '';
    if (brandFilter) brandFilter.value = '';
    if (priceFilter) priceFilter.value = '';
    if (fuelFilter) fuelFilter.value = '';
    if (transmissionFilter) transmissionFilter.value = '';
    applyFilters();
  });

  document.querySelectorAll('.view-details-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.car-card');
      if (!card) return;

      document.getElementById('modalTitle').textContent = card.dataset.model;
      document.getElementById('modalPrice').textContent = `$${Number(card.dataset.price).toLocaleString()}`;
      document.getElementById('modalEngine').textContent = card.dataset.engine;
      document.getElementById('modalFuel').textContent = card.dataset.fuel;
      document.getElementById('modalTransmission').textContent = card.dataset.transmission;
      document.getElementById('modalMileage').textContent = card.dataset.mileage;
      document.getElementById('modalSeating').textContent = card.dataset.seating;
      document.getElementById('modalAvailability').textContent = card.dataset.availability;
      document.getElementById('modalFeatures').textContent = card.dataset.features;
      document.getElementById('modalColors').textContent = card.dataset.colors;
      document.getElementById('modalEconomy').textContent = card.dataset.economy;
      document.getElementById('modalWarranty').textContent = card.dataset.warranty;
      document.getElementById('modalLocation').textContent = card.dataset.location;
      document.getElementById('modalFinance').textContent = card.dataset.finance;

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  const closeModalWindow = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  };

  closeModal?.addEventListener('click', closeModalWindow);
  modal?.addEventListener('click', (event) => {
    if (event.target === modal) closeModalWindow();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModalWindow();
  });

  document.querySelector('.compare-btn')?.addEventListener('click', (event) => {
    const button = event.currentTarget;
    const originalText = button.textContent;
    button.textContent = 'Added to Compare';
    setTimeout(() => {
      button.textContent = originalText;
    }, 1400);
  });

  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  menuToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  const revealItems = Array.from(document.querySelectorAll('.reveal, .count'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('visible');

      if (entry.target.classList.contains('count')) {
        const target = Number(entry.target.dataset.target || 0);
        if (entry.target.dataset.animated === 'true') return;
        entry.target.dataset.animated = 'true';

        let value = 0;
        const step = Math.max(1, Math.ceil(target / 30));
        const counter = setInterval(() => {
          value += step;
          if (value >= target) {
            entry.target.textContent = target;
            clearInterval(counter);
          } else {
            entry.target.textContent = value;
          }
        }, 40);
      }
    });
  }, { threshold: 0.2 });

  revealItems.forEach((item) => observer.observe(item));

  const comparePage = document.getElementById('compareTableBody');
  if (comparePage) {
    const carCatalog = [
      {
        id: 'honda-civic',
        brand: 'Honda',
        model: 'Civic',
        year: 2024,
        price: 4590000,
        maintenanceCost: 32000,
        resaleValue: 'High',
        engine: '1.5L Turbo',
        horsepower: 176,
        torque: 240,
        fuelType: 'Petrol',
        fuelEconomy: 15.7,
        transmission: 'CVT',
        driveType: 'FWD',
        seatingCapacity: 5,
        bootSpace: '420L',
        topSpeed: '200 km/h',
        acceleration: '8.2s',
        groundClearance: '145mm',
        safetyRating: '5-Star',
        airbags: 6,
        abs: true,
        esc: true,
        parkingSensors: true,
        reverseCamera: true,
        infotainment: '7-inch Touchscreen',
        appleCarPlay: true,
        climateControl: 'Dual Zone',
        alloyWheels: true,
        sunroof: false,
        warranty: '5 Years / 100,000 km',
        dealerLocation: 'Lahore Showroom',
        cityMileage: 12.8,
        highwayMileage: 17.4,
        combinedMileage: 14.8,
        fuelTankCapacity: '47L'
      },
      {
        id: 'honda-city',
        brand: 'Honda',
        model: 'City',
        year: 2023,
        price: 3890000,
        maintenanceCost: 28000,
        resaleValue: 'High',
        engine: '1.5L Petrol',
        horsepower: 121,
        torque: 145,
        fuelType: 'Petrol',
        fuelEconomy: 16.4,
        transmission: 'CVT',
        driveType: 'FWD',
        seatingCapacity: 5,
        bootSpace: '510L',
        topSpeed: '180 km/h',
        acceleration: '10.5s',
        groundClearance: '140mm',
        safetyRating: '4-Star',
        airbags: 6,
        abs: true,
        esc: true,
        parkingSensors: true,
        reverseCamera: true,
        infotainment: '8-inch Display',
        appleCarPlay: true,
        climateControl: 'Auto Climate',
        alloyWheels: true,
        sunroof: false,
        warranty: '4 Years / 80,000 km',
        dealerLocation: 'Islamabad Center',
        cityMileage: 13.1,
        highwayMileage: 17.8,
        combinedMileage: 15.0,
        fuelTankCapacity: '40L'
      },
      {
        id: 'suzuki-swift',
        brand: 'Suzuki',
        model: 'Swift',
        year: 2024,
        price: 2980000,
        maintenanceCost: 22000,
        resaleValue: 'Medium',
        engine: '1.2L Petrol',
        horsepower: 89,
        torque: 113,
        fuelType: 'Petrol',
        fuelEconomy: 18.2,
        transmission: 'Manual',
        driveType: 'FWD',
        seatingCapacity: 5,
        bootSpace: '265L',
        topSpeed: '170 km/h',
        acceleration: '12.8s',
        groundClearance: '120mm',
        safetyRating: '3-Star',
        airbags: 2,
        abs: true,
        esc: false,
        parkingSensors: false,
        reverseCamera: false,
        infotainment: '7-inch Touchscreen',
        appleCarPlay: false,
        climateControl: 'Manual',
        alloyWheels: true,
        sunroof: false,
        warranty: '3 Years / 60,000 km',
        dealerLocation: 'Karachi Hub',
        cityMileage: 14.2,
        highwayMileage: 20.1,
        combinedMileage: 16.7,
        fuelTankCapacity: '37L'
      },
      {
        id: 'toyota-corolla',
        brand: 'Toyota',
        model: 'Corolla',
        year: 2024,
        price: 5110000,
        maintenanceCost: 30000,
        resaleValue: 'High',
        engine: '1.6L Petrol',
        horsepower: 122,
        torque: 153,
        fuelType: 'Hybrid',
        fuelEconomy: 17.8,
        transmission: 'CVT',
        driveType: 'FWD',
        seatingCapacity: 5,
        bootSpace: '470L',
        topSpeed: '185 km/h',
        acceleration: '10.9s',
        groundClearance: '135mm',
        safetyRating: '5-Star',
        airbags: 7,
        abs: true,
        esc: true,
        parkingSensors: true,
        reverseCamera: true,
        infotainment: '8-inch Display',
        appleCarPlay: true,
        climateControl: 'Dual Zone',
        alloyWheels: true,
        sunroof: false,
        warranty: '5 Years / 100,000 km',
        dealerLocation: 'Lahore South',
        cityMileage: 13.6,
        highwayMileage: 18.9,
        combinedMileage: 15.8,
        fuelTankCapacity: '50L'
      },
      {
        id: 'ford-ranger',
        brand: 'Ford',
        model: 'Ranger',
        year: 2024,
        price: 8690000,
        maintenanceCost: 42000,
        resaleValue: 'High',
        engine: '2.0L Diesel',
        horsepower: 168,
        torque: 405,
        fuelType: 'Diesel',
        fuelEconomy: 13.1,
        transmission: 'Automatic',
        driveType: '4WD',
        seatingCapacity: 5,
        bootSpace: '980L',
        topSpeed: '180 km/h',
        acceleration: '12.1s',
        groundClearance: '232mm',
        safetyRating: '4-Star',
        airbags: 6,
        abs: true,
        esc: true,
        parkingSensors: true,
        reverseCamera: true,
        infotainment: '10-inch Touchscreen',
        appleCarPlay: true,
        climateControl: 'Dual Zone',
        alloyWheels: true,
        sunroof: true,
        warranty: '4 Years / 80,000 km',
        dealerLocation: 'Gujranwala Center',
        cityMileage: 10.8,
        highwayMileage: 13.9,
        combinedMileage: 12.1,
        fuelTankCapacity: '80L'
      },
      {
        id: 'hyundai-tucson',
        brand: 'Hyundai',
        model: 'Tucson',
        year: 2024,
        price: 6990000,
        maintenanceCost: 35000,
        resaleValue: 'High',
        engine: '2.0L Petrol',
        horsepower: 156,
        torque: 192,
        fuelType: 'Petrol',
        fuelEconomy: 14.8,
        transmission: 'Automatic',
        driveType: 'AWD',
        seatingCapacity: 5,
        bootSpace: '620L',
        topSpeed: '190 km/h',
        acceleration: '9.7s',
        groundClearance: '185mm',
        safetyRating: '5-Star',
        airbags: 6,
        abs: true,
        esc: true,
        parkingSensors: true,
        reverseCamera: true,
        infotainment: '10.25-inch Display',
        appleCarPlay: true,
        climateControl: 'Dual Zone',
        alloyWheels: true,
        sunroof: true,
        warranty: '5 Years / 100,000 km',
        dealerLocation: 'Peshawar Valley',
        cityMileage: 11.9,
        highwayMileage: 15.4,
        combinedMileage: 13.2,
        fuelTankCapacity: '54L'
      }
    ];

    const selectA = document.getElementById('carSelectA');
    const selectB = document.getElementById('carSelectB');
    const tableBody = document.getElementById('compareTableBody');
    const summaryCards = document.getElementById('summaryCards');
    const carNameA = document.getElementById('carNameA');
    const carNameB = document.getElementById('carNameB');

    const brandGroups = carCatalog.reduce((groups, car) => {
      if (!groups[car.brand]) groups[car.brand] = [];
      groups[car.brand].push(car);
      return groups;
    }, {});

    const populateSelect = (select) => {
      select.innerHTML = '';
      Object.entries(brandGroups).forEach(([brand, cars]) => {
        const group = document.createElement('optgroup');
        group.label = brand;
        cars.forEach((car) => {
          const option = document.createElement('option');
          option.value = car.id;
          option.textContent = `${car.brand} ${car.model}`;
          group.appendChild(option);
        });
        select.appendChild(group);
      });
    };

    const defaultA = 'honda-civic';
    const defaultB = 'toyota-corolla';
    populateSelect(selectA);
    populateSelect(selectB);
    selectA.value = defaultA;
    selectB.value = defaultB;

    const comparisonRows = [
      { label: 'Brand', key: 'brand', type: 'text' },
      { label: 'Model', key: 'model', type: 'text' },
      { label: 'Model Year', key: 'year', type: 'number' },
      { label: 'Engine', key: 'engine', type: 'text' },
      { label: 'Transmission', key: 'transmission', type: 'text' },
      { label: 'Fuel Type', key: 'fuelType', type: 'text' },
      { label: 'Horsepower', key: 'horsepower', type: 'number', preference: 'higher' },
      { label: 'Torque', key: 'torque', type: 'number', preference: 'higher' },
      { label: 'Drive Type', key: 'driveType', type: 'text' },
      { label: 'Seating Capacity', key: 'seatingCapacity', type: 'number', preference: 'higher' },
      { label: 'Boot Space', key: 'bootSpace', type: 'text' },
      { label: 'Top Speed', key: 'topSpeed', type: 'text' },
      { label: 'Acceleration (0–100 km/h)', key: 'acceleration', type: 'text', preference: 'lower' },
      { label: 'Ground Clearance', key: 'groundClearance', type: 'text' },
      { group: 'Features Comparison', label: 'Infotainment Display', key: 'infotainment', type: 'text' },
      { label: 'Apple CarPlay / Android Auto', key: 'appleCarPlay', type: 'boolean' },
      { label: 'Climate Control', key: 'climateControl', type: 'text' },
      { label: 'Alloy Wheels', key: 'alloyWheels', type: 'boolean' },
      { label: 'Sunroof', key: 'sunroof', type: 'boolean' },
      { group: 'Price Comparison', label: 'Base Price', key: 'price', type: 'price', preference: 'lower' },
      { label: 'Estimated Maintenance Cost', key: 'maintenanceCost', type: 'price', preference: 'lower' },
      { label: 'Resale Value', key: 'resaleValue', type: 'text', preference: 'higher' },
      { group: 'Fuel Economy Comparison', label: 'City Mileage', key: 'cityMileage', type: 'number', preference: 'higher' },
      { label: 'Highway Mileage', key: 'highwayMileage', type: 'number', preference: 'higher' },
      { label: 'Combined Mileage', key: 'combinedMileage', type: 'number', preference: 'higher' },
      { label: 'Fuel Tank Capacity', key: 'fuelTankCapacity', type: 'text' },
      { group: 'Safety Comparison', label: 'Safety Rating', key: 'safetyRating', type: 'text', preference: 'higher' },
      { label: 'Airbags', key: 'airbags', type: 'number', preference: 'higher' },
      { label: 'ABS Braking System', key: 'abs', type: 'boolean' },
      { label: 'Electronic Stability Control', key: 'esc', type: 'boolean' },
      { label: 'Parking Sensors', key: 'parkingSensors', type: 'boolean' },
      { label: 'Reverse Camera', key: 'reverseCamera', type: 'boolean' },
      { label: 'Warranty', key: 'warranty', type: 'text' },
      { label: 'Dealer Location', key: 'dealerLocation', type: 'text' }
    ];

    const getCarById = (id) => carCatalog.find((car) => car.id === id) || carCatalog[0];

    const formatValue = (car, row) => {
      if (row.type === 'boolean') return car[row.key] ? 'Yes' : 'No';
      if (row.type === 'price') return `PKR ${car[row.key].toLocaleString()}`;
      if (row.type === 'number') return `${car[row.key]}`;
      return car[row.key];
    };

    const getWinner = (row, carA, carB) => {
      const valueA = carA[row.key];
      const valueB = carB[row.key];
      if (row.type === 'boolean') return valueA === valueB ? null : valueA ? 'a' : 'b';
      if (row.type === 'price' || row.type === 'maintenanceCost') {
        return valueA === valueB ? null : valueA < valueB ? 'a' : 'b';
      }
      if (row.preference === 'lower') {
        return valueA === valueB ? null : valueA < valueB ? 'a' : 'b';
      }
      if (row.preference === 'higher') {
        return valueA === valueB ? null : valueA > valueB ? 'a' : 'b';
      }
      return null;
    };

    const renderSummary = (carA, carB) => {
      summaryCards.innerHTML = `
        <div class="summary-card">
          <h3>${carA.brand} ${carA.model}</h3>
          <p>${carA.engine} • ${carA.transmission} • PKR ${carA.price.toLocaleString()}</p>
        </div>
        <div class="summary-card">
          <h3>${carB.brand} ${carB.model}</h3>
          <p>${carB.engine} • ${carB.transmission} • PKR ${carB.price.toLocaleString()}</p>
        </div>
      `;
      carNameA.textContent = `${carA.brand} ${carA.model}`;
      carNameB.textContent = `${carB.brand} ${carB.model}`;
    };

    const renderTable = () => {
      const carA = getCarById(selectA.value);
      const carB = getCarById(selectB.value);
      renderSummary(carA, carB);

      let rows = '';
      comparisonRows.forEach((row) => {
        if (row.group) {
          rows += `<tr class="group-row"><th colspan="3">${row.group}</th></tr>`;
        }

        const winner = getWinner(row, carA, carB);
        rows += `
          <tr>
            <th class="row-label">${row.label}</th>
            <td class="${winner === 'a' ? 'best-value' : ''}">${formatValue(carA, row)}</td>
            <td class="${winner === 'b' ? 'best-value' : ''}">${formatValue(carB, row)}</td>
          </tr>
        `;
      });

      tableBody.innerHTML = rows;
    };

    document.getElementById('compareBtn').addEventListener('click', renderTable);
    [selectA, selectB].forEach((select) => select.addEventListener('change', renderTable));

    document.getElementById('resetBtn').addEventListener('click', () => {
      selectA.value = defaultA;
      selectB.value = defaultB;
      renderTable();
    });

    document.getElementById('printBtn').addEventListener('click', () => window.print());
    document.getElementById('pdfBtn').addEventListener('click', () => {
      window.print();
    });

    renderTable();
  }
});
