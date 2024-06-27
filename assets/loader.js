// loader.js

// Function to show the loader
function showLoader() {
    const loader = document.createElement('div');
    loader.classList.add('loader');
    document.body.appendChild(loader);
    
    // Hide loader after 2 seconds (adjust as needed)
    setTimeout(() => {
      hideLoader();
    }, 2000); // 2000 milliseconds = 2 seconds
  }
  
  // Function to hide the loader
  function hideLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
      loader.remove();
    }
  }
  
  // Show loader when the page starts loading
  document.addEventListener('DOMContentLoaded', showLoader);
  
  // Hide loader when the page finishes loading
  window.addEventListener('load', hideLoader);
  