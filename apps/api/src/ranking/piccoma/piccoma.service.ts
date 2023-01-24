import { Injectable } from '@nestjs/common';
import {
  PiccomaRankingMenus,
  PiccomaSmartToonRankingCategories,
  RequestPiccomaDto,
} from './dto/request-piccoma.dto';
import puppeteer from 'puppeteer';
import { scrollPageToBottom } from 'puppeteer-autoscroll-down';
import { load } from 'cheerio';
import { Piccoma } from './entities/piccoma.entity';

@Injectable()
export class PiccomaService {
  async scrapData(req: RequestPiccomaDto) {
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    const url = `https://piccoma.com/web/ranking/${
      PiccomaRankingMenus[req.menu]
    }/P/${PiccomaSmartToonRankingCategories[req.category]}`;

    try {
      const result: Piccoma[] = [];

      await page.goto(url, { waitUntil: 'load' });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await scrollPageToBottom(page, {
        size: 500,
        delay: 250,
      });

      const content = await page.content();
      const $ = load(content);
      const rankingList = $('#js_contentBody > section > ul > li');
      const cutLength: number = Math.min(rankingList.length, req.itemLength);

      rankingList.slice(0, cutLength).each((i, e) => {
        const ranking = Number(
          $(e)
            .find(
              `div.PCM-rankingProduct_rank > div.PCM-rankingProduct_rankNum`,
            )
            .text(),
        );
        const title = $(e)
          .find(
            `div.PCM-l_rankingProduct_info > div > div.PCM-rankingProduct_tdata > div.PCM-rankingProduct_title > p`,
          )
          .text();
        const author = $(e)
          .find(
            `div.PCM-l_rankingProduct_info > div > div.PCM-rankingProduct_tdata > div.PCM-rankingProduct_author > p`,
          )
          .text();
        const likes = $(e)
          .find(
            `div.PCM-l_rankingProduct_info > div > div.PCM-rankingProduct_tdata > div.PCM-l_rankingProduct_like > div.PCM-rankingProduct_like > span`,
          )
          .text();
        const coverImage = $(e)
          .find(`div.PCM-l_productCoverImage > div > div > img`)
          .attr('src');

        result.push({
          coverImage,
          ranking,
          title,
          author,
          likes,
        });
      });
      return result;
    } catch (error) {
      return error;
    }
  }
}
