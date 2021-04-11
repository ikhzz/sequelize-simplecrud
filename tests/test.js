const request = require("supertest");
const app = require("../index");
const { user, transaksi} = require("../models");

beforeAll(async () => {
  // // await Promise.all([user.deleteMany(), transaksi.deleteMany()]);
});

const getCredential = async () => {
  const adminCred = await request(app).post('/auth/signin').send({
    email: "ikhz@gmail.com",
    password: "!Default1",
  })
  const userCred = await request(app).post('/auth/signin').send({
    email: "fikriztm@gmail.com",
    password: "!Default1",
  })
  console.log(adminCred.body)
  return [adminCred.body.token, userCred.body.token]
}

describe("Auth Test", ()=> {
  describe("/auth/signin POST", ()=> {
    it("it should create a user and return the token", async ()=> {
      const res = await request(app).post('/auth/signin').send({
        email: "ikhz@gmail.com",
        password: "!Default1",
      })
      
      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.message).toEqual("Token Created")
      expect(res.body).toHaveProperty("token")
    })
  })
})
// check transaksi
describe("Transaksi Test", ()=> {
  describe("/transaksi GET", ()=> {
    it("it should success get the transaksi data", async ()=> {
      const cred = await getCredential()    
      const res = await request(app)
        .get('/transaksi')
        .set('Authorization', `bearer ${cred[1]}`)
        .send()
      
      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.message).toEqual("Success")
      expect(res.body).toHaveProperty("data")
    })
    it("it should not success get the transaksi data", async ()=> {
      const cred = await getCredential()    
      const res = await request(app)
        .get('/transaksi/1')
        .set('Authorization', `bearer ${cred[1]}`)
        .send()
      
      expect(res.statusCode).toEqual(401)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.error).toEqual("Error at admin check")
      expect(res.body.message).toEqual("You're not authorized")
    })
  })
})
// check barang
describe("barang Test", ()=> {
  describe("/barang GET", ()=> {
    it("it should success get the transaksi data", async ()=> {
      const cred = await getCredential()    
      const res = await request(app)
        .get('/barang')
        .set('Authorization', `bearer ${cred[1]}`)
        .send()
      
      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.message).toEqual("Success")
      expect(res.body).toHaveProperty("data")
    })
    it("it should not success get the transaksi data", async ()=> {
      const cred = await getCredential()    
      const res = await request(app)
        .get('/barang/1')
        .set('Authorization', `bearer ${cred[1]}`)
        .send()
      
      expect(res.statusCode).toEqual(401)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.error).toEqual("Error at admin check")
      expect(res.body.message).toEqual("You're not authorized")
    })
  })
})
// check pemasok
describe("pemasok Test", ()=> {
  describe("/pemasok GET", ()=> {
    it("it should success get the transaksi data", async ()=> {
      const cred = await getCredential()    
      const res = await request(app)
        .get('/pemasok')
        .set('Authorization', `bearer ${cred[1]}`)
        .send()
      
      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.message).toEqual("Success")
      expect(res.body).toHaveProperty("data")
    })
    it("it should not success get the transaksi data", async ()=> {
      const cred = await getCredential()    
      const res = await request(app)
        .get('/pemasok/1')
        .set('Authorization', `bearer ${cred[1]}`)
        .send()
      
      expect(res.statusCode).toEqual(401)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.error).toEqual("Error at admin check")
      expect(res.body.message).toEqual("You're not authorized")
    })
  })
})
// check pelanggan
describe("pelanggan Test", ()=> {
  describe("/pelanggan GET", ()=> {
    it("it should success get the transaksi data", async ()=> {
      const cred = await getCredential()    
      const res = await request(app)
        .get('/pelanggan')
        .set('Authorization', `bearer ${cred[1]}`)
        .send()
      
      expect(res.statusCode).toEqual(200)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.message).toEqual("Success")
      expect(res.body).toHaveProperty("data")
    })
    it("it should not success get the transaksi data", async ()=> {
      const cred = await getCredential()    
      const res = await request(app)
        .get('/pelanggan/1')
        .set('Authorization', `bearer ${cred[1]}`)
        .send()
      
      expect(res.statusCode).toEqual(401)
      expect(res.body).toBeInstanceOf(Object)
      expect(res.body.error).toEqual("Error at admin check")
      expect(res.body.message).toEqual("You're not authorized")
    })
  })
})