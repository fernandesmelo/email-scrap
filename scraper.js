import fetch from "node-fetch";
import * as cheerio from "cheerio";

const url = "https://g1.globo.com/tecnologia/";
const BASE_URL = "https://g1.globo.com";

export async function fetchNoticias() {
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

      // Garante que a URL da imagem seja absoluta
      let imagemUrl = imagem;
      if (imagem && !imagem.startsWith("http")) {
        imagemUrl = BASE_URL + imagem;
      }

      if (titulo) {
        noticias.push({
          titulo,
          resumo,
          imagem: imagemUrl,
        });
      }
    });

    return noticias;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return [];
  }
}

export function montarHtml(noticias) {
  let html = "<h2>Notícias de Tecnologia</h2>";
  noticias.forEach((noticia) => {
    html += `<div style="margin-bottom:20px;">
      <h3>${noticia.titulo}</h3>
      <p>${noticia.resumo}</p>
      ${noticia.imagem ? `<img src="${noticia.imagem}" style="max-width:300px;">` : ""}
    </div>`;
  });
  return html;
}
