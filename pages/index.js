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

export default function Home() {
    const usuarioAleatorio = 'calielp';
    const [comunidades, setComunidades] = React.useState([{
      id: '12682376473275646789837',
      title: 'Eu odeio acordar cedo',
      image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
    }]);
    //const comunidades = comunidades[0];
    //const alteradorDeComunidades = comunidades[1];
    //const comunidades = ['Coisas burras ditas de forma inteligente (ou o inverso)'];
    const pessoasFavoritas = [
      'juunegreiros',
      'omariosouto',
      'peas',
      'rafaballerini',
      'marcobrunodev',
      'felipefialho'
    ]

    // 0 - pegar o array de dados do github
    const seguidores = fetch('https://api.github.com/users/calielp/followers')
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json();
      })
      .then(function(respostaCompleta) {
        console.log(respostaCompleta);
      })

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
            bem vindo(a)
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
              id: new Date().toISOString(),
              title: dadosDoForm.get('title'),
              image: dadosDoForm.get('image'),
            }
            const comunidadesAtualizadas = [...comunidades, comunidade];
            setComunidades(comunidadesAtualizadas)
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
            seguidores ({seguidores.length})
          </h2>
        <ul>
         {seguidores.map((itemAtual) => {
           return (
             <li key={itemAtual}>
                <a href={`https://github.com/${itemAtual}.png`}>
                  <img src={itemAtual.image} />
                  <span>{itemAtual.title}</span>
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
                <a href={`/users/${itemAtual.title}`}>
                  <img src={itemAtual.image} />
                  <span>{itemAtual.title}</span>
                </a>
              </li>
           )
          })}
          </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle" style={{ color: 'white' }}>
         pessoas da comunidade ({pessoasFavoritas.length})
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
