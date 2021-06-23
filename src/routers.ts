import { Request, Response, Router } from 'express';

const router = Router();

router.get('/hello-world/:id', (request : Request, response : Response) => {

    response.setHeader('Access-Control-Allow-Origin', '*');

    const { id } = request.params;



    const products = [
        {
            name: "Curso 1",
            price: 9.99,
            id: 0
        },
        {
            name: "Curso 2",
            price: 9.99,
            id: 1
        },
        {
            name: "Curso 3",
            price: 9.99,
            id: 2
        },

    ];

    let product;

    products.map((p) => {
        if(p.id === Number(id)){
            product = p;
        }
    });


    if(!product){
        return response.json({
            status: "error"
        }).status(404);
    }

    return response.json({
        status:"success",
        product
    }).status(200) //.send(`Produto ${JSON.stringify(product)}!`).status(200);
});

export { router }