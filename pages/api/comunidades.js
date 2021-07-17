import { SiteClient  } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    if(request.method === 'POST') {
        const TOKEN = 'ceac81500da3e790997c4578aaf3d8';
        const client = new SiteClient(TOKEN);

        // validar os dados, antes de sair cadstrando
        const registroCriado = await client.items.create({
            itemType: "975295", //id do "banco de dados"
            ...request.body,
            //title: "teste",
            //imageUrl: "https://github.com/calielp",
            //creatorSlug: "calielp",
        })

        console.log(registroCriado)
    
        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        }) 
        return;
    } 

    response.status(404).json({
        message: 'não foi possivel concluir a ação desejada'
    })
}