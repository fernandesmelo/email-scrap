const fetch = require("node-fetch");
const cheerio = require("cheerio");

const url = "https://g1.globo.com/tecnologia/";

async function fetchNoticias() {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const noticias = [];
    $(".feed-post").each(function () {
      const titulo = $(this).find(".feed-post-body-title").text().trim();
      const resumo = $(this).find(".feed-post-body-resumo").text().trim();
      const imagem =
        $(this).find(".bstn-fd-picture-image").attr("src") ||
        $(this).find("img").attr("src");

      if (titulo) {
        noticias.push({
          titulo,
          resumo,
          imagem,
        });
      }
    });

    return noticias;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return [];
  }
}

function montarHtml(noticias) {
  let html = "<h2>Notícias de Tecnologia</h2>";
  noticias.forEach(noticia => {
    html += `<div style="margin-bottom:20px;">
      <h3>${noticia.titulo}</h3>
      <p>${noticia.resumo}</p>
      ${noticia.imagem ? `<img src="${noticia.imagem}" style="max-width:300px;">` : ""}
    </div>`;
  });
  return html;
}

module.exports = { fetchNoticias, montarHtml };