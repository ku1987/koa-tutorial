const Koa = require('koa')
const json = require('koa-json')
const KoaRouter = require('koa-router')
const path = require('path')
const render = require('koa-ejs')
const bodyParser = require('koa-body-parser')

const app = new Koa
const router = new KoaRouter

//JSON prettier
app.use(json())

//BodyParser Middleware
app.use(bodyParser())

//Add aditional properties to context
app.context.user = 'Brad'

//Router Middleware
app.use(router.routes()).use(router.allowedMethods())

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
})

//Replace with DB
const things = ['Food', 'Programming', 'Music']

//List of things
const index = async (ctx) => {
  await ctx.render('index', {
    title: 'Things I Love',
    things
  })
}

//Show Add Page
const showAdd = async (ctx) => {
  await ctx.render('add')
}

//Add Page
const add = async (ctx) => {
  const body = ctx.request.body
  things.push(body.thing)
  ctx.redirect('/')
}

//Routes
router.get('/', index)
router.get('/add', showAdd)
router.post('/add', add)

app.listen(3000, () => {
  console.log('Server Started...')
})
