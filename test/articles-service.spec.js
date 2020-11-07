const ArticlesService = require('../src/articles-service');
const knex = require('knex')


describe('Articles service object', function(){

    let db
     let testArticles = [ 
        { 
            id: 1,
                 date_published: new Date('2029-01-22T16:28:32.615Z'),
                  title: 'First test post!',
                  content: 'lorem ipsum carrots, enhanced rebates. Born result abandon their well-being, we have discovered that something ought to become regular non.Adipisci, pariatur.Molestiae free speech will not achieve this? '
                },
                {
                 id: 2,
                 date_published: new Date('2100-05-22T16:28:32.615Z'),
                  title: 'Second test post!',
                  content: 'lorem ipsum carrots enhanced rebates. Whereas, the exercise of it is worthy of the desire of encounter, the labor of us to follow the advantage of have often discussed, and it is easily deleniti. To obtain them! Wants the appropriate times. '
                },
                {
                 id: 3,
                 date_published: new Date('1919-12-22T16:28:32.615Z'),
                  title: 'Third test post!',
                  content: 'lorem ipsum carrots, enhanced rebates. Can pleasure? Needs rejects? Eager for the whole of them, and in the same a wearisome toil, and when he had to be worthy of the very nature of the soul. It is to be further this question. '
                },
              ]
    before(()=>{
        db=knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
    })
    before(()=> db('blogful_articles').truncate())

    afterEach(() => db('blogful_articles').truncate())

    after(()=> db.destroy())

    context(`Given 'blogful_articles' has data`, () => {
           before(() => {
             return db
               .into('blogful_articles')
               .insert(testArticles)
           })     
            it(`getAllArticles() resolves all articles from 'blogful_articles' table`, () => {
            return ArticlesService.getAllArticles(db)        
        })
    })
})

context(`Given 'blogful_articles' has no data`, () => {
       it(`getAllArticles() resolves an empty array`, () => {
         return ArticlesService.getAllArticles(db)
           .then(actual => {
             expect(actual).to.eql([])
           })
       })
     })