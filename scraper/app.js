const fetch = require("node-fetch"); 
const cheerio = require("cheerio"); 

const url = "https://g1.globo.com/tecnologia/";

async function fetchData() {
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

    console.log(noticias);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}

fetchData();
