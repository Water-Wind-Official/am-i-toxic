export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Route to index.html for root path
    if (url.pathname === '/') {
      return env.ASSETS.fetch('index.html');
    }
    
    // Serve other files directly
    return env.ASSETS.fetch(request);
  },
};
