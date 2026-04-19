(async () => {
  try {
    const res = await fetch('http://localhost:5000/api/products');
    console.log('Backend status:', res.status);
    const data = await res.json();
    console.log('Products count:', data.length);
  } catch (e) {
    console.error('Backend request failed:', e);
  }
})();
