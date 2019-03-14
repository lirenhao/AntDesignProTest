import { parse } from 'url';

const clueListDataSource = [];

for (let i = 0; i < 46; i += 1) {
    clueListDataSource.push({
      key: i,
      number: `xxcy-${i}`,
      contact: `contact-${i}`,
      phone: '18300000001',
      telephone: '010-1100001',
      wechat: `Wecht ${i}`,
      qqNmuber: `QQ ${i}`,
      source: '独立开发',
      upStatus: '重点',
      upDate: '2019-03-13',
      nextDate: '2019-03-14',
      record: '',
      remark: '',
    });
  }

function getClue(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
      url = req.url; // eslint-disable-line
    }
  
    const params = parse(url, true).query;
  
    let dataSource = clueListDataSource;
  
    if (params.sorter) {
      const s = params.sorter.split('_');
      dataSource = dataSource.sort((prev, next) => {
        if (s[1] === 'descend') {
          return next[s[0]] - prev[s[0]];
        }
        return prev[s[0]] - next[s[0]];
      });
    }
  
    let pageSize = 10;
    if (params.pageSize) {
      pageSize = params.pageSize * 1;
    }
  
    const result = {
      list: dataSource,
      pagination: {
        total: dataSource.length,
        pageSize,
        current: parseInt(params.currentPage, 10) || 1,
      },
    };
  
    return res.json(result);
  }

export default {
    'GET /api/clue': getClue,
    'POST /api/clue': (req, res) => {
        res.send({ status: 'ok' });
    }
}