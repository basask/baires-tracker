const puppeteer = require('puppeteer');
const { InvalidArgumentError } = require('commander');
const { dateParser } = require('./parsers');

async function trackerFactory(settings) {
  const { user, password } = settings;
  let browser = null;
  let page = null;

  const BASE_URL = 'https://timetracker.bairesdev.com';

  async function login() {  
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto(BASE_URL);
    await page.type('#ctl00_ContentPlaceHolder_UserNameTextBox', user);
    await page.type('#ctl00_ContentPlaceHolder_PasswordTextBox', password);
    await page.click('#ctl00_ContentPlaceHolder_LoginButton');
    await page.waitForTimeout(2000);
  }
  
  async function track({date, project, hours, category, task, comments, focalPoint}) {
    if (browser === null) {
      return new Error('User login() first');
    }

    await page.goto(`${BASE_URL}/TimeTrackerAdd.aspx`);
    await page.waitForTimeout(1000);
  
    await page.$eval('#ctl00_ContentPlaceHolder_txtFrom', (el, value) => el.value = value, date.toTracker());
    await page.$eval('#ctl00_ContentPlaceHolder_TiempoTextBox', (el, value) => el.value = value, hours);
    await page.$eval('#ctl00_ContentPlaceHolder_CommentsTextBox', (el, value) => el.value = value, comments);
  
    let selectElem = await page.$('#ctl00_ContentPlaceHolder_idProyectoDropDownList');
    await selectElem.type(project);
  
    selectElem = await page.$('#ctl00_ContentPlaceHolder_idCategoriaTareaXCargoLaboralDropDownList');
    await selectElem.type(category);
    
    await page.waitForTimeout(2000);
  
    selectElem = await page.$('#ctl00_ContentPlaceHolder_idTareaXCargoLaboralDownList');
    await selectElem.type(task);
  
    selectElem = await page.$('#ctl00_ContentPlaceHolder_idFocalPointClientDropDownList');
    await selectElem.type(focalPoint);
  
    await page.click('#ctl00_ContentPlaceHolder_btnAceptar');
    await page.waitForTimeout(2000);
  }
  
  async function list({start, end}) {
    if (browser === null) {
      return new Error('User login() first');
    }
    if (start === null) {
      throw new InvalidArgumentError('Missing start date argument');
    }
    end = end || start;

    await page.goto(`${BASE_URL}/ListaTimeTracker.aspx`);
    await page.waitForTimeout(1000);
  
    await page.$eval('#ctl00_ContentPlaceHolder_txtFrom', (el, value) => el.value = value, start.toTracker());
    await page.$eval('#ctl00_ContentPlaceHolder_txtTo', (el, value) => el.value = value, end.toTracker());

    await page.click('#ctl00_ContentPlaceHolder_AplicarFiltroLinkButton');
    await page.waitForTimeout(2000);
    
    await page.waitForSelector('#ctl00_ContentPlaceHolder_Grilla')

    // await page.screenshot({path: 'tt.png'});
    
    const res = await page.$$eval('#ctl00_ContentPlaceHolder_Grilla tr', rows => {
      rows = rows.filter(row => row.querySelector('td a'));
      return rows.map(row => {
        const cells = row.querySelectorAll('td');
        const values = []
        for (let i =0; i < cells.length; i++) {
          values.push(cells[i].innerText);
        }
        let [date, hours,	project, category, task, comments] = values;
        hours = parseFloat(hours);
        return { date, hours, project, category, task, comments };
      });
    });
    res.forEach(item => item.date = dateParser(item.date));
    return res;
  }

  async function logoff () {
    if (browser !== null) {
      await browser.close();
      page = null;
      browser = null;
    }
  }

  return { login, track, list, logoff };
}

module.exports = trackerFactory;