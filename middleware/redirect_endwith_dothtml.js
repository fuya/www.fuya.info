export default function ({ route, redirect }) {
  if (route.path.endsWith('.html')) {
    redirect(route.path.slice(0, -'.html'.length))
  }
}
