import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
    return(
    <Box as="aside">
        <img src={`https://github.com/${propriedades.githubuser}.png`} style={{ borderRadius: '8px'}} />
        <hr />

        <p>
          <a className="boxLink" href={`https://github.com/${propriedades.githubuser}`}>
          @{propriedades.githubuser}
          
          </a>
        </p>
        <hr />
      
        <AlurakutProfileSidebarMenuDefault />
    </Box>
   )
}

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle" style={{ color: 'white' }}>
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
        {/* {seguidores.map((itemAtual) => {
          return (
            <li key={itemAtual}>
              <a href={`https://github.com/${itemAtual}.png`}>
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })} */}
      </ul>
        </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
    const usuarioAleatorio = 'calielp';
    const [comunidades, setComunidades] = React.useState([]);
    //const comunidades = comunidades[0];
    //const alteradorDeComunidades = comunidades[1];
    //const comunidades = ['Coisas burras ditas de forma inteligente (ou o inverso)'];
    const pessoasFavoritas = [
    'omariosouto',
    'peas',
    'rafaballerini',
    'juunegreiros',
    'marcobrunodev',
    'BManduca',
    ]
  const [seguidores, setSeguidores] = React.useState([]);
    // 0 - pegar o array de dados do github
  React.useEffect(function() {
    // GET
    fetch('https://api.github.com/users/calielp/followers')
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta) {
      setSeguidores(respostaCompleta);
    })


    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '97c89ba82973a8c70be128af51df2c',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query":  `query {
        allCommunities{
          id
          title
          imageUrl
          creatorSlug
        }
      }`})
    })
    .then((response) => response.json())
    .then((respostaCompleta) => {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
      console.log(comunidadesVindasDoDato)
      setComunidades(comunidadesVindasDoDato)
    })
  }, [])

    console.log('seguidores antes do return', seguidores);

    // 1- Criar um box que vai ter um map, baseado nos items do array
    // que pegamos no github

  return (
    <>
    <AlurakutMenu />
    <MainGrid>

      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
        <ProfileSidebar githubuser={usuarioAleatorio} />
      </div>
      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
        <Box>
          <h1 className="title">
            bem vindo(a) {usuarioAleatorio}
          </h1>

          <OrkutNostalgicIconSet />
        </Box>

        <Box>
          <h2 className="subTitle">o que voce deseja fazer?</h2>
          <form onSubmit={function handleCriaComunidade(e) {
            e.preventDefault();
            const dadosDoForm = new FormData(e.target);

            console.log('campo: ',dadosDoForm.get('title'));
            console.log('campo: ',dadosDoForm.get('image'));

            const comunidade = {
              title: dadosDoForm.get('title'),
              imageUrl: dadosDoForm.get('image'),
              creatorSlug: usuarioAleatorio,
            }

            fetch('/api/comunidades', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(comunidade)
            })
            .then(async (response) => {
              const dados = await response.json();
              console.log(dados.registroCriado);
              const comunidade = dados.registroCriado;
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas)
            })
          }}>
            <div>
              <input 
               placeholder="qual vai ser o nome da sua comunidade?" 
               name="title"
               aria-label="qual vai ser o nome da sua comunidade?"
               type="text"
               required="required"
              />
            </div>
            <div>
              <input 
               placeholder="coloque uma URL pra usarmos de capa" 
               name="image"
               aria-label="qual vai ser o nome da sua comunidade?"
               type="url"
               required="required"
              />
            </div>

            <button>
              criar comunidade
            </button>
          </form>
        </Box>
      </div>
      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
      <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle" style={{ color: 'white' }}>
            seguidores ({pessoasFavoritas.length})
          </h2>

        <ul>
         {pessoasFavoritas.map((itemAtual) => {
           return (
              <li key={itemAtual}>
                <a href={`/users/${itemAtual}`}>
                  <img src={`https://github.com/${itemAtual}.png`} />
                  <span>{itemAtual}</span>
                </a>
              </li>
           )
          })}
          </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle" style={{ color: 'white' }}>
            comunidades ({comunidades.length})
          </h2>
        <ul>
         {comunidades.map((itemAtual) => {
           return (
             <li key={itemAtual.id}>
                <a href={`/communities/${itemAtual.id}`}>
                  <img src={itemAtual.imageUrl} />
                  <span>{itemAtual.title}</span>
                </a>
              </li>
           )
          })}
          </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle" style={{ color: 'white' }}>
         pessoas da comunidade dev ({pessoasFavoritas.length})
          </h2>

        <ul>
         {pessoasFavoritas.map((itemAtual) => {
           return (
              <li key={itemAtual}>
                <a href={`/users/${itemAtual}`}>
                  <img src={`https://github.com/${itemAtual}.png`} />
                  <span>{itemAtual}</span>
                </a>
              </li>
           )
          })}
          </ul>
        </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>
    </>
  )
}
