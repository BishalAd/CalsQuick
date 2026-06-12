export async function onRequest(context) {
  const url = new URL(context.request.url);
  
  // If request is coming from pages.dev domain, redirect to custom domain
  if (url.hostname === 'calsquick.pages.dev') {
    return Response.redirect('https://calcquick.online' + url.pathname + url.search, 301);
  }
  
  return context.next();
}
