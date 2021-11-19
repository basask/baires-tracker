const axios = require('axios');
const { DateFormatter } = require('./formaters');

async function apiFactory(settings) {
  const { workspaceId, apiKey } = settings;
  const ax = axios.create({
    baseURL: `https://reports.api.clockify.me/v1/workspaces/${workspaceId}`,
    headers: {
      'X-Api-Key': apiKey,
      'content-type': 'application/json'
    }
  });

  async function getTimeEntries(startDate, endDate, defaults={}) {
    let response;

    const payload = {
      dateRangeStart: startDate.toClockify(),
      dateRangeEnd: endDate.toClockify(),
      detailedFilter: {
        page: 1,
        pageSize: 50,
      }
    };
    try {
      response = await ax.post('/reports/detailed', payload);
    } catch (error) {
      console.error(error.response.data);
      return []
    }
    
    return response.data.timeentries.map(entry => {
      const { description:comments, timeInterval, tags, projectName:project } = entry;
      const hours = parseFloat((timeInterval.duration / 3600).toFixed(2));
      const date = new DateFormatter(timeInterval.start);      
      const payload = {
        date,
        // project, 
        hours, 
        comments,
        tags: tags.map(t => t.name),
      }
      return { ...defaults, ...payload };
    });
  }

  return { getTimeEntries }
}

module.exports = apiFactory;
