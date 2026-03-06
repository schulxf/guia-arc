import React, { useState } from 'react';
import { 
  Droplet, ArrowRightLeft, Image as ImageIcon, Code, 
  CheckCircle2, Circle, ExternalLink, ShieldCheck, 
  ChevronDown, ChevronUp, Trophy, Globe, AlertTriangle, ArrowRight, Gamepad2
} from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

// --- Dados do Tutorial Arc Testnet ---
const tutorialSteps = [
  {
    id: 'phase1',
    title: 'Fase 1: Preparação, Bridge e Faucets',
    description: 'O primeiro passo é obter fundos de teste e transferi-los para a Arc Testnet para pagar as taxas de transação.',
    icon: <Droplet className="w-6 h-6 text-[#4A90E2]" />,
    tasks: [
      {
        id: 't1_1',
        title: 'Reivindicar tokens no Faucet da Circle',
        desc: 'Acesse o faucet oficial da Circle para solicitar tokens USDC/EURC de teste.',
        link: 'http://faucet.circle.com'
      },
      {
        id: 't1_2',
        title: 'Reivindicar no Faucet Arc',
        desc: 'Obtenha tokens adicionais no faucet focado na rede Arc.',
        link: 'http://easyfaucetarc.xyz'
      },
      {
        id: 't1_3',
        title: 'Fazer Bridge de Tokens',
        desc: 'Transfira seus fundos de outras redes de teste para a Arc Testnet usando a ponte oficial.',
        link: 'http://arcplayground.netlify.app'
      }
    ]
  },
  {
    id: 'phase2',
    title: 'Fase 2: DeFi, Swaps e Liquidez',
    description: 'Interaja com protocolos de Finanças Descentralizadas para gerar volume e histórico de transações.',
    icon: <ArrowRightLeft className="w-6 h-6 text-[#4A90E2]" />,
    tasks: [
      {
        id: 't2_1',
        title: 'Testnet Axpha - Swap & Liquidez',
        desc: 'Conecte sua carteira, faça trocas (swaps) entre tokens e adicione liquidez na plataforma.',
        link: 'http://testnet.axpha.io'
      },
      {
        id: 't2_2',
        title: 'Swap Arc App',
        desc: 'Realize algumas transações de swap neste aplicativo nativo da Arc.',
        link: 'http://swaparc.app'
      },
      {
        id: 't2_3',
        title: 'Katrina DEX - Depósitos e Saques',
        desc: 'Interaja com a Katrina DEX depositando (Deposit) e retirando (Withdraw) tokens de teste.',
        link: 'http://katrinadex.xyz'
      },
      {
        id: 't2_4',
        title: 'Curve Finance - Swaps',
        desc: 'Utilize os pools da Curve Finance na rede Arc para realizar mais algumas trocas de tokens.',
        link: 'http://curve.finance/dex/arc/swap'
      }
    ]
  },
  {
    id: 'phase3',
    title: 'Fase 3: Smart Contracts e Infraestrutura',
    description: 'Atividades on-chain de alto valor, como implantação de contratos e subgraphs.',
    icon: <Code className="w-6 h-6 text-[#4A90E2]" />,
    tasks: [
      {
        id: 't3_1',
        title: 'Watchoor - Deploy All-in-One (+5 interações)',
        desc: 'Clique em "All" e depois em "Deploy" para gerar 5 interações em um único clique.',
        link: 'https://watchoor.xyz/deploy?chain=arc+testnet&action=All-in-One&ref=ZGCLNY9'
      },
      {
        id: 't3_2',
        title: 'Arc Contract Wiz',
        desc: 'Utilize esta ferramenta para fazer o deploy de um Smart Contract básico na rede Arc.',
        link: 'http://arccontractwiz.xyz'
      },
      {
        id: 't3_3',
        title: 'Enviar GM (Gerar Tx)',
        desc: 'Use a ferramenta do Watchoor para enviar mensagens "GM" na rede, onde cada GM conta como uma transação na carteira.',
        link: 'http://watchoor.xyz/improve-wallet'
      },
      {
        id: 't3_4',
        title: 'The Graph - Subgraphs',
        desc: 'Siga a documentação para criar, fazer deploy e consultar (query) um Subgraph na The Graph Network.',
        link: 'http://thegraph.com/docs/en/supported-networks/arc-testnet'
      }
    ]
  },
  {
    id: 'phase4',
    title: 'Fase 4: NFTs, Gamificação e Mercados',
    description: 'Crie e cunhe NFTs, interaja com jogos e faça previsões para diversificar sua carteira.',
    icon: <Gamepad2 className="w-6 h-6 text-[#4A90E2]" />,
    tasks: [
      {
        id: 't4_1',
        title: 'Mintar NFTs (Caset e Draze)',
        desc: 'Acesse os links abaixo e cunhe (mint) os NFTs promocionais disponíveis na testnet:',
        subLinks: [
          { name: 'Kikio NFT', url: 'http://caset.network/kikio' },
          { name: 'Flora NFT', url: 'http://caset.network/flora' },
          { name: 'Draze Canvas', url: 'http://draze.io/canvas' }
        ]
      },
      {
        id: 't4_2',
        title: 'Criar sua própria coleção NFT',
        desc: 'Utilize a ferramenta do OmniHub para criar e implantar seu próprio NFT na Arc.',
        link: 'http://omnihub.xyz/create'
      },
      {
        id: 't4_3',
        title: 'Mercado de Previsões Arc',
        desc: 'Negocie e faça apostas/previsões usando fundos de teste no Arc Prediction Market.',
        link: 'http://arcprediction.app/browse'
      },
      {
        id: 't4_4',
        title: 'Arcade on Arc (Jogos)',
        desc: 'Relaxe jogando e interagindo com os games hospedados na Arc Testnet.',
        link: 'http://arcadeonarc.fun'
      }
    ]
  }
];

export default function App() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [expandedPhase, setExpandedPhase] = useState('phase1');

  // Calcula o progresso total
  const totalTasks = tutorialSteps.reduce((acc, phase) => acc + phase.tasks.length, 0);
  const progressPercentage = Math.round((completedTasks.length / totalTasks) * 100);

  const toggleTask = (taskId) => {
    setCompletedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const togglePhase = (phaseId) => {
    setExpandedPhase(prev => prev === phaseId ? null : phaseId);
  };

  return (
    <div className="min-h-screen bg-[#070707] text-gray-200 font-sans selection:bg-[#4A90E2] selection:text-white pb-12">
      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-[#070707]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center gap-3">
              {/* Logo Mercurius Crypto */}
              <img 
                src="https://i.imgur.com/QAqVuyN.png" 
                alt="Mercurius Crypto" 
                className="h-12 sm:h-[72px] object-contain py-2"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden items-center gap-2 font-bold text-xl tracking-widest text-white">
                MERCURIUS <span className="text-gray-500 font-light">CRYPTO</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-[#4A90E2] bg-[#4A90E2]/10 px-4 py-2 rounded-full border border-[#4A90E2]/20 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span className="hidden sm:inline">Custo de Interação:</span> $0
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        
        {/* Banner Estilizado Arc */}
        <div className="bg-[#4A90E2] rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-[0_0_30px_rgba(74,144,226,0.15)] mb-6">
          {/* Elementos Gráficos de Fundo */}
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
            <svg viewBox="0 0 200 200" className="absolute -right-10 -top-10 w-64 h-64 text-black" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="100" cy="100" r="80" />
              <path d="M100 20 L100 180 M20 100 L180 100" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-start">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tighter uppercase leading-none mb-1 drop-shadow-sm">
              Testnet Pública <span className="bg-[#1a2b4c] text-[#60A5FA] px-3 py-1 rounded-lg inline-block transform -skew-x-6 ml-2">No Ar</span>
            </h1>
            
            <div className="flex items-center gap-2 text-white/90 text-xl font-medium mt-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="transform -rotate-45">
                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
              Rede <span className="font-bold">Arc</span>
            </div>
          </div>
          
          <div className="relative z-10 mt-4 md:mt-0">
            <div className="inline-block border-2 border-white/20 rounded-full px-5 py-1.5 bg-[#1a2b4c]/30 backdrop-blur-sm">
              <span className="text-white font-bold text-sm uppercase tracking-wide">Arrecadou $2.2B (Backed by Circle)</span>
            </div>
          </div>
        </div>

        {/* CTA Mercurius Crypto Discreto */}
        <a 
          href="https://analise.mercuriuscrypto.com/reset-cripto?utm_source=youtube&utm_medium=video&utm_campaign=reset-cripto&utm_content=descricao" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex flex-col sm:flex-row items-center justify-center gap-2 bg-[#111] hover:bg-[#151515] border border-gray-800 hover:border-gray-700 rounded-xl p-4 transition-all mb-8 text-center"
        >
          <span className="text-gray-400 text-sm">
            Participe do meu treinamento
          </span>
          <span className="text-[#4A90E2] text-sm font-semibold flex items-center gap-1 group-hover:underline">
            Reset Cripto <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </a>

        {/* Estatísticas / Progresso */}
        <div className="mt-12 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Guia de Interações Passo a Passo</h3>
            <span className="text-[#4A90E2] font-mono font-bold bg-[#4A90E2]/10 px-3 py-1 rounded-md">
              {progressPercentage}% Concluído
            </span>
          </div>
          <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden border border-gray-800">
            <div 
              className="bg-[#4A90E2] h-full transition-all duration-500 ease-out shadow-[0_0_10px_#4A90E2]"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content / Steps */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {tutorialSteps.map((phase) => {
            const isExpanded = expandedPhase === phase.id;
            const phaseTasksCompleted = phase.tasks.filter(t => completedTasks.includes(t.id)).length;
            const isPhaseComplete = phaseTasksCompleted === phase.tasks.length;

            return (
              <div key={phase.id} className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden transition-all duration-200 hover:border-gray-700">
                {/* Phase Header */}
                <button 
                  onClick={() => togglePhase(phase.id)}
                  className="w-full px-6 py-5 flex items-center justify-between bg-[#151515] hover:bg-[#1a1a1a] transition-colors text-left focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${isPhaseComplete ? 'bg-[#4A90E2]/20 text-[#4A90E2]' : 'bg-gray-800 text-gray-400'}`}>
                      {isPhaseComplete ? <CheckCircle2 className="w-6 h-6" /> : phase.icon}
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold ${isPhaseComplete ? 'text-gray-500 line-through decoration-gray-600' : 'text-white'}`}>
                        {phase.title}
                      </h3>
                      <p className="text-sm text-gray-400 hidden sm:block mt-0.5">{phase.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-mono text-gray-500">
                      {phaseTasksCompleted}/{phase.tasks.length}
                    </span>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </div>
                </button>

                {/* Phase Content (Tasks) */}
                {isExpanded && (
                  <div className="p-6 border-t border-gray-800 space-y-4 bg-[#0a0a0a]">
                    {phase.tasks.map(task => {
                      const isTaskDone = completedTasks.includes(task.id);
                      
                      return (
                        <div key={task.id} className={`p-5 rounded-xl border ${isTaskDone ? 'bg-[#4A90E2]/5 border-[#4A90E2]/20' : 'bg-[#111] border-gray-800'} transition-all`}>
                          <div className="flex flex-col sm:flex-row gap-5 justify-between items-start sm:items-center">
                            <div className="flex-1">
                              <h4 className={`text-base font-bold ${isTaskDone ? 'text-gray-400' : 'text-white'} flex items-center gap-2`}>
                                {task.title}
                              </h4>
                              <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">{task.desc}</p>
                              
                              {/* Sublinks if available */}
                              {task.subLinks && (
                                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                  {task.subLinks.map((sub, idx) => (
                                    <a 
                                      key={idx} 
                                      href={sub.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-xs flex items-center justify-between px-3 py-2.5 bg-black hover:bg-gray-900 border border-gray-800 rounded-lg text-gray-300 hover:text-[#4A90E2] transition-colors group"
                                    >
                                      <span className="truncate pr-2 font-medium">{sub.name}</span>
                                      <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 text-gray-600 group-hover:text-[#4A90E2]" />
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                            
                            <div className="flex flex-row sm:flex-col items-center sm:items-stretch gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                              {task.link && (
                                <a 
                                  href={task.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-semibold transition-colors border border-gray-700"
                                >
                                  Acessar <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                              
                              <button 
                                onClick={() => toggleTask(task.id)}
                                className={`flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors border ${
                                  isTaskDone 
                                    ? 'bg-[#4A90E2]/10 text-[#4A90E2] border-[#4A90E2]/30 hover:bg-[#4A90E2]/20' 
                                    : 'bg-transparent text-gray-400 border-gray-600 hover:border-gray-400 hover:text-white'
                                }`}
                              >
                                {isTaskDone ? (
                                  <><CheckCircle2 className="w-4 h-4" /> Concluído</>
                                ) : (
                                  <><Circle className="w-4 h-4" /> Marcar Feito</>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-800 bg-[#070707] py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4 text-center">
          
          {/* Aviso de Airdrop Discreto no Rodapé */}
          <div className="flex items-center justify-center gap-2 text-yellow-500/80 text-xs font-medium bg-yellow-500/10 px-4 py-2 rounded-full border border-yellow-500/20 mb-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Airdrop não confirmado. Interações de caráter especulativo e educacional.</span>
          </div>

          <div className="flex items-center gap-2 text-gray-500">
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-widest">Arc Testnet Environment</span>
          </div>
          <p className="text-gray-600 text-xs max-w-2xl mt-2">
            Este material foi criado com o objetivo de mapear interações gratuitas na rede de testes (Testnet) e não garante qualquer tipo de retorno financeiro, airdrop ou recompensa por parte da Arc ou projetos associados.
          </p>
        </div>
      </footer>
      <Analytics />
    </div>
  );
}