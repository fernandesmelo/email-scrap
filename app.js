import { fetchNoticias, montarHtml } from './scraper.js';
import { sendEmail } from './mailer.js';

async function main() {
  const noticias = await fetchNoticias();
  if (noticias.length === 0) {
    console.log("Nenhuma notícia encontrada.");
    return;
  }

  const html = montarHtml(noticias);
  await sendEmail(html);
}

main();