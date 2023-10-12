export function initApp(express, bodyParser, createReadStream, crypto, http) {
	const app = express()

	app.use(
		bodyParser.urlencoded({
			extended: true
		}))
		.use(function (req, res, next) {
			res.setHeader('Access-Control-Allow-Origin', '*')
			res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,OPTIONS,DELETE')
			next();
		})
		.get('/login/', (req, res) => res.send('itmo370702'))
		.get('/code/', (req, res) => createReadStream(import.meta.url.substring(7)).pipe(res))
		.get('/sha1/:input/', (req, res) => res.send(crypto.createHmac('sha1', "").update(req.params.input).digest('hex')))
		.get('/req/', (req, res) => {
			http.get(req.query.addr, (r) => {
				r.on('data', (chunk) => {
					res.write(chunk)
				})
				r.on('end', () => {
					res.end()
				})
			})
		})

	.post('/req/', (req, res) => {
		http.get(req.body.addr, (r) => {
			r.on('data', (chunk) => {
				res.write(chunk)
			})
			r.on('end', () => {
				res.end()
			})
		})
	})
		.all('/*', (req, res) => {
			res.end('itmo370702')
		})

	return app
}
