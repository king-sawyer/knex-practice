require('dotenv').config();
const knex = require('knex')

const knexInstance= knex({
    client: 'pg',
    connection: process.env.DB_URL
})


function searchByProductName(searchTerm){
knexInstance
.select('item_name')
.from('shopping_list')
.where('item_name', 'ILIKE', `%${searchTerm}%`)
.then(result => {
    console.log(result)
})
}
// searchByProductName('');


function paginateProducts(page){
    const productsPerPage = 3;
    const offset=productsPerPage * (page-1)
    knexInstance
    .select('item_name')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then(result => {
        console.log(result)
    })
}
// paginateProducts(2)

function getTotalCost(){
    knexInstance
    .select('category')
    .sum('price as total')
    .from('shopping_list')
    .groupBy('category')
    .then(result => {
        console.log("Cost per category")
        console.log(result)
    })
}
getTotalCost()