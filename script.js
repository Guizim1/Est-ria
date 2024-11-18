const storyData = {
  Encruzilhada: {
    text: `Bem-vindo à jornada de Arthur em Camelot. Você encontrou um mapa antigo que leva ao lendário Tesouro de Camelot. 
           A lenda diz que somente aqueles com coragem, sabedoria e perseverança podem superar os obstáculos que guardam o tesouro. 
           Você se encontra em uma encruzilhada, onde três caminhos se abrem diante de você: 
           <a href="#" data-target="Floresta_Sombria">Floresta Sombria</a>, <a href="#" data-target="Deserto_de_Cinzas">Deserto de Cinzas</a> ou 
           <a href="#" data-target="Ruínas_Perdidas">Ruínas Perdidas</a>.`,
    resetHistory: true,
  },
  Floresta_Sombria: {
    text: `Você decidiu seguir para a Floresta Sombria. Lá, uma névoa espessa cobre o chão enquanto criaturas etéreas observam silenciosamente. 
           O espírito Feralux surge diante de você, exigindo que prove sua coragem. 
           Você pode <a href="#" data-target="Desafio">aceitar o desafio</a> ou <a href="#" data-target="Escapar">tentar escapar</a>.`,
  },
  Desafio: {
    text: `Feralux desafia você a enfrentar um medo profundo. Você visualiza suas dúvidas e as combate com determinação. 
           Ao triunfar, ele concede a você o Amuleto da Esperança, dizendo que ele iluminará os momentos mais sombrios da jornada. 
           <a href="#" data-target="Encruzilhada">Voltar até a encruzilhada.</a>.`,
    reward: "Amuleto da Esperança",
    showHistory: true,
  },
  Escapar: {
    text: `Você tenta fugir da presença ameaçadora de Feralux, mas a névoa na floresta se torna cada vez mais densa, desorientando você. 
           Depois de horas vagando, você retorna ao ponto inicial sem progresso e sem itens. 
           <a href="#" data-target="Encruzilhada">Retornar até a encruzilhada.</a>.`,
    showHistory: true,
  },
  Deserto_de_Cinzas: {
    text: `O Deserto de Cinzas se estende à frente, com dunas ondulantes e o calor abrasador tornando cada passo um desafio. 
           Você encontra a Fenix, uma criatura imensa com olhos flamejantes, que guarda uma passagem secreta. 
           Você pode <a href="#" data-target="Caverna">explorar uma caverna subterrânea</a> ou <a href="#" data-target="Templo">seguir para um templo antigo</a>.`,
  },
  Caverna: {
    text: `Você entra em uma caverna fria e escura, protegida do calor do deserto. Lá, você encontra cristais brilhantes e um pequeno altar com inscrições antigas. 
           Um eco distante sugere que você não está sozinho. Você pode <a href="#" data-target="Investigar">investigar o altar</a> ou <a href="#" data-target="Sair">sair rapidamente</a>.`,
  },
  Investigar: {
    text: `Enquanto investiga o altar, uma criatura de pedra emerge das sombras: o Guardião Obsidiano. Ele desafia você a responder um enigma sobre coragem. 
           Ao vencer, ele lhe concede a Pedra do Conhecimento, dizendo que ela revela segredos escondidos. 
           <a href="#" data-target="Encruzilhada">Retornar até a encruzilhada.</a>.`,
    reward: "Pedra do Conhecimento",
    showHistory: true,
  },
  Sair: {
    text: `Você decide não arriscar e foge da caverna. Lá fora, o calor do deserto o envolve novamente. 
           <a href="#" data-target="Encruzilhada">Retornar ao início.</a>`,
    showHistory: true,
  },

  Templo: {
    text: `Avançando para o templo antigo, você descobre um local majestoso coberto por runas e pinturas do passado.
           Uma estátua no centro parece guardar algo valioso. Você pode <a href="#" data-target="Examinar">examinar a estátua</a> ou <a href="#" data-target="Sair_templo">sair do templo</a>.`,
  },
  Examinar: {
    text: `A estátua desperta ao seu toque, revelando ser um golem guardião. Após um combate inteligente, você consegue derrotá-lo e recebe a Chave do Deserto, que pode abrir portas seladas.
           Parabéns, você concluiu este caminho! <a href="#" data-target="Encruzilhada">Retornar até a encruzilhada.</a>.`,
    reward: "Chave do Deserto",
    showHistory: true,
  },
  Sair_templo: {
    text: `Sentindo que o templo é perigoso demais, você decide sair antes que algo aconteça. O calor do deserto o recebe novamente enquanto você planeja seu próximo movimento. Não tendo o que fazer você tem que
           <a href="#" data-target="Encruzilhada">retornar até a encruzilhada.</a>.`,
    showHistory: true,
  },

  Ruínas_Perdidas: {
    text: `Nas Ruínas Perdidas, antigas construções cobertas de musgo e runas brilhantes contam histórias esquecidas. 
           Um portal emite uma luz pulsante, mas para ativá-lo, você precisa de três artefatos diferentes. 
           Você pode <a href="#" data-target="Portal">tentar ativar o portal</a> ou <a href="#" data-target="Explorar">explorar mais as ruínas</a>.`,
  },
  Portal: {
    text: `Você tenta ativar o portal, mas percebe que não possui todos os artefatos necessários. O portal permanece inativo, e você é teletransportado ao início. 
           <a href="#" data-target="Encruzilhada">Retornar ao início.</a>`,
    showHistory: true,
  },
  Explorar: {
    text: `Explorando as ruínas, você encontra inscrições que sugerem que os artefatos necessários podem ser encontrados em diferentes áreas de Camelot. 
           Você decide retornar para coletá-los antes de tentar novamente. <a href="#" data-target="Encruzilhada">Retornar ao início.</a>`,
    showHistory: true,
  },
};

const app = document.getElementById("app");
let currentStep = new URLSearchParams(window.location.search).get('step') || localStorage.getItem("lastStep") || "Encruzilhada";
let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
let journeyHistory = JSON.parse(localStorage.getItem("journeyHistory")) || [];

function saveProgress(step, choiceText) {
  if (storyData[step]?.resetHistory) {
    journeyHistory = [];
  }
  if (choiceText) journeyHistory.push(choiceText);
  localStorage.setItem("journeyHistory", JSON.stringify(journeyHistory));
  localStorage.setItem("lastStep", step);
  localStorage.setItem("inventory", JSON.stringify(inventory));
}

function renderStory() {
  const step = storyData[currentStep];
  const storyText = step.text;
  let output = `<p>${storyText}</p>`;
  if (step.reward) {
    output += `<p>Você recebeu: ${step.reward}</p>`;
    inventory.push(step.reward);
  }

  if (step.showHistory) {
    output += `<p><strong>Histórico da jornada:</strong><br>${journeyHistory.join('<br>')}</p>`;
  }

  app.innerHTML = output;

  const links = app.querySelectorAll("a");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.dataset.target;
      saveProgress(target, link.textContent);
      currentStep = target;
      window.history.pushState(null, "", `?step=${target}`);
      renderStory();
    });
  });
}

renderStory();