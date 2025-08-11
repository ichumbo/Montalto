/**
 * VIEW TOGGLE FUNCTIONALITY
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize view toggle for all car lists
  initViewToggle();
});

function initViewToggle() {
  // Find all car list containers
  const carLists = document.querySelectorAll('.featured-car-list, .vehicle-grid');
  
  carLists.forEach(list => {
    const section = list.closest('section');
    if (!section) return;
    
    // Create view toggle if it doesn't exist
    let viewToggle = section.querySelector('.view-toggle');
    if (!viewToggle) {
      viewToggle = createViewToggle();
      
      // Insert after title wrapper or before the list
      const titleWrapper = section.querySelector('.title-wrapper');
      if (titleWrapper) {
        titleWrapper.appendChild(viewToggle);
      } else {
        list.parentNode.insertBefore(viewToggle, list);
      }
    }
    
    // Add event listeners
    const gridBtn = viewToggle.querySelector('[data-view="grid"]');
    const listBtn = viewToggle.querySelector('[data-view="list"]');
    
    if (gridBtn && listBtn) {
      gridBtn.addEventListener('click', () => setView(list, 'grid', gridBtn, listBtn));
      listBtn.addEventListener('click', () => setView(list, 'list', gridBtn, listBtn));
    }
  });
}

function createViewToggle() {
  const viewToggle = document.createElement('div');
  viewToggle.className = 'view-toggle';
  viewToggle.innerHTML = `
    <button class="toggle-btn active" data-view="grid" title="Visualização em Grade">
      <ion-icon name="grid-outline"></ion-icon>
    </button>
    <button class="toggle-btn" data-view="list" title="Visualização em Lista">
      <ion-icon name="list-outline"></ion-icon>
    </button>
  `;
  return viewToggle;
}

function setView(list, view, gridBtn, listBtn) {
  // Update list class
  if (view === 'list') {
    list.classList.add('list-view');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
  } else {
    list.classList.remove('list-view');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
  }
  
  // Save preference
  localStorage.setItem('carListView', view);
}

// Load saved view preference
function loadViewPreference() {
  const savedView = localStorage.getItem('carListView') || 'grid';
  const carLists = document.querySelectorAll('.featured-car-list, .vehicle-grid');
  
  carLists.forEach(list => {
    const section = list.closest('section');
    const viewToggle = section?.querySelector('.view-toggle');
    
    if (viewToggle) {
      const gridBtn = viewToggle.querySelector('[data-view="grid"]');
      const listBtn = viewToggle.querySelector('[data-view="list"]');
      
      if (gridBtn && listBtn) {
        setView(list, savedView, gridBtn, listBtn);
      }
    }
  });
}

// Load preference after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(loadViewPreference, 100);
});