window.RESOLUCOES = {
  136: {
    title: 'Como chegar a 15 policiais',
    intro: 'A ideia é comparar o comprimento da ciclovia inteira com o trecho protegido por cada policial. Vamos usar a mesma unidade em todas as contas: metros.',
    steps: [
      {
        title: 'Converter o raio para metros',
        explanation: 'O enunciado informa que o raio da lagoa mede 1 km. Como a distância protegida é dada em metros, convertemos o raio antes de calcular.',
        equation: 'r = 1 km = 1 000 m'
      },
      {
        title: 'Calcular o comprimento da ciclovia',
        explanation: 'A ciclovia é circular. Seu comprimento é a circunferência C = 2πr. O enunciado pede para usar π = 3.',
        equation: 'C = 2 × 3 × 1 000 = 6 000 m'
      },
      {
        title: 'Descobrir quanto cada policial cobre',
        explanation: 'A partir da posição do policial, ficam protegidos 200 m para um lado e 200 m para o outro lado da ciclovia.',
        equation: '200 m + 200 m = 400 m',
        coverage: true
      },
      {
        title: 'Dividir a volta inteira pelo trecho protegido',
        explanation: 'Agora dividimos os 6 000 m da ciclovia pelos 400 m cobertos por policial. Podemos simplificar dividindo os dois números por 100.',
        equation: '6 000 ÷ 400 = 60 ÷ 4 = 15'
      }
    ],
    conclusion: 'São necessários, no mínimo, 15 policiais para proteger toda a ciclovia.',
    answer: 'Alternativa C'
  },
  137: {
    title: 'Por que retiramos 5 litros?',
    intro: 'O segredo desta questão é acompanhar a substância S₂. Só retiramos S₁; por isso, a quantidade de S₂ permanece igual do começo ao fim.',
    steps: [
      {
        title: 'Encontrar S₂ na mistura inicial',
        explanation: 'Se S₁ representa 99,95%, o restante é S₂: 100% − 99,95% = 0,05%. Calculamos 0,05% dos 10 litros iniciais.',
        equations: ['S₂ inicial = 10 × (0,05 ÷ 100) = 0,005 L', 'S₁ inicial = 10 − 0,005 = 9,995 L']
      },
      {
        title: 'Entender o que muda na mistura final',
        explanation: 'Depois da retirada, S₁ deve ser 99,90%. Então S₂ passa a representar 100% − 99,90% = 0,10%. A porcentagem de S₂ mudou, mas seus 0,005 L continuam no recipiente.',
        equation: 'S₂ final = 0,10% da mistura = 0,005 L'
      },
      {
        title: 'Montar a regra de três',
        explanation: 'Na mistura final, porcentagem e volume correspondem: 0,10% equivale aos 0,005 L de S₂ que conhecemos. Queremos saber quantos litros de S₁ correspondem aos 99,90%. Usamos a mesma mistura final nas duas linhas.',
        proportion: [
          ['S₂', '0,10%', '0,005 L'],
          ['S₁', '99,90%', 'x L']
        ]
      },
      {
        title: 'Resolver a proporção',
        explanation: 'Multiplicamos em cruz e isolamos x. Assim encontramos a quantidade de S₁ que restou, não a quantidade retirada.',
        equations: ['x = (99,90 × 0,005) ÷ 0,10', 'x = 4,995 L de S₁ no final']
      },
      {
        title: 'Descobrir quanto foi retirado',
        explanation: 'Comparamos a quantidade de S₁ antes e depois da retirada.',
        equation: '9,995 − 4,995 = 5,000 L'
      }
    ],
    tip: {
      title: 'Macete para conferir',
      text: 'A quantidade de S₂ ficou igual, mas sua participação dobrou: de 0,05% para 0,10%. Para a mesma quantidade ocupar o dobro da porcentagem, o volume total precisa cair pela metade: de 10 L para 5 L. Como só retiramos S₁, saíram 5 L.',
      equation: '10 L iniciais − 5 L finais = 5 L retirados'
    },
    conclusion: 'Foram retirados 5 litros da substância S₁.',
    answer: 'Alternativa E'
  },
  138: {
    title: 'Primeiro o descarte, depois o novo pedido',
    intro: 'A questão traz três ações diferentes: encomendar, enviar e receber. Para descobrir quanto enviar no novo pedido, primeiro precisamos saber quanto se perde no transporte.',
    steps: [
      {
        title: 'Descobrir o volume descartado',
        explanation: 'Na entrega anterior, a distribuidora enviou 10 200 L e o posto recebeu 9 900 L. A diferença é o combustível descartado durante o transporte.',
        equation: '10 200 − 9 900 = 300 L descartados'
      },
      {
        title: 'Calcular o dobro da encomenda',
        explanation: 'O pedido anterior foi de 10 000 L. O novo pedido deve ser exatamente o dobro dessa quantidade encomendada.',
        equation: '2 × 10 000 = 20 000 L para entregar'
      },
      {
        title: 'Adicionar o descarte ao envio',
        explanation: 'O enunciado diz que o mesmo volume de 300 L é descartado em qualquer transporte. Para que cheguem 20 000 L ao posto, a distribuidora precisa enviar esses 300 L a mais.',
        equation: '20 000 + 300 = 20 300 L para enviar'
      }
    ],
    tip: {
      title: 'Macete de leitura',
      text: 'Associe cada verbo à conta: “enviou” menos “recebeu” revela o descarte; “dobro” se refere ao que foi encomendado. No fim, confira se o volume enviado, após o descarte, entrega o pedido completo.',
      equation: '20 300 enviados − 300 descartados = 20 000 entregues'
    },
    conclusion: 'A distribuidora deve enviar, no mínimo, 20 300 litros de gasolina.',
    answer: 'Alternativa C'
  },
  139: {
    title: 'A mediana está no centro da lista',
    intro: 'Para encontrar a mediana, primeiro organizamos todas as velocidades em ordem crescente. Só depois olhamos para o centro da lista.',
    steps: [
      {
        title: 'Ordenar as dez velocidades',
        explanation: 'Lendo o quadro e colocando os valores do menor para o maior, obtemos esta sequência em MB/s:',
        orderedValues: [320, 340, 350, 360, 380, 380, 390, 390, 390, 400]
      },
      {
        title: 'Localizar os dois valores do meio',
        explanation: 'Há 10 valores, uma quantidade par. Por isso, o centro fica entre o 5º e o 6º valores. Na lista ordenada, os dois são 380.',
        equation: '5º valor = 380   |   6º valor = 380'
      },
      {
        title: 'Ler a mediana',
        explanation: 'Como os dois valores centrais são iguais, a média entre eles é o próprio 380. Não precisamos fazer a conta.',
        equation: 'Mediana = 380 MB/s'
      }
    ],
    tip: {
      title: 'Macete da mediana',
      text: 'Com uma quantidade par de dados, procure sempre os dois números centrais. Se eles forem iguais, a mediana é esse mesmo número. Se forem diferentes, some os dois e divida por 2.',
      equation: '(valor central 1 + valor central 2) ÷ 2'
    },
    conclusion: 'A velocidade de referência será 380 MB/s.',
    answer: 'Alternativa C'
  },
  140: {
    title: 'Compare o sódio do pacote inteiro',
    intro: 'A estudante quer o menor total de sódio por pacote. O rótulo já informa o sódio de cada porção; portanto, basta relacionar essa quantidade ao número de porções.',
    steps: [
      {
        title: 'Escolher os dados que importam',
        explanation: 'Para achar o sódio total, usamos o número de porções e os miligramas de sódio por porção. Os gramas indicam o peso de cada porção, mas não entram nessa conta.',
        equation: 'sódio do pacote = porções × sódio por porção'
      },
      {
        title: 'Calcular a batata chips',
        explanation: 'O pacote de batata chips tem 3 porções, com 170 mg de sódio em cada uma.',
        equation: '3 × 170 = 510 mg de sódio no pacote'
      },
      {
        title: 'Eliminar os outros sem fazer quatro contas',
        explanation: 'Todos os outros pacotes têm pelo menos 4 porções e pelo menos 166 mg de sódio por porção. Mesmo combinando esses menores valores só para comparar, qualquer um deles teria no mínimo 664 mg, acima dos 510 mg da batata chips.',
        equation: '4 × 166 = 664 mg > 510 mg'
      }
    ],
    tip: {
      title: 'Macete de comparação',
      text: 'Depois de calcular um candidato, procure um limite mínimo para os concorrentes. Se até esse limite já for maior, não é necessário multiplicar os dados de cada produto.',
      equation: 'menor total possível dos outros > total da batata chips'
    },
    conclusion: 'A batata chips tem o menor total de sódio por pacote: 510 mg.',
    answer: 'Alternativa A'
  },
  141: {
    title: 'Quatro grupos de faces, quatro cores',
    intro: 'Faces congruentes são iguais em forma e tamanho. O desenho separa as faces externas da peça em grupos: cada grupo recebe uma cor.',
    diagram: {
      interactive: true,
      src: 'diagramas/141.svg',
      alt: 'Peça formada por um prisma hexagonal sob um tronco de pirâmide hexagonal. Os trapézios laterais são vermelhos, os retângulos laterais são verdes, o topo hexagonal é amarelo e a base inferior hexagonal é azul.',
      caption: 'Desenho esquemático da peça; a vista inferior revela a base que fica escondida na perspectiva.'
    },
    steps: [
      {
        title: 'Entender a peça montada',
        explanation: 'Embaixo está o prisma hexagonal reto; em cima, o tronco de pirâmide hexagonal reta. A face em que os dois sólidos se encostam fica dentro da peça e não é pintada.'
      },
      {
        title: 'Agrupar as faces laterais',
        explanation: 'As seis faces laterais do tronco são trapézios congruentes: uma cor. As seis faces laterais do prisma são retângulos congruentes: outra cor.',
        equation: 'trapézios: 1 cor   |   retângulos: 1 cor'
      },
      {
        title: 'Olhar as duas bases expostas',
        explanation: 'No alto há um hexágono menor. Na parte de baixo há um hexágono maior. Como têm tamanhos diferentes, essas faces não são congruentes e precisam de cores diferentes.',
        equation: 'topo menor: 1 cor   |   base inferior maior: 1 cor'
      },
      {
        title: 'Contar os grupos de faces',
        explanation: 'Contamos os tipos de face, não cada face separadamente.',
        equation: '1 + 1 + 1 + 1 = 4 cores'
      }
    ],
    tip: {
      title: 'Macete para não contar cores a mais',
      text: 'A base maior do tronco coincide com a base superior do prisma. Depois que os sólidos são unidos, esse hexágono fica no interior e não aparece na superfície a pintar.',
      equation: 'superfície externa = laterais + topo + base inferior'
    },
    conclusion: 'São necessárias 4 cores para pintar as faces externas da peça.',
    answer: 'Alternativa D'
  },
  142: {
    title: 'Quando a curva desce e quando fica reta?',
    intro: 'O gráfico mostra a frequência respiratória ao longo do tempo. Para responder, acompanhe a direção da linha a partir do início da meditação, marcado por t₁.',
    diagram: {
      src: 'diagramas/142.svg',
      alt: 'Gráfico comentado: a frequência respiratória fica em f₁ até t₁, diminui entre t₁ e t₂ e permanece constante em f₂ após t₂.',
      caption: 'Em vermelho, a queda da frequência; em azul, o trecho horizontal após a estabilização.'
    },
    steps: [
      {
        title: 'Ler os eixos e o início da meditação',
        explanation: 'O eixo horizontal representa o tempo; o vertical representa a frequência respiratória. A prática começa em t₁, quando a frequência está em f₁.'
      },
      {
        title: 'Acompanhar o trecho entre t₁ e t₂',
        explanation: 'À medida que o tempo passa, a curva desce. Isso significa que a frequência respiratória diminui até atingir o nível mais baixo, f₂, em t₂.',
        equation: 'de t₁ até t₂: frequência diminui'
      },
      {
        title: 'Observar o que acontece depois de t₂',
        explanation: 'Depois de t₂, a linha fica horizontal. O tempo continua passando, mas a frequência permanece no mesmo valor f₂.',
        equation: 'após t₂: frequência constante'
      }
    ],
    tip: {
      title: 'Macete de leitura de gráfico',
      text: 'Linha descendo indica diminuição; linha horizontal indica valor constante. t₁ e t₂ são nomes dos instantes marcados no eixo do tempo, não os números 1 e 2 em minutos.',
      equation: 'desce → diminui   |   horizontal → constante'
    },
    conclusion: 'A frequência diminui até t₂ e, a partir desse instante, torna-se constante.',
    answer: 'Alternativa D'
  },
  143: {
    title: 'Diferença entre os dois tempos',
    intro: 'Basta subtrair o tempo de Usain Bolt da marca de referência de 10,00 segundos.',
    steps: [
      {
        title: 'Calcular a diferença',
        explanation: 'Alinhe as casas decimais e subtraia os dois tempos.',
        equation: '10,00 − 9,58 = 0,42 segundo'
      }
    ],
    conclusion: 'A diferença é de 0,42 segundo.',
    answer: 'Alternativa B'
  },
  144: {
    title: 'Mova o cubo, uma casa por vez',
    intro: 'O cubo começa na casa (5, 1, 6). Gire o espaço com o mouse e use os controles para acompanhar cada deslocamento. As marcas nos planos mostram as três projeções ortogonais.',
    diagram: { interactiveGrid: true },
    steps: [
      {
        title: 'Aproximar-se 3 casas do plano yz',
        explanation: 'O plano yz é onde x = 0. Aproximar-se dele diminui a coordenada x. As outras duas coordenadas ficam iguais.',
        equation: '(5, 1, 6) → (2, 1, 6)   |   x: 5 − 3 = 2'
      },
      {
        title: 'Afastar-se 5 casas do plano xz',
        explanation: 'O plano xz é onde y = 0. Afastar-se dele aumenta a coordenada y.',
        equation: '(2, 1, 6) → (2, 6, 6)   |   y: 1 + 5 = 6'
      },
      {
        title: 'Aproximar-se 4 casas do plano xy',
        explanation: 'O plano xy é onde z = 0. Aproximar-se dele diminui a altura z.',
        equation: '(2, 6, 6) → (2, 6, 2)   |   z: 6 − 4 = 2'
      },
      {
        title: 'Conferir as três projeções finais',
        explanation: 'Na posição (2, 6, 2), a projeção no plano yz marca y = 6 e z = 2; no plano xz marca x = 2 e z = 2; no plano xy marca x = 2 e y = 6. Essa disposição aparece na alternativa E.',
        equation: 'yz: (6, 2)   |   xz: (2, 2)   |   xy: (2, 6)'
      }
    ],
    tip: {
      title: 'Macete dos planos',
      text: 'O nome do plano mostra as coordenadas que ficam nele. A coordenada que não aparece no nome mede a distância até esse plano: x para yz, y para xz e z para xy.',
      equation: 'yz ↔ x   |   xz ↔ y   |   xy ↔ z'
    },
    conclusion: 'A posição final é (2, 6, 2), com as projeções da alternativa E.',
    answer: 'Alternativa E'
  },
  145: {
    title: 'Homens que acessam redes sociais',
    intro: 'A pergunta escolhe um internauta ao acaso. Queremos descobrir qual parte de todos os internautas é formada por homens que acessam redes sociais.',
    steps: [
      {
        title: 'Identificar quem acessa redes sociais',
        explanation: 'O infográfico diz que 90% dos internautas acessam redes sociais. Imagine 100 internautas: 90 deles estão nesse grupo.',
        equation: '100 internautas → 90 acessam redes sociais'
      },
      {
        title: 'Descobrir a parte de homens nesse grupo',
        explanation: 'Entre as pessoas que acessam redes sociais, 60% são mulheres. O restante são homens: 100% − 60% = 40%. Esse 40% se refere aos 90 internautas que acessam as redes, e não aos 100 iniciais.',
        equation: '40% dos 90 internautas são homens'
      },
      {
        title: 'Calcular 40% de 90%',
        explanation: 'Em porcentagem, a palavra “de” indica multiplicação. Multiplicamos a parte que acessa redes sociais pela parte de homens dentro desse grupo.',
        equation: '40% × 90% = 0,40 × 0,90 = 0,36 = 36%'
      }
    ],
    tip: {
      title: 'Macete dos 100 internautas',
      text: 'Se começarmos com 100 internautas, 90 acessam redes sociais. De cada 10 desses 90, 4 são homens. Assim, 40% de 90 são 36 homens entre os 100 internautas iniciais.',
      equation: '36 em 100 = 36/100 = 36%'
    },
    conclusion: 'A probabilidade de escolher um homem que acessa redes sociais é 36/100, ou 36%.',
    answer: 'Alternativa B'
  },
  146: {
    title: 'Qual cilindro comporta o gás da semana?',
    intro: 'O cilindro mais barato será o de menor capacidade que consiga guardar todo o gás necessário para uma semana.',
    steps: [
      {
        title: 'Calcular a distância da semana',
        explanation: 'O carro percorre 30 km por dia durante 7 dias. Multiplicamos para descobrir a distância semanal.',
        equation: '30 × 7 = 210 km por semana'
      },
      {
        title: 'Descobrir quanto gás é necessário',
        explanation: 'Cada 1 m³ de gás permite rodar 13 km. Por isso, dividimos a distância total por 13: o resultado diz quantos metros cúbicos serão consumidos.',
        equation: '210 ÷ 13 ≈ 16,15 m³'
      },
      {
        title: 'Escolher a menor capacidade suficiente',
        explanation: 'O cilindro de 14 m³ não comporta 16,15 m³. Entre as capacidades disponíveis, 17 m³ é a menor que comporta essa quantidade. Como o preço cresce com a capacidade, também é a opção mais barata que permite apenas um abastecimento semanal.',
        equation: '14 < 16,15 < 17 → escolher 17 m³'
      }
    ],
    tip: {
      title: 'Não arredonde para baixo',
      text: 'A capacidade precisa ser pelo menos igual ao consumo. Se faltar um pouco de espaço para o gás, será necessário abastecer novamente antes do fim da semana.',
      equation: 'capacidade do cilindro ≥ gás consumido na semana'
    },
    conclusion: 'O cilindro de 17 m³ é o menor que atende aos 210 km semanais.',
    answer: 'Alternativa C'
  },
  147: {
    title: 'Teste o ponto e observe a diagonal',
    intro: 'O herói deve ficar à mesma distância dos vilões T e V. Pela simetria do quadrado, todos os pontos da diagonal que passa por S ficam à mesma distância deles. Não precisamos calcular distâncias: basta usar o ponto S e olhar a direção da reta.',
    diagram: {
      src: 'diagramas/147.svg',
      alt: 'Quadrado no plano cartesiano com a diagonal de U até S destacada. Da esquerda para a direita, a diagonal desce.',
      caption: 'A diagonal que passa por S desce quando caminhamos da esquerda para a direita.'
    },
    steps: [
      {
        title: 'Usar o ponto que já conhecemos',
        explanation: 'O ponto S está na trajetória e tem coordenadas x = 6 e y = 2. Substituímos esses valores nas equações das alternativas: a correta precisa produzir 2 quando x vale 6.',
        equation: 'S = (6, 2) → testar x = 6 e y = 2'
      },
      {
        title: 'Eliminar as equações que não passam por S',
        explanation: 'Na A, −3 × 6 + 20 = 2. Na E, 3 × 6 − 16 = 2. As duas passam por S. Nas alternativas B, C e D, o resultado seria −2, −38 e 34, respectivamente; nenhuma delas produz y = 2.',
        equation: 'A: 2 = −18 + 20 ✓   |   E: 2 = 18 − 16 ✓'
      },
      {
        title: 'Escolher pela direção da reta',
        explanation: 'Na figura, a diagonal desce da esquerda para a direita: quando x aumenta, y diminui. Em y = ax + b, isso acontece quando a é negativo. A alternativa A tem a = −3; a E tem a = +3 e subiria.',
        equation: 'reta descendo → a < 0 → y = −3x + 20'
      }
    ],
    tip: {
      title: 'Macete rápido',
      text: 'Primeiro veja quais opções passam pelo ponto dado. Se sobrar mais de uma, olhe se a reta sobe ou desce no desenho: coeficiente de x positivo faz subir; negativo faz descer.',
      equation: 'passa por S + desce → alternativa A'
    },
    conclusion: 'A trajetória é a diagonal descendente que passa por S: y = −3x + 20.',
    answer: 'Alternativa A'
  },
  148: {
    title: 'Somar o estoque e comparar com a demanda',
    intro: 'As duas barras de cada gênero mostram o estoque: livros de autores brasileiros e estrangeiros. A linha azul mostra a demanda. Só é preciso encomendar mais livros quando a soma das barras fica abaixo da linha.',
    steps: [
      {
        title: 'Somar as duas partes do estoque',
        explanation: 'Para autoajuda, há 50 livros de autores brasileiros e 80 de autores estrangeiros. Juntos, são 130 livros disponíveis.',
        equation: 'autoajuda: 50 + 80 = 130 livros em estoque'
      },
      {
        title: 'Comparar com a demanda',
        explanation: 'A demanda por autoajuda é de 135 livros. Como a livraria tem apenas 130, faltam 5 exemplares: esse é o gênero que precisa de encomenda.',
        equation: '130 < 135 → faltam 5 livros'
      },
      {
        title: 'Conferir os outros gêneros',
        explanation: 'Nos demais, a soma das barras já cobre a demanda: ficção tem 200 para uma demanda de 160; romance, 145 para 140; biografia, 95 para 80.',
        equation: 'estoque ≥ demanda → não precisa encomendar'
      }
    ],
    tip: {
      title: 'Macete de leitura do gráfico',
      text: 'Não escolha apenas pela linha de demanda mais alta ou pela menor barra isolada. Some as duas barras do mesmo gênero e compare com o ponto da linha acima dele.',
      equation: 'estoque total < demanda → encomendar'
    },
    conclusion: 'Somente em autoajuda o estoque é insuficiente para atender à demanda.',
    answer: 'Alternativa C'
  },
  149: {
    title: 'O que permanece igual em 2025?',
    intro: 'Esta é a pegadinha: o enunciado fala em “mesmo total” e “mesma distribuição percentual”, mas usa anos diferentes para cada informação. O total vem de 2024; os percentuais vêm de 2023.',
    steps: [
      {
        title: 'Encontrar o total de matrículas de 2024',
        explanation: 'O gráfico de barras mostra a quantidade em cada idioma. Somamos todas as barras porque é o total de matrículas de 2024 que será repetido em 2025.',
        equation: '280 + 80 + 20 + 20 = 400 matrículas'
      },
      {
        title: 'Encontrar o percentual de francês de 2023',
        explanation: 'No gráfico de setores, francês corresponde a 10%. É essa porcentagem que será usada novamente em 2025.',
        equation: 'francês em 2025: 10% do total'
      },
      {
        title: 'Aplicar a porcentagem ao total',
        explanation: '“10% de 400” significa multiplicar 400 por 0,10. Assim descobrimos a quantidade de matrículas em francês prevista para 2025.',
        equation: '10% × 400 = 0,10 × 400 = 40 matrículas'
      }
    ],
    tip: {
      title: 'Atenção à palavra “mesmo”',
      text: 'O enunciado não diz que francês continuará com 20 matrículas, como em 2024. Ele mantém o total de 2024 e aplica a porcentagem de francês de 2023 a esse total.',
      equation: 'total de 2024 + percentual de 2023 → quantidade de 2025'
    },
    conclusion: 'A estimativa é de 40 matrículas no curso de francês em 2025.',
    answer: 'Alternativa E'
  },
  150: {
    title: 'Compare os deslocamentos reais',
    intro: 'A pergunta quer apenas o deslocamento de maior comprimento. Como cada desenho usa uma escala diferente, precisamos transformar os cinco comprimentos da tela em comprimentos reais antes de comparar.',
    steps: [
      {
        title: 'Entender a escala',
        explanation: 'Uma escala 1:100 quer dizer que 1 cm na tela representa 100 cm no deslocamento real. Portanto, multiplicamos o comprimento mostrado pelo número depois dos dois-pontos.',
        equation: 'comprimento real = comprimento na tela × fator da escala'
      },
      {
        title: 'Calcular os cinco deslocamentos',
        explanation: 'Todos os resultados ficam em centímetros, então podemos compará-los diretamente. Atenção: a escala do deslocamento IV é 1:700.',
        equations: [
          'I: 9 × 100 = 900 cm',
          'II: 5 × 300 = 1.500 cm',
          'III: 5 × 600 = 3.000 cm',
          'IV: 3 × 700 = 2.100 cm',
          'V: 2 × 1.000 = 2.000 cm'
        ]
      },
      {
        title: 'Escolher o maior resultado',
        explanation: 'O deslocamento III mede 3.000 cm na realidade, mais do que todos os outros.',
        equation: '3.000 cm é o maior → deslocamento III'
      }
    ],
    tip: {
      title: 'Macete da escala 1:n',
      text: 'Leia 1:n como “1 no desenho representa n na realidade”. Para achar a medida real, multiplique a medida do desenho por n.',
      equation: '1:n → medida real = medida desenhada × n'
    },
    conclusion: 'O maior deslocamento é o III, de 3.000 cm.',
    answer: 'Alternativa C'
  },
  151: {
    title: 'Conte os vértices girando a peça',
    intro: 'Um vértice é um canto onde as arestas se encontram. Gire o modelo 3D e toque nos grupos abaixo dele para destacar os pontos. As cores acompanham a figura da questão: base vermelha, triângulos azuis, quadrados amarelos e topo verde.',
    diagram: { interactiveCupola: true },
    steps: [
      {
        title: 'Contar os cantos da base vermelha',
        explanation: 'A face vermelha é um decágono. Ao girar para a vista da base, podemos contar seus 10 cantos.',
        equation: 'base vermelha: 10 vértices'
      },
      {
        title: 'Contar a junção central',
        explanation: 'Na linha onde a faixa de triângulos azuis se encontra com a parte superior, há mais 10 vértices. Gire a peça para enxergar também os que ficam atrás.',
        equation: 'junção central: 10 vértices'
      },
      {
        title: 'Contar os cantos do topo verde',
        explanation: 'A face verde é um pentágono, com 5 cantos. Somamos os três grupos, sem contar duas vezes um canto compartilhado por faces vizinhas.',
        equation: '10 + 10 + 5 = 25 vértices'
      }
    ],
    tip: {
      title: 'Faces não são vértices',
      text: 'As regiões coloridas são faces. Para contar vértices, procure apenas os pontos onde as linhas se encontram. Um mesmo ponto pode pertencer a várias faces, mas entra uma vez só na contagem.',
      equation: '10 na base + 10 no meio + 5 no topo'
    },
    conclusion: 'A cúpula pentagonal giralongada tem 25 vértices.',
    answer: 'Alternativa B'
  },
  152: {
    title: 'Organize a regra de três em uma tabela',
    intro: 'Primeiro, coloque lado a lado as três grandezas do enunciado: funcionários, horas de trabalho por dia e unidades de tijolos produzidas por dia.',
    steps: [
      {
        title: 'Preencher a tabela com os dados do enunciado',
        explanation: 'A primeira linha de números é a situação inicial; a segunda é a nova situação. A quantidade que queremos descobrir fica como x na coluna Unidades. No PDF, a produção inicial é 720 unidades.',
        table: {
          headers: ['Funcionários', 'Horas por dia', 'Unidades por dia'],
          rows: [['3', '6', '720'], ['5', '9', 'x']]
        }
      },
      {
        title: 'Verificar a relação entre as grandezas',
        explanation: 'Mais funcionários trabalhando pelo mesmo tempo produzem mais tijolos. Mais horas com o mesmo número de funcionários também produzem mais. As duas relações são diretamente proporcionais à produção; por isso, não precisamos inverter nenhuma coluna da tabela.',
        equation: 'funcionários ↑ → tijolos ↑   |   horas ↑ → tijolos ↑'
      },
      {
        title: 'Ler as frações diretamente da tabela',
        explanation: 'Leia cada coluna de cima para baixo: Unidades dá 720/x, Funcionários dá 3/5 e Horas dá 6/9. Como as duas relações são diretas, multiplicamos as frações de Funcionários e Horas sem trocar a ordem.',
        equations: [
          '720/x = (3/5) × (6/9)',
          '720/x = 18/45'
        ]
      },
      {
        title: 'Multiplicar cruzado e encontrar x',
        explanation: 'Na igualdade de frações, multiplicamos cruzado: 720 × 45 = 18 × x. Depois dividimos os dois lados por 18.',
        equations: [
          '18x = 720 × 45',
          'x = (720 × 45) ÷ 18 = 1.800'
        ]
      }
    ],
    tip: {
      title: 'Atalho: produção por funcionário-hora',
      text: 'Antes eram 3 × 6 = 18 horas de trabalho somadas por dia. Cada funcionário-hora rendia 720 ÷ 18 = 40 tijolos. Depois serão 5 × 9 = 45 funcionário-horas: 45 × 40 = 1.800 tijolos.',
      equation: '720 ÷ (3 × 6) = 40;   40 × (5 × 9) = 1.800'
    },
    conclusion: 'A nova produção diária será de 1.800 tijolos.',
    answer: 'Alternativa D'
  },
  153: {
    title: 'Monte o código na ordem do enunciado',
    intro: 'O código tem 7 dígitos, divididos em quatro blocos: 1 para o andar, 2 para o setor, 3 para o funcionário e 1 para o turno. Basta preencher cada bloco e juntá-los da esquerda para a direita.',
    steps: [
      {
        title: 'Primeiro bloco: andar',
        explanation: 'A empresa fica no 2º andar. O primeiro dígito do código é 2.',
        equation: 'andar → 2'
      },
      {
        title: 'Segundo bloco: setor',
        explanation: 'O setor é o 08. Esse bloco precisa de dois dígitos, então mantemos o zero antes do 8.',
        equation: 'setor → 08'
      },
      {
        title: 'Terceiro bloco: funcionário',
        explanation: 'O visitante vai se reunir com o funcionário 109. Ele ocupa os três dígitos seguintes.',
        equation: 'funcionário → 109'
      },
      {
        title: 'Quarto bloco: turno e código completo',
        explanation: 'A chegada foi às 10 horas da manhã, representada pelo dígito 0. Agora é só juntar os blocos na ordem; não fazemos soma.',
        equation: '2 | 08 | 109 | 0 → 2081090'
      }
    ],
    tip: {
      title: 'Cuidado com o zero inicial',
      text: 'O setor 08 ocupa duas posições. Se escrever apenas 8, o código ficará com 6 dígitos em vez dos 7 exigidos.',
      equation: '1 + 2 + 3 + 1 = 7 dígitos'
    },
    conclusion: 'O código de identificação é 2081090.',
    answer: 'Alternativa D'
  },
  154: {
    title: 'Uma entrega de cada vez',
    intro: 'Imagine que os envelopes são entregues um a um. Para todos receberem o próprio celular, cada entrega precisa estar certa. A cada entrega, um envelope sai do grupo e restam menos possibilidades.',
    steps: [
      {
        title: 'Primeiro candidato',
        explanation: 'Há 4 envelopes, mas só 1 contém o celular dele. A chance de acertar é 1 em 4.',
        equation: '1ª entrega: 1/4'
      },
      {
        title: 'Segundo candidato',
        explanation: 'Se a primeira entrega foi correta, restam 3 envelopes. Entre eles, só 1 pertence ao segundo candidato.',
        equation: '2ª entrega: 1/3'
      },
      {
        title: 'Terceiro candidato',
        explanation: 'Se as duas primeiras entregas foram corretas, restam 2 envelopes. Só 1 é o certo para o terceiro candidato.',
        equation: '3ª entrega: 1/2'
      },
      {
        title: 'Quarto candidato e resultado',
        explanation: 'Se os três primeiros acertaram, o último envelope só pode ser do quarto candidato: chance 1 em 1. Multiplicamos as chances de cada etapa, sempre considerando que as anteriores deram certo.',
        equations: [
          '4ª entrega: 1/1',
          '(1/4) × (1/3) × (1/2) × (1/1) = 1/24'
        ]
      }
    ],
    tip: {
      title: 'Por que o denominador diminui?',
      text: 'Os envelopes são devolvidos sem repetir: depois de entregar um, ele não participa do próximo sorteio. Assim, as opções restantes são 4, depois 3, depois 2 e, por fim, 1.',
      equation: '4 → 3 → 2 → 1 envelopes'
    },
    conclusion: 'A probabilidade de todos receberem seus próprios celulares é 1/24.',
    answer: 'Alternativa D'
  },
  155: {
    title: 'Descubra quanto vale cada intervalo da grade',
    intro: 'O gráfico de setores informa que 80 alunos praticam basquete, representado pela cor roxa. Use esse dado para descobrir o valor de cada intervalo horizontal no gráfico de barras; depois é só contar.',
    steps: [
      {
        title: 'Usar as barras roxas como régua',
        explanation: 'As barras do basquete medem 1 intervalo na 1ª série, 3 na 2ª e 4 na 3ª: são 8 intervalos ao todo. Como eles representam 80 alunos, cada intervalo vale 10.',
        equation: '1 + 3 + 4 = 8 intervalos → 80 ÷ 8 = 10 alunos por intervalo'
      },
      {
        title: 'Contar os intervalos de cada série',
        explanation: 'Some as alturas das três barras de cada série, contando os espaços entre as linhas da grade. Não é necessário fazer uma regra de três para cada barra.',
        equations: [
          '1ª série: 7 + 3 + 1 = 11 intervalos → 110 alunos',
          '2ª série: 6 + 3 + 3 = 12 intervalos → 120 alunos',
          '3ª série: 5 + 4 + 4 = 13 intervalos → 130 alunos'
        ]
      },
      {
        title: 'Juntar as três séries',
        explanation: 'Como cada estudante aparece em uma única modalidade e em uma única série, somamos os três totais para obter o número de alunos do ensino médio.',
        equation: '110 + 120 + 130 = 360 alunos'
      }
    ],
    tip: {
      title: 'Macete do gráfico sem números no eixo',
      text: 'Quando o eixo não traz valores, procure uma quantidade conhecida em outro gráfico. Aqui, os 80 alunos do basquete transformam os intervalos da grade em uma régua de 10 em 10.',
      equation: '1 intervalo da grade = 10 alunos'
    },
    conclusion: 'A escola tem 360 estudantes no ensino médio.',
    answer: 'Alternativa B'
  },
  156: {
    title: 'Deslize a rota e forme um triângulo',
    intro: 'Como a velocidade é constante, podemos medir cada percurso pelo tempo de navegação. Os trechos P→Q e P→S medem 4 horas cada; Q→R e S→T medem 2 horas cada e seguem para leste. O desenho mostra como a rota final T→R se transforma no lado S→Q de um triângulo.',
    diagram: {
      src: 'diagramas/156.svg',
      alt: 'Duas rotas da embarcação. Os trechos ST e QR têm o mesmo comprimento e são paralelos, por isso TR é igual e paralelo a SQ. No triângulo isósceles PSQ, PS e PQ medem 4 horas, o ângulo P mede 130 graus e os ângulos da base medem 25 graus. A rota final segue a 135 graus por aproximadamente 7 horas e 15 minutos.'
    },
    steps: [
      {
        title: 'Trocar a rota final por um lado do triângulo',
        explanation: 'S→T e Q→R são deslocamentos iguais de 2 horas para leste. Ao deslocar o segmento T→R duas horas para a esquerda, sua ponta T chega a S e sua ponta R chega a Q. Portanto, T→R tem o mesmo comprimento e a mesma direção que S→Q.',
        equation: 'ST ∥ QR e ST = QR → TR ∥ SQ e TR = SQ'
      },
      {
        title: 'Ler o ângulo entre as duas partidas de P',
        explanation: 'A direção 340° fica 20° antes do norte (0°). Daí até 110° são mais 110°. O ângulo entre P→S e P→Q é 20° + 110° = 130°. Como os dois trechos duraram 4 horas, PSQ é isósceles.',
        equation: 'ângulo P = 130°; PS = PQ = 4 h'
      },
      {
        title: 'Calcular a duração da rota reta',
        explanation: 'Pela lei dos cossenos, usamos os dois lados de 4 horas e o ângulo de 130° entre eles. O enunciado dá cos 50° ≈ 0,64; como 130° = 180° − 50°, cos 130° ≈ −0,64.',
        equations: [
          'd² = 4² + 4² − 2 × 4 × 4 × cos 130°',
          'd² = 32 − 32 × (−0,64) = 52,48',
          'd = √52,48 ≈ 7,244 h'
        ]
      },
      {
        title: 'Converter a parte decimal em minutos',
        explanation: 'O resultado é um pouco maior que 7 horas. A parte decimal vale aproximadamente 0,244 hora; multiplicando por 60, obtemos cerca de 15 minutos.',
        equation: '0,244 × 60 ≈ 15 min → cerca de 7 h 15 min'
      },
      {
        title: 'Descobrir a direção T→R',
        explanation: 'Os ângulos da base do triângulo isósceles valem (180° − 130°)/2 = 25°. A direção S→P é oposta à de P→S: 340° + 180° = 520°, equivalente a 160° na bússola. De S→P até S→Q, giramos 25° em direção ao leste: 160° − 25° = 135°. Como T→R é paralelo a S→Q e aponta para o mesmo lado, também tem direção 135°.',
        equations: [
          'ângulos da base: (180° − 130°) ÷ 2 = 25°',
          'direção T→R = 160° − 25° = 135°'
        ]
      }
    ],
    tip: {
      title: 'Por que usar horas como medida de lado?',
      text: 'Cada distância é velocidade × tempo. Como a velocidade é a mesma em todos os trechos, ela aparece em todos os lados e se cancela na comparação. O valor de d já representa o tempo necessário para percorrer T→R.',
      equation: 'mesma velocidade → comparar 4 h, 4 h e d diretamente'
    },
    conclusion: 'De T a R, a embarcação deve seguir na direção 135° por aproximadamente 7 horas e 15 minutos.',
    answer: 'Alternativa A'
  },
  157: {
    title: 'Média no centro, idades pouco espalhadas',
    intro: 'O desvio padrão mostra o quanto as idades se espalham em torno da média: quanto menor ele é, mais próximas da média elas ficam.',
    diagram: {
      src: 'diagramas/157.svg',
      alt: 'Exemplo fictício com duas distribuições de 11 idades e média 25. No grupo 1 ilustrativo, os pontos aparecem distantes da média, exemplificando desvio padrão 10. No grupo 4 ilustrativo, os pontos ficam perto de 25, exemplificando desvio padrão 1. A faixa de 20 a 30 anos está sombreada; os pontos não são os dados reais da questão.'
    },
    steps: [
      {
        title: 'Encontrar a média no meio da faixa desejada',
        explanation: 'O intervalo pedido vai de 20 a 30 anos, e 25 anos fica bem no meio dele. Os grupos 1 e 4 têm média 25; agora precisamos ver qual deles tem as idades mais concentradas perto dessa média.'
      },
      {
        title: 'Comparar o espalhamento',
        explanation: 'O grupo 1 tem desvio padrão 10, indicando idades bem mais espalhadas. O grupo 4 tem desvio padrão 1, indicando idades muito próximas dos 25 anos. Como os limites 20 e 30 ficam a 5 anos da média, um espalhamento tão pequeno permite assegurar que a maioria está dentro da faixa.'
      }
    ],
    conclusion: 'O grupo 4 certamente atende ao critério, sem precisar calcular nenhuma fórmula.',
    answer: 'Alternativa D'
  },
  158: {
    title: 'Encontre o quinto tempo pela média',
    intro: 'Pace de 281 s/km significa que o tempo médio dos cinco trechos de 1 km deve ser 281 segundos. Já conhecemos os tempos dos quatro primeiros trechos e chamamos o quinto de x.',
    steps: [
      {
        title: 'Ler os tempos de cada trecho',
        explanation: 'O desenho dá 272 s, 284 s, 288 s e 288 s para os quatro primeiros quilômetros. O número 1.132 s no alto do desenho é o tempo acumulado até o 4º km, não um quinto tempo.',
        equation: '1º: 272 s  |  2º: 284 s  |  3º: 288 s  |  4º: 288 s'
      },
      {
        title: 'Montar a média como fração',
        explanation: 'Somamos os tempos dos cinco trechos no numerador e colocamos 5 no denominador, pois são cinco trechos de 1 km.',
        fractions: [
          {
            numerator: '272 + 284 + 288 + 288 + x',
            denominator: '5',
            tail: '= 281',
            spoken: '272 mais 284 mais 288 mais 288 mais x, sobre 5, é igual a 281'
          }
        ]
      },
      {
        title: 'Descobrir o tempo do quinto trecho',
        explanation: 'Os quatro tempos conhecidos somam 1.132 s. Multiplicamos os dois lados por 5 para retirar o denominador e, depois, subtraímos 1.132.',
        fractions: [
          {
            numerator: '1.132 + x',
            denominator: '5',
            tail: '= 281',
            spoken: '1.132 mais x, sobre 5, é igual a 281'
          }
        ],
        equations: [
          '1.132 + x = 281 × 5 = 1.405',
          'x = 1.405 − 1.132 = 273 s'
        ]
      },
      {
        title: 'Responder exatamente o que foi perguntado',
        explanation: 'A questão pede quantos segundos o quinto trecho deve durar a menos que o quarto. O quarto levou 288 s e o quinto deve levar 273 s.',
        equation: '288 − 273 = 15 segundos a menos'
      }
    ],
    tip: {
      title: 'Macete de leitura',
      text: 'Os números azuis no alto são tempos acumulados desde a largada. Para montar a média, use os tempos verdes de cada trecho de 1 km e acrescente x para o quinto.',
      equation: 'tempo por trecho → média; 4º menos 5º → resposta'
    },
    conclusion: 'O quinto trecho deve ser percorrido 15 segundos mais rápido que o quarto.',
    answer: 'Alternativa E'
  },
  159: {
    title: 'Encontre o centro e a largura da curva tangente',
    intro: 'Na expressão D = k + tg[p(T + m)], o gráfico informa três pistas: o ponto central da curva e as duas assíntotas verticais. Elas determinam k, m e p sem tentar ajustar a curva inteira.',
    diagram: {
      src: 'diagramas/159.svg',
      alt: 'Esquema da função tangente. Duas assíntotas verticais verdes estão em T igual a (5 menos 2 pi) sobre 2 e T igual a (5 mais 2 pi) sobre 2. O ponto central laranja está em T igual a 2,5 e D igual a 30. A distância horizontal entre as assíntotas é 2 pi; a curva cresce entre elas.'
    },
    steps: [
      {
        title: 'Ler o centro da curva',
        explanation: 'A tangente vale zero no meio do intervalo entre as assíntotas. O gráfico marca nesse ponto T = 2,5 e D = 30. Assim, o deslocamento vertical é k = 30. Para a tangente zerar em T = 2,5, o parêntese deve ser T − 2,5.',
        equations: ['centro: (T; D) = (2,5; 30)', 'k = 30  |  m = −2,5']
      },
      {
        title: 'Medir o período entre as assíntotas',
        explanation: 'As duas retas verdes estão em (5 − 2π)/2 e (5 + 2π)/2. Subtraindo a posição da esquerda da posição da direita, encontramos 2π unidades de tempo.',
        equation: '[(5 + 2π)/2] − [(5 − 2π)/2] = 2π'
      },
      {
        title: 'Descobrir o número que multiplica T',
        explanation: 'Na tangente básica, a distância entre duas assíntotas consecutivas é π. Na função tg[p(T + m)], essa distância é π/p. Como no desenho ela vale 2π, a curva ficou duas vezes mais larga; por isso p = 1/2.',
        equation: 'π/p = 2π → p = 1/2'
      },
      {
        title: 'Montar a expressão',
        explanation: 'Substituímos os três parâmetros encontrados na forma dada pelo enunciado. A alternativa E é a única que usa centro em (2,5; 30) e período 2π.',
        equation: 'D = 30 + tg[(1/2)(T − 5/2)]'
      }
    ],
    tip: {
      title: 'Macete para gráficos de tangente',
      text: 'Primeiro ache o ponto do meio das assíntotas: ele mostra os deslocamentos horizontal e vertical. Depois meça a distância entre as assíntotas: ela mostra o período. Assim você não depende da altura aparente da curva no desenho.',
      equation: 'centro → k e m  |  distância entre assíntotas → p'
    },
    conclusion: 'A função é D = 30 + tg[(1/2)(T − 5/2)].',
    answer: 'Alternativa E'
  },
  160: {
    title: 'Siga as viradas no mapa',
    intro: 'Aqui não há conta: basta localizar o nordeste e seguir as instruções na ordem. Nordeste é o canto de cima e à direita de um quarteirão. Use a animação para acompanhar cada esquina até a casa A.',
    diagram: { interactiveStreet: true },
    steps: [
      {
        title: 'Localizar o ponto de partida',
        explanation: 'João mora no canto nordeste de um quarteirão. No mapa, partimos do canto superior direito do quarteirão P, indicado pelo ponto laranja.'
      },
      {
        title: 'Seguir para oeste e virar à direita',
        explanation: 'Ao sair de P, João caminha para oeste, isto é, para a esquerda do mapa. Como ele está olhando para oeste, virar à direita significa passar a caminhar para o norte, para cima.'
      },
      {
        title: 'Contar três quarteirões ao norte',
        explanation: 'A animação sobe um quarteirão por vez: primeiro, segundo e terceiro. No fim desse trecho, João vira à esquerda; como estava indo para o norte, agora segue para oeste.'
      },
      {
        title: 'Contar dois quarteirões a oeste',
        explanation: 'Depois de dois quarteirões para a esquerda, o ponto chega ao pequeno quadrado A, que marca a casa do amigo. Assim, o quarteirão de partida era P.'
      }
    ],
    tip: {
      title: 'Macete das viradas',
      text: 'Direita e esquerda dependem da direção em que a pessoa está caminhando. Para conferir pelo caminho inverso, comece em A e volte dois quarteirões a leste, três ao sul e um trecho a leste até o canto nordeste de P.',
      equation: 'oeste → direita: norte   |   norte → esquerda: oeste'
    },
    conclusion: 'João mora no quarteirão P.',
    answer: 'Alternativa A'
  },
  161: {
    title: 'Monte o custo total e imponha a meta',
    intro: 'A empresa quer continuar produzindo 190 toneladas, mas gastar no máximo metade do custo atual. O ponto decisivo é descobrir o custo de uma tonelada feita de petróleo antes de montar a nova produção.',
    steps: [
      {
        title: 'Descobrir o custo por tonelada',
        explanation: 'Reciclar uma tonelada custa R$ 500,00, que são 5% do custo de produzir uma tonelada de derivados de petróleo. Se 5% valem 500, então 100% valem 500 ÷ 0,05.',
        equation: 'petróleo: 500 ÷ 0,05 = R$ 10.000 por tonelada'
      },
      {
        title: 'Calcular a meta de gastos',
        explanation: 'No mês inicial foram 110 toneladas de petróleo e 80 recicladas: 190 toneladas ao todo. Somamos os dois custos. Reduzir pelo menos 50% significa gastar, no máximo, metade desse total.',
        equations: [
          'custo inicial = 110 × 10.000 + 80 × 500 = R$ 1.140.000',
          'meta: custo novo ≤ 1.140.000 ÷ 2 = R$ 570.000'
        ]
      },
      {
        title: 'Representar a nova mistura de produção',
        explanation: 'Se x toneladas forem recicladas, as outras 190 − x serão feitas de petróleo. Multiplicamos cada quantidade pelo respectivo custo por tonelada.',
        equation: '500x + 10.000(190 − x) ≤ 570.000'
      },
      {
        title: 'Resolver e conferir o mínimo',
        explanation: 'Abrindo os parênteses, isolamos x. Com 140 toneladas recicladas, restam 50 de petróleo e o custo atinge exatamente o limite. Uma tonelada reciclada a menos faria o custo passar da meta.',
        equations: [
          '1.900.000 − 9.500x ≤ 570.000',
          '9.500x ≥ 1.330.000 → x ≥ 140',
          '140 × 500 + 50 × 10.000 = R$ 570.000'
        ]
      }
    ],
    tip: {
      title: 'Por que é uma desigualdade?',
      text: '“Redução de pelo menos 50%” permite gastar menos do que a metade, mas nunca mais. Procuramos a menor quantidade reciclada que respeita esse teto.',
      equation: 'custo novo ≤ R$ 570.000'
    },
    conclusion: 'No mínimo 140 toneladas deverão ser produzidas por reciclagem.',
    answer: 'Alternativa B'
  },
  162: {
    title: 'Escolha um cargo de cada vez',
    intro: 'São 10 casais, portanto 20 pessoas, para ocupar três cargos diferentes: presidente, secretário e tesoureiro. Como só uma pessoa de cada casal pode entrar na diretoria, cada escolha também elimina seu cônjuge das próximas escolhas.',
    steps: [
      {
        title: 'Presidente: 20 opções',
        explanation: 'Ainda não escolhemos ninguém. Qualquer uma das 20 pessoas pode ser presidente.',
        equation: 'Presidente → 20 possibilidades'
      },
      {
        title: 'Secretário: 18 opções',
        explanation: 'Depois de escolher o presidente, ele não pode ocupar outro cargo. Seu cônjuge também não pode entrar na diretoria. Saem, portanto, duas pessoas das 20.',
        equation: 'Secretário → 20 − 2 = 18 possibilidades'
      },
      {
        title: 'Tesoureiro: 16 opções',
        explanation: 'Ao escolher o secretário, excluímos também o cônjuge dele. Agora já há dois casais fora das próximas escolhas: são quatro pessoas a menos.',
        equation: 'Tesoureiro → 20 − 4 = 16 possibilidades'
      },
      {
        title: 'Multiplicar as escolhas',
        explanation: 'Para cada escolha de presidente, há 18 escolhas de secretário; para cada uma dessas, há 16 escolhas de tesoureiro. Pelo princípio multiplicativo, representamos o total pelo produto das três quantidades. As alternativas já estão escritas como multiplicações, então não precisamos efetuar a conta.',
        equation: '20 × 18 × 16'
      }
    ],
    tip: {
      title: 'Macete dos casais',
      text: 'Cada cargo preenchido tira duas pessoas das opções seguintes: quem foi escolhido e seu cônjuge. Como os cargos são diferentes, trocar as pessoas de cargo forma outra diretoria; não dividimos o resultado por 3!.',
      equation: '20 → 18 → 16'
    },
    conclusion: 'A expressão correta para o número de diretorias é 20 × 18 × 16.',
    answer: 'Alternativa B'
  },
  163: {
    title: 'Coloque as medidas na mesma unidade',
    intro: 'A escala compara o tamanho do desenho com o tamanho da obra real. No desenho, a medida é 20 cm; na obra ampliada, é 30 m.',
    steps: [
      {
        title: 'Converter metros em centímetros',
        explanation: 'Para comparar as duas medidas, usamos centímetros nos dois lados. Cada metro tem 100 centímetros.',
        equation: '30 m = 30 × 100 = 3.000 cm'
      },
      {
        title: 'Escrever a escala desenho : realidade',
        explanation: 'Dividimos as duas medidas por 20 para deixar o primeiro número igual a 1.',
        equation: '20 : 3.000 = 1 : 150'
      }
    ],
    tip: {
      title: 'Outro caminho rápido',
      text: 'Também podemos dividir a medida real pela medida no desenho: 3.000 ÷ 20 = 150. Isso significa que cada 1 cm no desenho corresponde a 150 cm na obra.',
      equation: '1 cm no desenho → 150 cm na realidade'
    },
    conclusion: 'A escala é 1 : 150.',
    answer: 'Alternativa E'
  },
  164: {
    title: 'Traduza “1,59 vez” em uma função',
    intro: 'O enunciado chama de T a concentração de cortisol no dia de trabalho e de F a concentração no dia de folga. Dizer que T é 1,59 vez F significa multiplicar F por 1,59.',
    diagram: {
      src: 'diagramas/164.svg',
      alt: 'Gráfico ilustrativo da função T igual a 1,59 vezes F. O eixo horizontal representa F, o cortisol no dia de folga, e o vertical representa T, o cortisol no dia de trabalho. A reta laranja passa pela origem e pelos pontos de exemplo F igual a 1, T igual a 1,59 e F igual a 2, T igual a 3,18.'
    },
    steps: [
      {
        title: 'Escrever a relação do enunciado',
        explanation: '“T é 1,59 vez F” vira uma multiplicação. Essa é a função que liga as duas concentrações.',
        equation: 'T = 1,59 × F'
      },
      {
        title: 'Chegar ao formato das alternativas',
        explanation: 'Para deixar T sobre F, dividimos os dois lados por F. No lado direito, F dividido por F vale 1. Essa divisão exige F diferente de zero.',
        fractions: [{ numerator: 'T', denominator: 'F', tail: '= 1,59', spoken: 'T sobre F é igual a 1,59' }]
      },
      {
        title: 'Desenhar a função',
        explanation: 'Coloque F no eixo horizontal e T no vertical. Escolha valores simples para F: se F = 1, T = 1,59; se F = 2, T = 3,18. Marque os pontos (1; 1,59) e (2; 3,18) e trace a reta que passa por eles e pela origem. Os valores são apenas exemplos para desenhar a relação.',
        equation: 'F = 1 → T = 1,59  |  F = 2 → T = 3,18'
      }
    ],
    tip: {
      title: 'Como ler a reta',
      text: 'A reta sobe porque, quando F aumenta, T também aumenta. Sua inclinação é 1,59: para cada aumento de 1 em F, T aumenta 1,59. No ponto F = 0, a expressão T/F não existe, embora a reta T = 1,59 × F passe pela origem.'
    },
    conclusion: 'A relação pedida é T/F = 1,59.',
    answer: 'Alternativa C'
  },
  165: {
    title: 'Monte a função do lucro com os dados do enunciado',
    intro: 'A mensalidade é o único valor que falta. Vamos chamá-la de M. O estacionamento recebe 120 mensalidades e paga manutenção mais seguro para 120 veículos. O lucro é o dinheiro recebido menos essas despesas.',
    steps: [
      {
        title: 'Anotar o papel de cada dado',
        explanation: 'Antes de fazer contas, separe o que é receita, o que é despesa e o lucro que o dono quer alcançar.',
        table: {
          caption: 'Tradução do enunciado para a conta',
          headers: ['Dado', 'O que significa'],
          rows: [
            ['120 vagas ocupadas', '120 mensalidades recebidas e 120 seguros pagos'],
            ['M reais por vaga', 'mensalidade desconhecida que queremos achar'],
            ['R$ 14.240', 'manutenção mensal, que permanece igual'],
            ['R$ 36 por veículo', 'seguro antes do reajuste de 20%'],
            ['R$ 10.000', 'lucro mensal desejado']
          ]
        }
      },
      {
        title: 'Calcular a receita e atualizar o seguro',
        explanation: 'Como todas as vagas estão ocupadas, a receita é 120 vezes a mensalidade. Um aumento de 20% no seguro significa pagar 100% + 20% = 120% do valor antigo, ou seja, multiplicar R$ 36 por 1,2. Esse seguro reajustado é pago por cada um dos 120 veículos.',
        equations: [
          'Receita = 120 × M',
          'Seguro por veículo = 36 × 1,2 = R$ 43,20',
          'Seguro total = 43,20 × 120 = R$ 5.184'
        ]
      },
      {
        title: 'Montar a função do lucro',
        explanation: 'Somamos as duas despesas: manutenção fixa e seguro total. Depois subtraímos essa soma da receita. Só o seguro sofre o reajuste; a manutenção não muda.',
        equations: [
          'Lucro(M) = receita − despesas',
          'Lucro(M) = 120M − (14.240 + 36 × 1,2 × 120)',
          'Lucro(M) = 120M − 19.424'
        ]
      },
      {
        title: 'Usar o lucro desejado para descobrir M',
        explanation: 'O dono quer lucrar R$ 10.000. Substituímos o lucro por esse valor, somamos 19.424 aos dois lados e dividimos por 120 para encontrar a mensalidade de cada vaga.',
        equations: [
          '10.000 = 120M − 19.424',
          '120M = 10.000 + 19.424 = 29.424',
          'M = 29.424 ÷ 120 = R$ 245,20'
        ]
      }
    ],
    tip: {
      title: 'Como lembrar a função',
      text: 'Primeiro conte tudo o que entra: 120 clientes pagando M. Depois conte tudo o que sai: manutenção de R$ 14.240 e seguro reajustado dos 120 carros. O que sobra é o lucro.',
      equation: 'lucro = entradas − saídas'
    },
    conclusion: 'A mensalidade reajustada deve ser R$ 245,20 por vaga.',
    answer: 'Alternativa C'
  },
  166: {
    title: 'Converta tudo para litros e divida',
    intro: 'O pote está medido em centímetros cúbicos e cada taça em mililitros. Antes de dividir, colocamos as duas quantidades na mesma unidade: litros.',
    steps: [
      {
        title: 'Converter o volume do pote',
        explanation: 'Cada 1.000 cm³ corresponde a 1 litro. Portanto, o pote de 20.000 cm³ contém 20 litros.',
        equation: '20.000 cm³ ÷ 1.000 = 20 L'
      },
      {
        title: 'Converter a porção de cada taça',
        explanation: 'Cada 1.000 mL corresponde a 1 litro. Uma porção de 250 mL equivale a um quarto de litro.',
        equation: '250 mL ÷ 1.000 = 0,25 L'
      },
      {
        title: 'Descobrir quantas porções cabem no pote',
        explanation: 'Agora as medidas estão em litros. Dividimos o volume total pelo volume de uma taça.',
        equation: '20 L ÷ 0,25 L = 80 taças'
      }
    ],
    tip: {
      title: 'Confira de cabeça',
      text: 'Como 0,25 L é um quarto de litro, cada litro rende 4 taças. Assim, 20 litros rendem 20 × 4 = 80 taças.'
    },
    conclusion: 'Um pote cheio rende 80 taças de sorvete.',
    answer: 'Alternativa D'
  },
  167: {
    title: 'Um único ponto já identifica o gráfico',
    intro: 'A tabela informa a produtividade em sacas de 50 kg por hectare, mas os gráficos mostram a produção total em toneladas. Basta converter a primeira safra e comparar o primeiro ponto de cada gráfico.',
    steps: [
      {
        title: 'Ler os dados da primeira safra',
        explanation: 'Na safra 2011–2012, a área cultivada foi de 200 hectares e a produtividade foi de 40 sacas por hectare. Cada saca pesa 50 kg.',
        equation: '200 ha  |  40 sacas/ha  |  50 kg/saca'
      },
      {
        title: 'Encontrar a produção em quilogramas',
        explanation: 'Multiplicamos sacas por hectare pela massa de cada saca e pela quantidade de hectares. As unidades “saca” e “hectare” se cancelam, restando quilogramas.',
        equation: '40 × 50 × 200 = 400.000 kg'
      },
      {
        title: 'Converter e olhar o primeiro ponto',
        explanation: 'Como 1 tonelada equivale a 1.000 kg, a produção foi de 400 toneladas. No primeiro ano, apenas o gráfico A começa em 400. Isso já permite escolher a alternativa sem calcular as outras safras.',
        equation: '400.000 kg ÷ 1.000 = 400 toneladas → gráfico A'
      }
    ],
    tip: {
      title: 'Macete para questões com vários gráficos',
      text: 'Calcule primeiro o dado mais simples da tabela e compare-o com o ponto correspondente em todas as alternativas. Se só uma coincidir, não há necessidade de fazer as demais contas.'
    },
    conclusion: 'O gráfico correto é o que começa em 400 toneladas.',
    answer: 'Alternativa A'
  },
  168: {
    title: 'Volume de ouro = cilindro menos prisma',
    intro: 'A medalha inteira tem forma de cilindro. O quadrado cinza é a base de um prisma que atravessa a medalha e não será feito de ouro. Portanto, calculamos o volume do cilindro e subtraímos o volume desse prisma para as 100 medalhas.',
    diagram: {
      src: 'diagramas/168.svg',
      alt: 'Esquema da medalha vista de cima: um círculo amarelo de diâmetro 6 centímetros contém um quadrado cinza cuja diagonal também mede 6 centímetros. A região amarela é o ouro, igual à área do círculo menos a área do quadrado. À direita, 100 medalhas de 3 milímetros cada correspondem a 30 centímetros de altura total.'
    },
    steps: [
      {
        title: 'Somar a espessura das 100 medalhas',
        explanation: 'A espessura de cada medalha é 3 mm. Primeiro convertemos para centímetros; depois multiplicamos por 100. Assim, podemos calcular de uma vez o volume das 100 medalhas como se estivessem empilhadas.',
        equations: ['3 mm = 0,3 cm', 'altura total = 100 × 0,3 = 30 cm']
      },
      {
        title: 'Calcular a área do círculo inteiro',
        explanation: 'O diâmetro é 6 cm, então o raio é a metade: 3 cm. Use π ≈ 3,1, como pede o enunciado.',
        equation: 'A círculo = πr² = 3,1 × 3² = 27,9 cm²'
      },
      {
        title: 'Encontrar o lado do quadrado',
        explanation: 'A diagonal do quadrado liga dois pontos opostos do círculo e mede 6 cm. Para um quadrado, diagonal = lado × √2. Dividimos por √2 e multiplicamos numerador e denominador por √2 para retirar a raiz de baixo.',
        equations: [
          '6 = L√2 → L = 6/√2',
          'L = (6√2)/(√2 × √2) = 6√2/2 = 3√2 cm'
        ]
      },
      {
        title: 'Calcular a área do quadrado',
        explanation: 'A área de um quadrado é lado vezes lado. Ao elevar 3√2 ao quadrado, elevamos o 3 e a raiz separadamente.',
        equation: 'A quadrado = L² = (3√2)² = 9 × 2 = 18 cm²'
      },
      {
        title: 'Subtrair o volume central do volume total',
        explanation: 'Cada área é multiplicada pela altura total de 30 cm. O cilindro inteiro ocupa 837 cm³; o prisma central, 540 cm³. A diferença é o volume de ouro.',
        diagram: {
          src: 'diagramas/168-solidos.svg',
          alt: 'Dois sólidos em perspectiva, sem escala. À esquerda, cilindro inteiro com base circular de área 27,9 centímetros quadrados e altura total 30 centímetros, volume 837 centímetros cúbicos. À direita, prisma central de base quadrada com diagonal 6 centímetros, área da base 18 centímetros quadrados e a mesma altura 30 centímetros, volume 540 centímetros cúbicos. O ouro corresponde ao volume do cilindro menos o do prisma.'
        },
        equations: [
          'V cilindro = 27,9 × 30 = 837 cm³',
          'V prisma = 18 × 30 = 540 cm³',
          'V ouro = 837 − 540 = 297 cm³'
        ]
      }
    ],
    tip: {
      title: 'Ideia principal',
      text: 'Não use o círculo inteiro como se fosse de ouro: o centro quadrado fica de fora. Como o cilindro e o prisma têm a mesma altura, também dá para subtrair as áreas primeiro e multiplicar depois.',
      equation: '(27,9 − 18) × 30 = 297 cm³'
    },
    conclusion: 'São necessários 297 cm³ de ouro para as 100 medalhas.',
    answer: 'Alternativa B'
  },
  169: {
    title: 'Conte primeiro as vitórias de João',
    intro: 'Há 6 × 6 × 6 = 216 resultados possíveis para os três dados. João vence quando seu número é maior ou igual aos dois números de Artur, porque os empates também são de João. Essa condição é mais simples de contar.',
    steps: [
      {
        title: 'Fixar o resultado do dado de João',
        explanation: 'Se João tira j, cada dado de Artur pode mostrar qualquer número de 1 até j. Há j opções para o primeiro dado e j para o segundo: j² pares favoráveis a João.',
        equation: 'João tira j → pares de Artur que ele vence = j × j = j²'
      },
      {
        title: 'Somar os seis casos',
        explanation: 'A tabela inclui as vitórias por empate. Por exemplo, se João tira 3, os dois dados de Artur podem ser 1, 2 ou 3: são 3 × 3 = 9 pares.',
        table: {
          caption: 'Resultados que dão vitória a João',
          headers: ['Dado de João', 'Pares possíveis de Artur', 'Quantidade'],
          rows: [
            ['1', '1 × 1', '1'], ['2', '2 × 2', '4'], ['3', '3 × 3', '9'],
            ['4', '4 × 4', '16'], ['5', '5 × 5', '25'], ['6', '6 × 6', '36']
          ]
        },
        equation: '1 + 4 + 9 + 16 + 25 + 36 = 91'
      },
      {
        title: 'Encontrar a probabilidade de Artur',
        explanation: 'Todo resultado que não dá vitória a João dá vitória a Artur. Subtraímos as 91 vitórias de João dos 216 resultados e dividimos pelo total.',
        equations: ['vitórias de Artur = 216 − 91 = 125', 'probabilidade de Artur = 125/216']
      },
      {
        title: 'Comparar os jogadores',
        explanation: 'As probabilidades têm o mesmo denominador. Como 125 é maior que 91, Artur é o jogador com maior chance de vitória.',
        equation: 'Artur: 125/216  >  João: 91/216'
      }
    ],
    tip: {
      title: 'Atenção ao empate',
      text: 'No cálculo de João, os números dos dados de Artur podem ser iguais ao dele. Se usássemos apenas números menores, retiraríamos indevidamente os empates que o enunciado dá a João.'
    },
    conclusion: 'Artur tem a maior probabilidade de vitória: 125/216.',
    answer: 'Alternativa E'
  },
  170: {
    title: 'Leia a razão diretamente no enunciado',
    intro: 'A questão já define luminância como intensidade luminosa dividida pelo quadrado da distância. Basta colocar as unidades nessa mesma ordem.',
    steps: [
      {
        title: 'Identificar as unidades',
        explanation: 'A intensidade luminosa é medida em candela (cd). A distância é medida em metro (m); seu quadrado é medido em m².',
        equation: 'intensidade → cd  |  distância ao quadrado → m²'
      },
      {
        title: 'Montar a razão',
        explanation: 'O termo antes de “dividida por” fica em cima; o quadrado da distância fica embaixo.',
        fractions: [{ numerator: 'cd', denominator: 'm²', tail: '', spoken: 'candela sobre metro quadrado' }]
      }
    ],
    conclusion: 'A unidade da luminância é cd/m².',
    answer: 'Alternativa A'
  },
  171: {
    title: 'Acompanhe as moedas da posição 1 em uma tabela',
    intro: 'Não precisamos acompanhar as quatro pessoas. Em cada rodada, o jogador da posição 1 entrega 1 moeda ao da posição 2 e recebe 4 moedas do da posição 4. Portanto, seu saldo é sempre de 3 moedas a mais.',
    steps: [
      {
        title: 'Descobrir o saldo de uma rodada',
        explanation: 'Partimos da quantidade que o jogador 1 tinha ao fim da rodada anterior. Ele perde 1 moeda e ganha 4.',
        equation: 'quantidade nova = quantidade anterior − 1 + 4 = quantidade anterior + 3'
      },
      {
        title: 'Montar a tabela',
        explanation: 'Antes de qualquer rodada (rodada 0), ele tem as 100 moedas iniciais. Depois, repetimos a mesma conta em cada linha.',
        table: {
          caption: 'Moedas do jogador na posição 1',
          headers: ['Rodada', 'Conta', 'Moedas ao final'],
          rows: [
            ['0', 'quantidade inicial', '100'],
            ['1', '100 − 1 + 4', '103'],
            ['2', '103 − 1 + 4', '106'],
            ['3', '106 − 1 + 4', '109']
          ]
        }
      },
      {
        title: 'Escrever o padrão para n rodadas',
        explanation: 'A tabela mostra 100 no início e mais 3 moedas a cada rodada. Após n rodadas, acrescentamos 3 uma vez para cada rodada: 3n.',
        equation: 'moedas ao fim da rodada n = 100 + 3n'
      }
    ],
    tip: {
      title: 'Confira com a tabela',
      text: 'Se n = 1, a expressão dá 100 + 3 = 103. Se n = 2, dá 100 + 6 = 106. Ela reproduz as duas primeiras linhas e mantém o mesmo padrão.',
      equation: 'posição 1: −1 + 4 = +3 por rodada'
    },
    conclusion: 'A expressão pedida é 100 + 3n.',
    answer: 'Alternativa D'
  },
  172: {
    title: 'Leia os dois gráficos em 60 km/h',
    intro: 'A viagem foi feita a 60 km/h o tempo todo. Essa é a velocidade que devemos localizar no eixo horizontal de cada gráfico; a altura da curva nesse ponto dá o rendimento de cada combustível.',
    diagram: {
      src: 'diagramas/172.svg',
      alt: 'Releitura esquemática dos dois gráficos da questão. Uma linha vertical destaca 60 quilômetros por hora. No gráfico do GNV, o ponto correspondente indica rendimento de 10 quilômetros por metro cúbico. No gráfico da gasolina, indica 8 quilômetros por litro.'
    },
    steps: [
      {
        title: 'Ler o rendimento na velocidade pedida',
        explanation: 'Siga a linha vertical que sai de 60 km/h em cada gráfico. No GNV, ela encontra a curva em 10 km/m³; na gasolina, em 8 km/L. O número 60 é velocidade, não a distância da viagem.',
        equation: '60 km/h → GNV: 10 km/m³  |  gasolina: 8 km/L'
      },
      {
        title: 'Separar a distância da viagem',
        explanation: 'A viagem inteira teve 240 km, mas o motorista percorreu metade com cada combustível. Por isso, fazemos as duas contas usando 120 km.',
        equation: '240 ÷ 2 = 120 km com GNV + 120 km com gasolina'
      },
      {
        title: 'Calcular o gasto com GNV',
        explanation: 'O carro percorre 10 km com 1 m³ de gás. Dividimos 120 km por 10 km/m³ para descobrir quantos metros cúbicos consumiu. Cada m³ custa R$ 2,00.',
        equations: ['120 ÷ 10 = 12 m³', '12 × R$ 2,00 = R$ 24,00']
      },
      {
        title: 'Calcular o gasto com gasolina e comparar',
        explanation: 'Com gasolina, o carro percorre 8 km por litro. Para 120 km, precisa de 15 L, a R$ 3,00 cada. A questão pede a diferença entre os gastos.',
        equations: ['120 ÷ 8 = 15 L', '15 × R$ 3,00 = R$ 45,00', 'R$ 45,00 − R$ 24,00 = R$ 21,00']
      }
    ],
    tip: {
      title: 'Por que dividir pelo rendimento?',
      text: 'O rendimento informa quantos quilômetros são percorridos com uma unidade de combustível. Dividir a distância por esse número mostra quantas unidades foram necessárias.',
      equation: 'distância ÷ rendimento = combustível consumido'
    },
    conclusion: 'A gasolina custou R$ 21,00 a mais que o GNV.',
    answer: 'Alternativa D'
  },
  173: {
    title: 'Multiplique os pacotes e compare os totais',
    intro: 'Em qualquer autoescola, a pessoa precisa contratar os mesmos três produtos: 20 aulas teóricas, 10 aulas práticas e o aluguel do veículo. O menor preço de uma aula isolada não garante o menor custo total.',
    steps: [
      {
        title: 'Montar a conta que vale para todas',
        explanation: 'Multiplique o preço de cada aula pela quantidade de aulas do pacote. Depois some o aluguel cobrado pela mesma autoescola.',
        equation: 'total = 20 × teórica + 10 × prática + aluguel'
      },
      {
        title: 'Calcular lado a lado',
        explanation: 'A tabela mostra cada parcela já multiplicada e, na última coluna, a soma das três. A linha laranja tem o menor total.',
        table: {
          kind: 'cost',
          caption: 'Custo da primeira etapa da carteira de motorista',
          headers: ['Autoescola', '20 teóricas', '10 práticas', 'Aluguel', 'Total'],
          rows: [
            ['I', '20 × 10 = R$ 200', '10 × 80 = R$ 800', 'R$ 400', 'R$ 1.400'],
            ['II', '20 × 30 = R$ 600', '10 × 50 = R$ 500', 'R$ 200', 'R$ 1.300'],
            ['III', '20 × 20 = R$ 400', '10 × 40 = R$ 400', 'R$ 400', 'R$ 1.200']
          ],
          highlightRow: 2
        }
      },
      {
        title: 'Escolher o menor total',
        explanation: 'Comparando R$ 1.400, R$ 1.300 e R$ 1.200, o menor valor é o da autoescola III. É esse par — autoescola e custo — que aparece na alternativa E.',
        equation: 'III → R$ 1.200'
      }
    ],
    conclusion: 'A autoescola III cobra o menor total: R$ 1.200,00.',
    answer: 'Alternativa E'
  },
  174: {
    title: 'Encontre o máximo de garrafas sem ficar abaixo de 5 L',
    intro: 'As garrafas submersas ocupam espaço dentro da caixa e reduzem a água despejada. A descarga precisa liberar pelo menos 5 L, então não podemos retirar mais que 2,5 L dos 7,5 L iniciais.',
    steps: [
      {
        title: 'Calcular o volume de água antes das garrafas',
        explanation: 'Quando a boia interrompe o abastecimento, a água ocupa 2,5 dm por 1,5 dm de base e alcança 2 dm de altura. Multiplicamos as três medidas. Como 1 dm³ equivale a 1 L, o volume é 7,5 L.',
        equation: '2,5 × 1,5 × 2 = 7,5 dm³ = 7,5 L'
      },
      {
        title: 'Descobrir quanto espaço as garrafas podem ocupar',
        explanation: 'Precisamos preservar no mínimo 5 L de água. Logo, as garrafas podem deslocar no máximo 7,5 − 5 = 2,5 L. Convertendo para a unidade das garrafas, isso é 2.500 mL.',
        equation: '7,5 − 5 = 2,5 L = 2.500 mL'
      },
      {
        title: 'Dividir pelo volume de cada garrafa',
        explanation: 'Cada garrafa submersa desloca 300 mL. A divisão indica que caberiam 8,33 volumes de garrafa nesse limite, mas só podemos colocar garrafas inteiras. Como 5 L é um mínimo obrigatório, usamos 8, sem arredondar para cima.',
        equation: '2.500 ÷ 300 ≈ 8,33 → no máximo 8 garrafas'
      },
      {
        title: 'Conferir o limite',
        explanation: 'Oito garrafas ainda deixam mais de 5 L para a descarga. A nona faria o volume cair para menos de 5 L, então não é permitida.',
        table: {
          caption: 'Água disponível após colocar as garrafas',
          headers: ['Garrafas', 'Deslocam', 'Restam', 'Pelo menos 5 L?'],
          rows: [
            ['8', '8 × 0,3 = 2,4 L', '5,1 L', 'Sim'],
            ['9', '9 × 0,3 = 2,7 L', '4,8 L', 'Não']
          ]
        }
      }
    ],
    tip: {
      title: 'Cuidado com o arredondamento',
      text: 'O objetivo não é escolher o inteiro mais próximo de 8,33. Queremos o maior número inteiro de garrafas que ainda garanta pelo menos 5 L de água por descarga.'
    },
    conclusion: 'A quantidade máxima é 8 garrafas.',
    answer: 'Alternativa B'
  },
  175: {
    title: 'A maior torta é que define o tamanho da caixa',
    intro: 'As tortas são cilindros de altura 6 cm, mas seus raios variam de 12 a 16 cm. Para uma única caixa servir a todas, desenhamos primeiro a torta mais larga e reservamos 1 cm livre em cada lateral e 1 cm acima.',
    diagram: {
      src: 'diagramas/175.svg',
      alt: 'Dois bolos cilíndricos em perspectiva: o menor tem raio de 12 centímetros, o maior raio de 16 centímetros. A vista superior mostra o bolo maior dentro de uma caixa quadrada, com diâmetro de 32 centímetros e um centímetro livre em cada lado, exigindo base de 34 centímetros. A vista lateral indica bolo de 6 centímetros e caixa de 7 centímetros de altura.'
    },
    steps: [
      {
        title: 'Usar o maior cilindro',
        explanation: 'O maior raio possível é 16 cm. De uma borda à outra, a torta mede o dobro do raio: 32 cm de diâmetro. A torta de raio 12 cm é menor e também caberá na caixa escolhida para a maior.',
        equation: 'diâmetro máximo = 2 × 16 = 32 cm'
      },
      {
        title: 'Deixar folga dos dois lados',
        explanation: 'Na base quadrada, o círculo da torta fica entre duas paredes opostas. Precisamos de 1 cm livre à esquerda e mais 1 cm à direita, além dos 32 cm da torta.',
        diagram: {
          src: 'diagramas/175-medidas.svg',
          alt: 'Vista superior da torta maior em caixa quadrada: 32 centímetros de diâmetro da torta mais um centímetro livre de cada lado resultam em lado de 34 centímetros. Vista lateral: torta de 6 centímetros de altura mais um centímetro livre até a tampa resultam em caixa de 7 centímetros.'
        },
        equation: 'lado interno da nova caixa = 1 + 32 + 1 = 34 cm'
      },
      {
        title: 'Conferir a altura',
        explanation: 'A torta tem 6 cm de altura e precisa de 1 cm livre até a tampa. A caixa antiga já tinha 7 cm de altura; portanto, só precisamos aumentar a aresta da base.',
        equation: 'altura necessária = 6 + 1 = 7 cm'
      },
      {
        title: 'Comparar com a caixa antiga',
        explanation: 'A pergunta não pede o lado novo de 34 cm, mas quantos centímetros ele deve ser maior que o lado antigo de 14 cm.',
        equation: '34 − 14 = 20 cm'
      }
    ],
    tip: {
      title: 'Por que não usar o raio de 12 cm?',
      text: 'Uma caixa feita para a menor torta pode falhar com a maior. Escolher o raio máximo garante espaço para todos os tamanhos produzidos.',
      equation: 'maior torta → caixa mínima que serve a todas'
    },
    conclusion: 'A aresta da base deve aumentar, no mínimo, 20 cm.',
    answer: 'Alternativa E'
  },
  176: {
    title: 'Encontre o instante de pressão máxima',
    intro: 'A máquina funcionará de t = 0 até t = 10 horas. Não basta testar a pressão só no fim: precisamos garantir que ela nunca passe de 10 atmosferas em nenhum momento desse intervalo.',
    steps: [
      {
        title: 'Reescrever o termo dentro do logaritmo',
        explanation: 'Durante as dez horas, t − 19 é negativo. O sinal de menos da fórmula o transforma em 19 − t. Assim, o argumento do logaritmo é positivo para K > 0.',
        equation: 'P(t) = 4 log[K(t + 1)(19 − t)]'
      },
      {
        title: 'Localizar o maior valor do produto',
        explanation: 'Ao desenvolver e completar o quadrado, o produto vira 100 − (t − 9)². Um quadrado nunca é negativo; portanto, esse produto é máximo quando t = 9, e vale 100. Nove horas está dentro do período de funcionamento.',
        equations: ['(t + 1)(19 − t) = −t² + 18t + 19 = 100 − (t − 9)²', 'máximo em t = 9: produto = 100']
      },
      {
        title: 'Aplicar o limite de 10 atmosferas',
        explanation: 'O logaritmo cresce quando seu argumento cresce. Então a maior pressão ocorre em t = 9. Exigimos que ela seja no máximo 10 e dividimos os dois lados por 4.',
        equations: ['4 log(100K) ≤ 10', 'log(100K) ≤ 2,5']
      },
      {
        title: 'Isolar o maior K permitido',
        explanation: 'Como log é decimal, log(A) ≤ 2,5 equivale a A ≤ 10²·⁵. Dividir por 100 = 10² deixa K ≤ 10⁰·⁵. Escolhemos exatamente esse limite, o maior valor permitido.',
        equations: ['100K ≤ 10²·⁵', 'K ≤ 10²·⁵ / 10² = 10⁰·⁵']
      }
    ],
    tip: {
      title: 'A pegadinha do tempo',
      text: 'A pressão máxima acontece após 9 horas, um pouco antes do fim das 10 horas. Verificar apenas t = 10 poderia permitir uma máquina que ultrapassa o limite no meio do funcionamento.',
      equation: 't = 9 → produto 100  |  t = 10 → produto 99'
    },
    conclusion: 'O maior parâmetro possível é K = 10⁰·⁵.',
    answer: 'Alternativa A'
  },
  177: {
    title: 'Compare as áreas das entradas dos túneis',
    intro: 'Os túneis têm a mesma extensão. Por isso, retirar menos material equivale a escolher a menor área na vista frontal. Cada entrada tem forma de semicírculo: metade da área de um círculo.',
    steps: [
      {
        title: 'Ler os diâmetros dos dois projetos',
        explanation: 'No Projeto 1, os diâmetros são 12 m para automóveis e 6 m para bicicletas, com raios 6 m e 3 m. No Projeto 2, os segmentos da base somam 3 + 6 + 6 + 3 = 18 m, com raio 9 m.',
        equations: ['Projeto 1: raios 6 m e 3 m', 'Projeto 2: diâmetro 18 m → raio 9 m']
      },
      {
        title: 'Calcular as áreas dos semicírculos',
        explanation: 'Use π = 3 e a fórmula A = πr²/2. No Projeto 1, somamos as áreas dos dois túneis. No Projeto 2, calculamos a área da única entrada.',
        equations: ['Projeto 1: (3 × 6²)/2 + (3 × 3²)/2 = 54 + 13,5 = 67,5 m²', 'Projeto 2: (3 × 9²)/2 = 121,5 m²']
      },
      {
        title: 'Escolher o menor valor',
        explanation: 'Como 67,5 m² é menor que 121,5 m², o Projeto 1 exige retirar menos material da montanha.',
        equation: '67,5 m² < 121,5 m² → Projeto 1'
      }
    ],
    conclusion: 'O Projeto 1 tem a menor área de seção transversal: 67,5 m².',
    answer: 'Alternativa A'
  },
  178: {
    title: 'Questão anulada no gabarito fornecido',
    intro: 'Esta questão consta como anulada no gabarito do caderno amarelo. A plataforma não a considera acerto nem erro. Ainda assim, podemos estudar a relação algébrica apresentada no enunciado.',
    steps: [
      {
        title: 'Escrever as duas parcelas',
        explanation: 'O carro custa R$ 60.000 nas duas opções. Na primeira, o valor de cada parcela é 60.000/n. Na segunda, são seis parcelas a mais, então cada uma vale 60.000/(n + 6). A diferença informada é R$ 500.',
        equation: '60.000/n − 60.000/(n + 6) = 500'
      },
      {
        title: 'Resolver a relação como exercício',
        explanation: 'Ao colocar as frações no mesmo denominador e simplificar, chegamos a n(n + 6) = 720. O valor positivo n = 24 satisfaz essa igualdade: as parcelas seriam R$ 2.500 e R$ 2.000.',
        equations: ['n(n + 6) = 720', '24 × 30 = 720  |  2.500 − 2.000 = 500']
      }
    ],
    tip: {
      title: 'Situação oficial da questão',
      text: 'Embora a conta acima produza 24 na leitura literal do enunciado, o gabarito fornecido registra a questão como anulada. Nenhuma alternativa recebe pontuação na plataforma.'
    },
    conclusion: 'Para estudo, a relação leva a n = 24; para o gabarito, a questão é anulada.',
    answer: 'Anulada'
  },
  179: {
    title: 'Separe os presentes especiais primeiro',
    intro: 'Os oito presentes são diferentes. O filho mais velho deve receber exatamente um dos dois presentes especiais — bicicleta ou celular — e completar seus três presentes com dois dos outros seis.',
    steps: [
      {
        title: 'Montar os grupos de escolha',
        explanation: 'Há 2 escolhas para qual presente especial ficará com o mais velho. Depois escolhemos 2 dos 6 presentes comuns para completar os 3 dele. Restam 5 presentes; escolhemos 2 para o filho do meio e os 3 últimos ficam com o mais novo.',
        table: {
          caption: 'Distribuição dos oito presentes',
          headers: ['Etapa', 'Escolha', 'Possibilidades'],
          rows: [
            ['Mais velho: especial', 'bicicleta ou celular', '2'],
            ['Mais velho: comuns', '2 entre 6', '15'],
            ['Filho do meio', '2 entre os 5 restantes', '10'],
            ['Mais novo', 'recebe os 3 restantes', '1']
          ]
        }
      },
      {
        title: 'Calcular as combinações',
        explanation: 'A ordem dos presentes dentro da parte de cada filho não importa. Por isso, escolher 2 entre 6 dá 6 × 5 ÷ 2 = 15; escolher 2 entre 5 dá 5 × 4 ÷ 2 = 10.',
        equations: ['C(6, 2) = 15', 'C(5, 2) = 10']
      },
      {
        title: 'Multiplicar as etapas',
        explanation: 'Cada escolha de presente especial pode ser combinada com cada escolha dos presentes comuns e dos presentes do filho do meio. O mais novo recebe automaticamente o que sobrou.',
        equation: '2 × 15 × 10 × 1 = 300 distribuições'
      }
    ],
    tip: {
      title: 'Por que não multiplicar pela ordem?',
      text: 'Trocar a ordem em que um mesmo filho recebe seus presentes não cria uma distribuição nova. A distinção relevante é quais presentes vão para cada filho.'
    },
    conclusion: 'Os presentes podem ser distribuídos de 300 maneiras.',
    answer: 'Alternativa C'
  },
  180: {
    title: 'Use a mesma velocidade média na prorrogação',
    intro: 'O jogador entrou apenas no segundo tempo. Ele correu 4,5 km em 45 minutos e manteve essa velocidade média durante os 30 minutos da prorrogação.',
    steps: [
      {
        title: 'Descobrir a distância por minuto',
        explanation: 'Dividimos a distância do segundo tempo pela sua duração para saber quantos quilômetros ele percorreu, em média, por minuto.',
        equation: '4,5 km ÷ 45 min = 0,1 km/min'
      },
      {
        title: 'Calcular a prorrogação',
        explanation: 'A prorrogação dura 30 minutos, na mesma velocidade média. Multiplicamos 0,1 km/min por 30 min.',
        equation: '0,1 × 30 = 3 km'
      },
      {
        title: 'Somar todo o tempo em campo',
        explanation: 'A pergunta pede a distância percorrida durante toda a participação do jogador: segundo tempo mais prorrogação. Ele não participou do primeiro tempo.',
        equation: '4,5 + 3 = 7,5 km'
      }
    ],
    conclusion: 'O jogador percorreu 7,5 km durante sua participação.',
    answer: 'Alternativa C'
  }
};
