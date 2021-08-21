const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;
const sortMiddleWare = require('./app/middlewares/SortMiddleWare')

const routes = require('./routes');
const db = require('./config/db');

//Connect db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

//Custom MiddleWares
app.use(sortMiddleWare);

//HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine(
    'hbs',
    handlebars({
        //Đổi cấu trúc file
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sort: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: `
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M.75 3a.75.75 0 000 1.5h14.5a.75.75 0 000-1.5H.75zM3 7.75A.75.75 0 013.75 7h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 013 7.75zm3 4a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75z"></path></svg>
                    `,
                    desc: `
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M0 4.25a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H.75A.75.75 0 010 4.25zm0 4a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5H.75A.75.75 0 010 8.25zm0 4a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5H.75a.75.75 0 01-.75-.75z"></path><path d="M13.5 10h2.25a.25.25 0 01.177.427l-3 3a.25.25 0 01-.354 0l-3-3A.25.25 0 019.75 10H12V3.75a.75.75 0 011.5 0V10z"></path></svg>
                    `,
                    asc: `
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M0 4.25a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5H.75A.75.75 0 010 4.25zm0 4a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5H.75A.75.75 0 010 8.25zm0 4a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H.75a.75.75 0 01-.75-.75zm12.927-9.677a.25.25 0 00-.354 0l-3 3A.25.25 0 009.75 6H12v6.75a.75.75 0 001.5 0V6h2.25a.25.25 0 00.177-.427l-3-3z"></path></svg>
                    `
                }

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                }

                const icon = icons[sortType];
                const type = types[sortType];

                return `
                    <a href="?_sort&column=${field}&type=${type}" style="margin-left: 12px">${icon}</a>
                `
            }
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Route init
routes(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
