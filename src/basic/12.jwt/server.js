// jwt json web token
// 一般使用jsonwebtoken(可以加过期时间), 但是jwt-simple

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const jwt = require('jwt-simple')
const app = new Koa();
const router = new Router();

// jwt格式 eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMyI.kY6tu8Uz9o1j62jt76acOqbdog7UKGy7ZfkOxej7Bbw
// 第一段：{ type: 'JWT', alg: 'HS256' } 由这个对象转化成base64编码
// 第二段：就是用户传入的数据转化成的base64编码
// 第三段：由前两段的内容使用进行拼接 然后加key使用加盐摘要算法 加密出来的

const jw = {
    sign(str, key) {
        str = require('crypto').createHmac('sha256', key).update(str).digest('base64')
        return this.base64Escape(str)
    },
    toBase64(content) {
        return this.base64Escape(Buffer.from(JSON.stringify(content)).toString('base64'))
    },
    base64Escape(base64) {
        return base64.replace(/\+/, '-').replace(/\//, '_').replace(/\=/, '')
    },
    reverseBase64Escape(str) {
        str += new Array(5 - str.length % 4).join('=');
        return str.replace(/\-/g, '+').replace(/_/g, '/');
    },
    encode(content, key) {
        let frag1 = this.toBase64({
            typ: 'JWT',
            alg: 'HS256'
        })
        let frag2 = this.toBase64(content)
        let frag3 = this.sign([frag1, frag2].join('.'), key)
        return `${frag1}.${frag2}.${frag3}`
    },
    decode(token, key) {
        let [frag1, frag2, frag3] = token.split('.')
        if (this.sign([frag1, frag2].join('.'), key) === frag3) {
            return Buffer.from(this.reverseBase64Escape(frag2), 'base64').toString()
        } else {
            throw new Error('token错误')
        }
    }
}
// console.log(jw.decode('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IjEyMyI.kY6tu8Uz9o1j62jt76acOqbdog7UKGy7ZfkOxej7Bbw', 'wyb'));

app.use(bodyParser());
router.post('/login', async (ctx, next) => {
    let {
        username,
        password
    } = ctx.request.body;
    if (username == 123 && password == 123) {
        let token = jw.encode(username, 'wyb'); // username是加密的内容 zf是加密的key
        ctx.body = {
            err: 0,
            data: {
                token,
                username
            }
        }
    } else {
        ctx.body = username
    }
});

router.get('/validate', async (ctx) => {
    let authorization = ctx.get('authorization');
    if (authorization) {
        let [, token] = authorization.split(' ');
        try {
            let r = jw.decode(token, 'wyb');
            ctx.body = {
                err: 0,
                data: {
                    username: r
                }
            }
        } catch {
            ctx.body = {
                err: 1,
                data: {
                    status: 401
                }
            }
        }
    }
})

app.use(router.routes());
app.listen(3000);