export function initApp(express, bodyParser, createReadStream, crypto, http) {
	const app = express()

	const CORS = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,OPTIONS,DELETE',
		'Access-Control-Allow-Headers': 'Content-Type, Accept, Access-Control-Allow-Headers',
		'Content-Type': 'text/plain; charset=utf-8'
	};

	const login = 'itmo370702';

	app
		.use(
			bodyParser.urlencoded({extended: true})
		)
		.use(
			bodyParser.json()
		)
		.use(function (req, res, next) {
			res.set(CORS)
			next();
		})
		.get('/login/', (req, res) => res.send(login))

		.get('/code/', (req, res) => createReadStream(import.meta.url.substring(7)).pipe(res))

		.get('/sha1/:input/', (req, res) => {
			res.send(
				crypto.createHash('sha1', "").update(req.params.input).digest('hex')
			)
		})

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
			res.end(login)
		})

	return app
}
